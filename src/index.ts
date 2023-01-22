import express from "express";
import { deleteTask, doneTask, doneTasks, getTasks, insert, undoneTasks, updateTask } from "./controllers/tasks-controller.js";
import dotenv from "dotenv";

dotenv.config({path: "../.env"});

const app = express();
app.use(express.json());

app.post("/tasks", insert);
app.get("/tasks", getTasks); 
app.put("/tasks/:id", updateTask);
app.delete("/tasks/:id", deleteTask);
app.get("/done", doneTasks); 
app.put("/done/:id", doneTask)
app.get("/undone", undoneTasks); 


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`App running in port ${port}`);
})