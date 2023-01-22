import express from "express";
import { deleteTask, getTasks, insert, updateTask } from "./controllers/tasks-controller.js";
var app = express();
app.use(express.json());
app.post("/tasks", insert);
app.get("/tasks", getTasks);
app.put("/tasks/:id", updateTask);
app["delete"]("/tasks/:id", deleteTask);
app.listen(5000, function () {
    console.log("App running in port 5000");
});
