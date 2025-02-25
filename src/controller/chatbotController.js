import dotenv from "dotenv"
import request from "request"
import { downloadImage, postToAWS } from "./imageProcessController.js"
import { getPageAccessToken } from "./databaseController.js"
dotenv.config()

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN
const VERIFY_TOKEN = process.env.VERIFY_TOKEN

export function getHomePage(req, res) {
    return res.send("Hiiii")
}

export function getWebhook(req, res) {
    console.log(VERIFY_TOKEN)
    // Parse the query params
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    // Check if a token and mode is in the query string of the request
    if (mode && token) {
        // Check the mode and token sent is correct
        if (mode === "subscribe" && token === VERIFY_TOKEN) {
            // Respond with the challenge token from the request
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        } else {
            // Respond with '403 Forbidden' if verify tokens do not match
            // console.log('not same')
            res.sendStatus(403);
        }
    }
}

//fb post to webhook => server consider type of data => if img, send to aws => process result from aws
//=> send answer to client
export function postWebhook(req, res) {
    console.log(req.body)
    let page_id = req.body.entry[0].id
    let body = req.body;
    if (body.object === "page") {
        body.entry.forEach(entry => {
            let webhook_event = entry.messaging[0]
            let sender_psid = webhook_event.sender.id
            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message, page_id)
            }
        });
        res.status(200).send("EVENT_RECEIVED");
    } else {
        res.sendStatus(404);
    }
}

function callSendAPI(sender_psid, response, page_acctkn) {
    // console.log("SENDER ID IS ",sender_psid)
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    request({
        "uri": "https://graph.facebook.com/v21.0/me/messages",
        "qs": { "access_token": page_acctkn },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log("Sent message to KT!")
        } else {
            console.log(err)
        }
    })
}

async function handleMessage(sender_psid, received_message, page_id) {
    let response
    // console.log('RECIEVED MESSAGE IS ',received_message)
    if (received_message.text) {
        //call text handle functions
        response = {
            "text": `You said ${received_message.text}`
        }
    }
    else if (received_message.attachments) {
        let attachment = received_message.attachments[0]
        if (attachment.type == "image") {
            //call image handle functions
                let imgURL = attachment.payload.url //get img at fb server
                const filepath = await downloadImage(imgURL, sender_psid) //save img to server
                // const result = await postToAWS(filepath)
                //delete image
            response = {
                // "text": `${result.label}`
                // "text":"Try without sending message from messenger"
                "text":"Try without img processing"
            }
        }
        else {
            response = {
                "text":`Định dạng dữ liệu không được hỗ trợ xử lý bởi chatbot.`
            }
        }
    }
    let page_acctkn = await getPageAccessToken(page_id)
    callSendAPI(sender_psid, response, page_acctkn)
}