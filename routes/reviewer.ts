import { Router } from "express";
import {query} from "../database/postgre"
import { saveInterface } from "../interface/save";

const router = Router();

router.post("/createReviewer", async (request, response) => {

    const   {title, subject, createdAt, items} = request.body as saveInterface;

    const id =  crypto.randomUUID()
   
    await query("insert into reviewers (id, title, subject, createdAt) values ($1, $2, $3, $4)", [id, title, subject, createdAt])

    items.forEach(async (item) => {
        await query("insert into items (id, item, definition, reviewer_id) values ($1, $2, $3, $4)", [item.id, item.item, item.definition, id])
    })

    response.send({message : "success"})

})

router.get("/getAllReviewers", async (request, response) => {
    const data = await query("select * from reviewers")
    response.send(data.rows)
})

export default router;