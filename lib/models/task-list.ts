import { Task } from "./task";


export class TaskList {
    private taskList: Array<Task>;

    constructor(taskList: Array<Task> = []) {
        this.taskList = taskList;
    }

    addTask(task: Task): void {
        this.taskList.push(task);
    }

    deleteTask(no: number): void {
        this.taskList = this.taskList.filter(task => task.getNo() !== no);
    }

    getTasks(): Array<Task> {
        return this.taskList;
    }
}
