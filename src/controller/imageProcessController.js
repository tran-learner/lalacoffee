import fs from "fs/promises"
import axios from "axios"
import predict from "./modelController.js"

export async function downloadImage(imageUrl, sender) {
    try {
        await fs.mkdir("./uploads", { recursive: true })
        const response = await axios({
            url: imageUrl,
            method: "GET",
            // responseType: "stream"
            responseType: "arraybuffer" //whyyyyyy
        })

        const filePath = `./uploads/img_${sender}.jpg`
        await fs.writeFile(filePath,response.data)
        console.log('Loaded image to server successfully')
        return filePath
    } catch (e) {
        console.log(`Lỗi xử lý ảnh: ${e}`)
    }
}

export async function postToImgServer(filePath) {
    try {
        const data = await fs.readFile(filePath)
        const result = await predict(data)
        console.log('Prediction: ',result)
        return result
    } catch (e){
        console.log('Failed to read file. ',e)
    }
}
