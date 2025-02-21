import fs from "fs"
import axios from "axios"

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
        response.data.pipe(writer)
        writer.on('finish', async () => {
            console.log("Image loaded to server successfully. ", filePath)
        })
    } catch (e) {
        console.log(`Lỗi xử lý ảnh: ${e}`)
    }
}
