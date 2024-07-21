import { Task } from "./task.model";

export class TaskDto {
  expiredDate: Date;
  tasks: Task[];
  expiredDateStr: string;

  constructor(expiredDate: Date, expiredDateStr:string, tasks: Task[] ) {
      this.expiredDate = expiredDate;
      this.tasks = tasks;
      this.expiredDateStr= expiredDateStr ;
  }
}

export class TaskListDto {
  data: TaskDto[];

  constructor( data: TaskDto[] ) {
    this.data = data;
  }
}