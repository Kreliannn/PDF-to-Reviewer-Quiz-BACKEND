import { Router } from "express";

const router = Router();


router.post("/mockUpData",  (request, response) => {
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
    
      setTimeout(() => {  
        response.send(data)
      }, 8000);
      
})

export default router;