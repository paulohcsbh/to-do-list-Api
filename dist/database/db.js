import pkg from "pg";
var Pool = pkg.Pool;
export var db = new Pool({
    user: "postgres",
    host: "localhost",
    port: 5432,
    database: "todo_list",
    password: "123456"
});
