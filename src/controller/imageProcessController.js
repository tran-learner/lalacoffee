import fs from "fs"
import axios from "axios"
import predict from "./modelController.js"

export async function downloadImage(imageUrl) {
    try {
        await fs.promises.mkdir("./uploads", { recursive: true })
        const response = await axios({
            url: imageUrl,
            method: "GET",
            responseType: "stream"
        })

        const filePath = `./uploads/temp_image.jpg`
        const writer = fs.createWriteStream(filePath)

        // response.data.pipe(writer)
        // writer.on('finish', async () => {
        //     console.log("Image loaded to server successfully. ", filePath)
        // })
        // return filePath

        return new Promise((resolve, reject) => {
            response.data.pipe(writer)
            writer.on("finish", () => {
                console.log("Image loaded to server successfully. ", filePath)
                resolve(filePath)
            })
            writer.on("error", (er) => {
                reject(er)
            })
        })
    } catch (e) {
        console.log(`Lỗi xử lý ảnh: ${e}`)
    }
}

export async function postToAWS(filePath) {
    let result
    fs.readFile(filePath, async (err, data) => {
        if (err) {
            console.log("Failed to read file. ", err)
        }
        result = await predict(data)
    })
    return result
}
