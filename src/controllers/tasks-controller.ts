import {  Request, Response } from "express";
import {TaskEntity } from "../protocols/Task.js";
import { allTasks, deleteOne, doneOne, insertTask, updateOne, doneAll, undoneAll } from "../repositories/task-repository.js";
import { TaskSchema } from "../schemas/task-schema.js";


export async function insert(req: Request, res:Response ){
    const newTask = req.body as TaskEntity;
    TaskSchema.validate(newTask);

    const {error} = TaskSchema.validate(newTask) ;
    if (error){
        return res.status(400).send({
            message: error.message
        });
    }
    const result = await insertTask(newTask);
    return res.status(201).send(`Task inserted ${result.rowCount}` );
}

export async function getTasks(req: Request, res:Response){
    const tasks = await allTasks();
    return res.status(200).send(tasks.rows);   
}
export async function doneTasks(req: Request, res:Response){
    const tasks = await doneAll();
    return res.status(200).send(tasks.rows);   
}
export async function undoneTasks(req: Request, res:Response){
    const tasks = await undoneAll();
    return res.status(200).send(tasks.rows);   
}

export async function updateTask(req: Request, res: Response){
    const upTask = req.body as TaskEntity;
    const id = parseInt(req.params.id);
    console.log(id)
    const result = await updateOne(id, upTask);
    console.log(result)
    if(!result){
        return res.status(404).send("Task not found")
    }else{
        return res.status(200).send(`Task ${id} updated `)
    }
    return res.send()
}

export async function deleteTask(req: Request, res: Response){
    const id = parseInt(req.params.id);
    const result = await deleteOne(id);
    if(!result){
        return res.status(404).send("Task not found")
    }else{
        return res.status(200).send(`Task ${id} deleted`)
    }    
}

export async function doneTask(req: Request, res: Response){
    const id = parseInt(req.params.id);
    const result = await doneOne(id);
    if(!result){
        return res.status(404).send("Task not found")
    }else{
        return res.status(200).send(`Task ${id} done`)
    }    

}


