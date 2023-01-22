export type TaskEntity = {
    id? : number,
    name: string ,
    description: string,
    end_date: string | Date
}[];

export type TaskUpdate = {
    name?: string ,
    description?: string,
    end_date?: string | Date
}[];

