import express from "express"
import cors from "cors"

const app = express()

const PORT = process.env.PORT || 4000;



app.get("/",  (request, response)=> {
    response.send("hello world")
})



app.listen(PORT, () => console.log("express server is listening.............."))
