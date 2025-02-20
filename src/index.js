import express from "express"
import predict from "./controller/modelController.js"
import { writeout } from "./controller/modelController.js"
// import viewEngine from "./config/viewEngine.js"
// import initWebRoutes from "./routes/web.js"

import {configViewEngine} from "./config/viewEngine.js"
import { initWebRoutes } from "./routes/web.js"

import bodyParser from "body-parser"
import dotenv from "dotenv"

let app = express()

//config view engine
configViewEngine(app)

dotenv.config()


//config body-parser

// app.use(express.raw({ type: "image/*", limit: "50mb" }));  

app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }))
app.use(express.raw({ type: "image/*", limit: "50mb" }));  

//init web routes
initWebRoutes(app)
app.post("/analyze", async (req, res) => {
    try {
        console.log(`REQ BODY IS ${req.body.length}`)
        const image = req.body; // Nhận ảnh từ request
        console.log(image)
        const result = await predict(image);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

let port = process.env.PORT || 8080
app.listen(port, function (){
    console.log("Server is running at ", `http://localhost:${port}`)
})