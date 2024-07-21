import { Component } from '@angular/core';
import { TaskDto, TaskListDto } from '../../core/models/task.list.model';
import { TaskService } from '../../core/services/task.service';
import { Router } from '@angular/router';
import { SearchDto } from '../../core/models/search.model';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
tasklist : TaskDto[];
showForm = false;
searchDto : SearchDto;

  constructor(private taskService : TaskService, private router: Router){
    this.tasklist = [];
    this.searchDto = new SearchDto("1","");
  }

  ngOnInit() : void{
    this.getTaskList();
  }

  getTaskList() {
    this.taskService.getTaskList(this.searchDto).subscribe((response: TaskListDto) => {
      this.tasklist = response.data.sort((a, b) => {
        const dateA = new Date(a.expiredDate).getTime();
        const dateB = new Date(b.expiredDate).getTime();
        return dateA - dateB;
      });
    })
  }

  goToCreate() {
    this.router.navigate(['/create']); 
  }

}
