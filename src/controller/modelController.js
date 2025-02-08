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

// const predict = async (imageBase64) => {
//     try {
//         const command = new InvokeEndpointCommand({
//             EndpointName: "canvas-MyFirstDeploy", 
//             Body: ,
//             ContentType: "image/png"
//         });

//         const response = await client.send(command);
//         const result = new TextDecoder("utf-8").decode(response.Body);

//         return JSON.parse(result);
//     } catch (error) {
//         console.error("Error:", error);
//         return null;
//     }
// };

const predict = async (imageBuffer) => {
    try {
        const command = new InvokeEndpointCommand({
            EndpointName: "canvas-MyFirstDeploy",  
            Body: imageBuffer, // Gửi buffer ảnh trực tiếp
            ContentType: "image/png"  // Nếu gửi ảnh JPG thì đổi thành "image/jpeg"
        });

        const response = await client.send(command);
        const result = new TextDecoder("utf-8").decode(response.Body);
        console.log('RESULT ISSSSSSS ',result)
        // return JSON.parse(result);
        return result
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};
export default predict;
