import { Router } from "express";
import multer from "multer";
import fs from "fs"
import pdf from "pdf-parse"
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = Router();

const genAI = new GoogleGenerativeAI(process.env.GEMENI_API_KEY as string);

const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction : "create item and defenition for my reviewer based on the given lesson add unique id. if the item is present in the definition make it blank instead of the item name. return it in json format [{id : string, item : string, defenition : string}, {id : string, item : string, defenition : string}]" 
});

const upload = multer({ dest: 'uploads/' })


router.post("/uploads", upload.array('files'), async (request, response) => {

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

export default router;