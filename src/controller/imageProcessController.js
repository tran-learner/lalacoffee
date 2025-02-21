import fs from "fs/promises"
import axios from "axios"
import predict from "./modelController.js"

export async function downloadImage(imageUrl) {
    try {
        await fs.mkdir("./uploads", { recursive: true })
        const response = await axios({
            url: imageUrl,
            method: "GET",
            // responseType: "stream"
            responseType: "arraybuffer" //whyyyyyy
        })

        const filePath = `./uploads/temp_image.jpg`
        await fs.writeFile(filePath,response.data)
        console.log('Loaded image to server successfully')
        return filePath
    } catch (e) {
        console.log(`Lỗi xử lý ảnh: ${e}`)
    }
}

export async function postToAWS(filePath) {
    try {
        console.log('FILE PATH IS ',filePath)
        const data = await fs.readFile(filePath)
        const result = await predict(data)
        return result
    } catch (e){
        console.log('Failed to read file. ',e)
    }
}
