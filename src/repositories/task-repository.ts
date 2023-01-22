import { db } from "../database/db.js";
import { TaskEntity, TaskUpdate } from "../protocols/Task.js";
import { QueryResult } from "pg";

export async function insertTask(task: TaskEntity): Promise<QueryResult> {
    return await db.query(`
        INSERT INTO tasks (name, description, end_date) VALUES ($1, $2, $3);
    `, [task["name"], task["description"], task["end_date"]]);
}

export function allTasks(): Promise<QueryResult<TaskEntity>> {
    return db.query("SELECT * FROM tasks ORDER BY id");
}

export function doneAll(): Promise<QueryResult<TaskEntity>> {
    const state:boolean = true;
    return db.query(`SELECT * FROM tasks WHERE done = $1 ORDER BY id `, [state]);
}

export function undoneAll(): Promise<QueryResult<TaskEntity>> {
    const state:boolean = false;
    return db.query(`SELECT * FROM tasks WHERE done = $1 ORDER BY id `,[state]);
}

export async function updateOne(id: number, upTask: TaskUpdate): Promise<number> {
        const task = await db.query("SELECT * FROM tasks WHERE id = $1", [id]);

        const newName: string = !upTask["name"] ? task.rows[0].name : upTask["name"];
        const newDescription: string = !upTask["description"] ? task.rows[0].description : upTask["description"];
        const newEndDate: string | Date = !upTask["end_date"] ? task.rows[0].end_date : upTask["end_date"];

        const idTask: number = task.rows[0].id
        console.log(typeof idTask)
        if (!task.rows.length) {
            return task.rows.length;
        } else {
            await db.query(`
            UPDATE tasks SET name = $1, description = $2, end_date = $3 WHERE id = $4
        `, [newName, newDescription, newEndDate, task.rows[0].id]);
            return task.rows.length;
        }
}

export async function deleteOne(id: number): Promise<number> {
    const task = await db.query("SELECT * FROM tasks WHERE id = $1", [id]);
    if (!task.rows.length) {
        return task.rows.length;
    } else {
        await db.query("DELETE FROM tasks WHERE id = $1", [task.rows[0].id]);
        return task.rows.length;
    }
}
export async function doneOne(id: number): Promise<number> {
    const task = await db.query("SELECT * FROM tasks WHERE id = $1", [id]);
    if (!task.rows.length) {
        return task.rows.length;
    } else {
        await db.query(`UPDATE tasks SET done = $1 WHERE id = $2`, ["true", task.rows[0].id]);
        return task.rows.length
    }
}