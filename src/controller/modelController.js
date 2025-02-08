import { SageMakerRuntimeClient, InvokeEndpointCommand } from "@aws-sdk/client-sagemaker-runtime";
import dotenv from "dotenv";

dotenv.config();

const { AWS_MODEL_ENDPOINT, AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env;

export function writeout(){
    console.log(AWS_MODEL_ENDPOINT, AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
}
const client = new SageMakerRuntimeClient({
    region: "ap-southeast-2",
    credentials: {
        accessKeyId: "AKIAR3HUONQYA3PP6PFM",
        secretAccessKey: "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"
    }
});

app.post("/predict", async (req, res) => {
    try {
        // Nhận dữ liệu ảnh từ request
        const imageBuffer = req.body;

        // Gửi ảnh đến SageMaker
        const command = new InvokeEndpointCommand({
            EndpointName: "canvas-MyFirstDeploy",
            Body: imageBuffer,
            ContentType: "image/png"  // Hoặc "image/jpeg" nếu bạn gửi ảnh JPG
        });

        const response = await client.send(command);
        const result = new TextDecoder("utf-8").decode(response.Body);

        res.json(JSON.parse(result));
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
});

export default predict;
