import express from "express"
import cors from "cors"
import dotenv  from "dotenv";
import multer from "multer";
import fs from "fs"
import pdf from "pdf-parse"
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config()

const app = express()

const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: "http://localhost:3000",
    credentials : true
}))

const upload = multer({ dest: 'uploads/' })

const genAI = new GoogleGenerativeAI(process.env.GEMENI_API_KEY as string);

const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction : "create 5 item and defenition for my reviewer based on the given lesson. return it in json format [{item : string, defenition : string}, {item : string, defenition : string}]" 
});


app.get("/",  (request, response)=> {
    response.send("hello")
})

app.post("/upload", upload.single('file'), async (request, response) => {

    if(!request.file)
    {
        response.send("error")
        return
    } 

    const { file } = request
    const buffer = fs.readFileSync("./uploads/" + file.filename)

    const pdfToString = (await pdf(buffer)).text

    const data =  await model.generateContent(pdfToString)

    const aiResponse = data.response.text()

    const formatResponse = aiResponse.match(/\[.*\]/s);

    const finalResponse = (formatResponse) ? JSON.parse(formatResponse[0]) : "";

    fs.unlinkSync("./uploads/" + file.filename)

    response.send(finalResponse)
})



app.listen(PORT, () => console.log("express server is listening.............." + PORT))
