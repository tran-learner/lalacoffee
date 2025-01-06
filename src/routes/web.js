import express from "express"
import { getHomePage, getWebhook, postWebhook } from "../controller/chatbotController.js"
let router = express.Router()
export const initWebRoutes = (app)=>{
    router.get("/",getHomePage)
    router.get("/webhook",getWebhook)
    router.post("/webhook",postWebhook)
    return app.use("/",router)
}

