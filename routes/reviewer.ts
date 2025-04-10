import { Router } from "express";
import {query} from "../database/postgre"
import { saveInterface } from "../interface/save";

const router = Router();

router.get("/createReviewer", async (request, response) => {

    const {title, subject, createdAt, items} = request.body as saveInterface;

    const id =  crypto.randomUUID()

    await query("insert into reviewers (id, title, subject, createdAt) values ($1, $2, $3, $4)", [id, title, subject, createdAt])

    items.forEach(async (item) => {
        await query("insert into items (id, item, definition, reviewerId) values ($1, $2, $3, $4)", [item.id, item.item, item.definition, id])
    })

    response.send({message : "success"})

})

export default router;