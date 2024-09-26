export class Task {
    public title: string;
    public description?: string;
    public dateStart: string;
    public dateEnd: string;
    public state: string;
    public priority: string;

    constructor(task: any) {
        this.title = task.title;
        this.description = task.description;
        this.dateStart = task.dateStart;
        this.dateEnd = task.dateEnd;
        this.state = task.state;
        this.priority = task.priority;
    }

}