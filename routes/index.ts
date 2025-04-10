import { Router } from "express";  // Import Router

const routes = Router();

// Define your routes here
routes.get("/a", (request, response) => {
  response.send("Welcome to the API!");
});

export default routes;  // Export the router
