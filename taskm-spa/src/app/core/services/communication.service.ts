
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TaskDto } from '../models/task.list.model';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private editTaskSubject = new Subject<any>();
  private deleteTaskSubject = new Subject<any>();

  editTask$ = this.editTaskSubject.asObservable();
  deleteTask$ = this.deleteTaskSubject.asObservable();

  sendEditTask(task: TaskDto) {
    this.editTaskSubject.next(task);
  }

  sendDeleteTask(id: number) {
    this.deleteTaskSubject.next(id);
  }
}
