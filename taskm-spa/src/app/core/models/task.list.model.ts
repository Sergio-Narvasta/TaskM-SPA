import { Task } from "./task.create.model";

export class TaskDto {
  expiredDate: Date;
  count: number;
  tasks: Task[];
  expiredDateStr: string;

  constructor(expiredDate: Date, expiredDateStr:string, count: number, tasks: Task[] ) {
      this.expiredDate = expiredDate;
      this.count = count;
      this.tasks = tasks;
      this.expiredDateStr=expiredDateStr ;
  }
}

export class TaskListDto {
  data: TaskDto[];

  constructor( data: TaskDto[] ) {
    this.data = data;
  }
}