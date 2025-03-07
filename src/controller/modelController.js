import { SageMakerRuntimeClient, InvokeEndpointCommand } from "@aws-sdk/client-sagemaker-runtime";
import dotenv from "dotenv";
import { awsStringToJSON } from "./utils.js"

dotenv.config();

const { AWS_MODEL_ENDPOINT, AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env;

export function writeout(){
    console.log(AWS_MODEL_ENDPOINT, AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
}
const client = new SageMakerRuntimeClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: "AKIAR3HUONQYA3PP6PFM",
        secretAccessKey: "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"
    }
});


const predict = async (imageBuffer) => { //return an obj
    try {
        const command = new InvokeEndpointCommand({
            EndpointName: "image-classification-2025-03-07-09-02-48-786",  
            Body: imageBuffer, // Gửi buffer ảnh trực tiếp
            ContentType: "image/png"  // Nếu gửi ảnh JPG thì đổi thành "image/jpeg"
        });

        const response = await client.send(command);
        let result = new TextDecoder("utf-8").decode(response.Body);
        console.log('get here in aws', result)
        let resultObj = awsStringToJSON(result)

        console.log("Predict from aws: ",resultObj)
        return resultObj
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};
export default predict;
