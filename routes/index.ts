import { Router } from "express";  
import generateReviewer from "./generateReviewer"
import test from "./test"
import reviewer from "./reviewer"

const routes = Router();

routes.use(generateReviewer)
routes.use(test)
routes.use(reviewer)

export default routes; 
