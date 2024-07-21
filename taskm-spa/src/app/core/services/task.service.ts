import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';
import { TaskListDto } from '../models/task.list.model';
import { ResponseModel } from '../models/response.model';
import { Task } from '../models/task.model';
import { SearchDto } from '../models/search.model';
import { TaskCreateDto } from '../models/task.create.model';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private baseURL = environment.apiUrl;
 
    constructor(private http: HttpClient) {     
    }

    insertTask(model: TaskCreateDto): Observable<ResponseModel> {
        return this.http.post<ResponseModel>(`${this.baseURL}/api/v1/Task/Create`, model);
    }
    getTaskById(id: string): Observable<Task> {
        return this.http.get<Task>(`${this.baseURL}/api/v1/Task/GetById/${id}`);
      }

    getTaskList(searchDto: SearchDto): Observable<TaskListDto> {
        let filter ="";
        let hasFilter:boolean=false;
        if(searchDto.status){
            filter+=`status=${searchDto.status}`;
            hasFilter=true;
        }  
        if(searchDto.expiredDate){
            if(hasFilter){
                filter+=`&`;
            }
            filter+=`expiredDate=${searchDto.expiredDate}`;
        }
        return this.http.get<TaskListDto>(`${this.baseURL}/api/v1/Task/GetList?${filter}`);
    }

    deleteTask(id: string): Observable<ResponseModel> {
        return this.http.delete<ResponseModel>(`${this.baseURL}/api/v1/Task/Delete/${id}`);
    }

    updateTask(model: TaskCreateDto): Observable<ResponseModel> {
        return this.http.put<ResponseModel>(`${this.baseURL}/api/v1/Task/Update/`, model);
    }

}