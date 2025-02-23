import express from "express"
import cors from "cors"
import dotenv  from "dotenv";
import multer from "multer";
import fs from "fs"
import pdf from "pdf-parse"

const upload = multer({ dest: 'uploads/' })

const app = express()

dotenv.config()

const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: "http://localhost:3000",
    credentials : true
}))


app.get("/",  (request, response)=> {
    response.send("hello world")
})

app.post("/upload", upload.single('file'), (request, response) => {
    console.log("success")
    response.send("sucess")
})



app.listen(PORT, () => console.log("express server is listening.............." + PORT))
