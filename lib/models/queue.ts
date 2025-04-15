export class Queue<T> {
    private size: number;

    private front: number = -1;
    private back: number = -1;

    private data: T[] = [];


    constructor(size: number) {
        this.size = size;
    }

    private isEmpty(): boolean {
        if (this.front == -1) {
            return true;
        }
        else {
            return false;
        }
    }

    private isFull(): boolean {
        if ((this.back + 1) % this.size == this.front) {
            return true;
        }
        else {
            return false;
        }
    }

    enqueue(value: T): boolean {
        if (this.isFull()) {
            return false;
        }
        if (this.isEmpty()) {
            this.front = 0; // First element inserted
        }
        this.back = (this.back + 1) % this.size;
        this.data[this.back] = value;
        return true;
    }

    dequeue(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }

        const value = this.data[this.front];

        if (this.front === this.back) {
            this.front = -1;
            this.back = -1;
        } else {
            this.front = (this.front + 1) % this.size;
        }

        return value;
    }

    getQueue(): T[] {

        if (this.isEmpty()) {
            return [];
        }

        let data: T[] = [];
        let i = this.front;
        while (true) {
            data.push(this.data[i]);
            if (i == this.back) {
                break;
            }
            i = (i + 1) % this.size;
        }
        return data;
    }
}