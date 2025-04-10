import express from "express"
import cors from "cors"
import dotenv  from "dotenv";
import multer from "multer";
import fs from "fs"
import pdf from "pdf-parse"
import {query} from "./database/postgre"
import routes from "./routes/index"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: "http://localhost:3000",
    credentials : true
}))

app.use(routes)


app.post("/",  (request, response)=> {

 
})



app.listen(PORT, () => console.log("express server is listening.............." + PORT))
