import { SageMakerRuntimeClient, InvokeEndpointCommand } from "@aws-sdk/client-sagemaker-runtime";
import dotenv from "dotenv";

dotenv.config();

const { AWS_MODEL_ENDPOINT: ENDPOINT, AWS_REGION: REGION, AWS_ACCESS_KEY_ID: ACCESS_KEY, AWS_SECRET_ACCESS_KEY: SECRET_KEY } = process.env;

const client = new SageMakerRuntimeClient({
    region: REGION,
    credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_KEY
    }
});

const predict = async (imageBase64) => {
    try {
        const command = new InvokeEndpointCommand({
            EndpointName: ENDPOINT, 
            Body: JSON.stringify({ image: imageBase64 }),
            ContentType: "application/json"
        });

        const response = await client.send(command);
        const result = new TextDecoder("utf-8").decode(response.Body);

        return JSON.parse(result);
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

export default predict;
