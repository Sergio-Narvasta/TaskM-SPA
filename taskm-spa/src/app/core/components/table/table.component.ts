import { Component, Input  } from '@angular/core';
import { TaskDto } from '../../models/task.list.model';
import { TaskService } from '../../services/task.service';
import { ResponseModel } from '../../models/response.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() tasks: TaskDto[] = [];

  constructor(private taskService : TaskService, 
    private router: Router,
    private toastr: ToastrService
  ) { }

  onEditTask(id: number): void {
    this.router.navigate([`/edit`, id]);
  }

  onDeleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe((response : ResponseModel) => {
      if(response.status){
        this.toastr.success(response.message);
        setTimeout(() => {
          location.reload();
        }, 200);
      }else{
        this.toastr.error(response.message);
      }
    });
  }

  getPriorityClass(priority: number): string {
    switch (priority) {
      case 1:
        return 'red-icon';  
      case 2:
        return 'orange-icon'; 
      case 3:
        return 'blue-icon';   
      default:
        return 'default-icon';
    }
  }
}
