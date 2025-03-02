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

export async function postToAWS(filePath) {
    try {
        console.log('📂 FILE PATH: ', filePath);
        
        // Đọc ảnh & resize về 224x224 trước khi gửi lên SageMaker
        let img = cv2.imread(filePath);
        let imgResized = img.resize(224, 224);
        let imgEncoded = cv2.imencode(".jpg", imgResized);
        let imageBuffer = imgEncoded.toString("base64");  // Chuyển ảnh thành buffer để gửi

        // Gửi ảnh đã resize lên SageMaker
        const result = await predict(Buffer.from(imageBuffer, "base64"));
        return result;
    } catch (e) {
        console.log('❌ Lỗi khi gửi ảnh lên AWS:', e);
    }
}