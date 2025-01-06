import express from "express"
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
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//init web routes
initWebRoutes(app)

let port = process.env.PORT || 8080
app.listen(port, function (){
    console.log("i'm tired. ", `http://localhost:${port}`)
})