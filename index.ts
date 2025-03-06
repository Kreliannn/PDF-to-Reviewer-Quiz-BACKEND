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
    systemInstruction : "create 10 item and defenition for my reviewer based on the given lesson add unique id. return it in json format [{id : number, item : string, defenition : string}, {id : number, item : string, defenition : string}]" 
});


app.post("/",  (request, response)=> {

  const data = [
    {
      id: crypto.randomUUID(),
      item: "Usability",
      definition:
        "Usability is essential for market success, reliability, and efficiency. It ensures users can complete tasks easily and minimizes frustration.",
    },
    {
      id: crypto.randomUUID(),
      item: "Gestalt Principles",
      definition:
        "Gestalt principles describe how humans perceive visual elements as unified wholes rather than individual parts. They include proximity, similarity, continuity, closure, and figure-ground (distinguishing between object and background).",
    },
    {
      id: crypto.randomUUID(),
      item: "GOMS Keystroke-Level Model (KLM)",
      definition:
        "A predictive model in HCI used to estimate the time it takes a user to perform tasks. It breaks actions into Goals, Operators, Methods, and Selection rules to model user behavior.",
    },
    {
      id: crypto.randomUUID(),
      item: "Ergonomics in Input Device Design",
      definition:
        "Ergonomics focuses on aligning devices with human physical needs to reduce strain and improve efficiency. Examples include adjustable keyboard angles and contoured mice.",
    },
    {
      id: crypto.randomUUID(),
      item: "GOMS Keystroke-Level Model (KLM)",
      definition:
        "A predictive model in HCI used to estimate the time it takes a user to perform tasks. It breaks actions into Goals, Operators, Methods, and Selection rules to model user behavior.",
    },
    {
      id: crypto.randomUUID(),
      item: "Ergonomics in Input Device Design",
      definition:
        "Ergonomics focuses on aligning devices with human physical needs to reduce strain and improve efficiency. Examples include adjustable keyboard angles and contoured mice.",
    },
    {
      id: crypto.randomUUID(),
      item: "GOMS Keystroke-Level Model (KLM)",
      definition:
        "A predictive model in HCI used to estimate the time it takes a user to perform tasks. It breaks actions into Goals, Operators, Methods, and Selection rules to model user behavior.",
    },
    {
      id: crypto.randomUUID(),
      item: "Ergonomics in Input Device Design",
      definition:
        "Ergonomics focuses on aligning devices with human physical needs to reduce strain and improve efficiency. Examples include adjustable keyboard angles and contoured mice.",
    },
  ];
  
  console.log(data);
  

  response.send(data)
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


app.post("/test", upload.array('files'), async (request, response) => {

  const allFiles = request.files as Express.Multer.File[]

  const arr: string[] = [];

  const promises = await allFiles.map(async (file) => {
    const buffer = fs.readFileSync("./uploads/" + file.filename)
    const pdfToString = (await pdf(buffer)).text
    return pdfToString
  })

  const results = await Promise.all(promises);

  arr.push(...results);

  const prompt = arr.join(" "); 
  
  const data =  await model.generateContent(prompt)

  const aiResponse = data.response.text()

  const formatResponse = aiResponse.match(/\[.*\]/s);

  const finalResponse = (formatResponse) ? JSON.parse(formatResponse[0]) : "";

  allFiles.forEach(file => fs.unlinkSync("./uploads/" + file.filename))

  response.send(finalResponse)
})



app.listen(PORT, () => console.log("express server is listening.............." + PORT))
