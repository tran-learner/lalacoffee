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


const predict = async (imageBuffer) => {
    try {
        const command = new InvokeEndpointCommand({
            EndpointName: "canvas-deploy3",  
            Body: imageBuffer, // Gửi buffer ảnh trực tiếp
            ContentType: "image/png"  // Nếu gửi ảnh JPG thì đổi thành "image/jpeg"
        });

        const response = await client.send(command);
        const result = new TextDecoder("utf-8").decode(response.Body);
        console.log('RESULT IS ',result)
        // return JSON.parse(result);
        return result
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};
export default predict;
