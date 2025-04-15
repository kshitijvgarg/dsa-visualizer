export class Task {
    private no: number;
    private status: string;
    private task: string;

    constructor(no: number, status: string, task: string) {
        this.no = no;
        this.status = status;
        this.task = task;
    }
    getNo(): number {
        return this.no;
    }

    getStatus(): string {
        return this.status;
    }

    getTask(): string {
        return this.task;
    }

    setTask(task: string): void {
        this.task = task;
    }

    setStatus(status: string): void {
        this.status = status;
    }
}
