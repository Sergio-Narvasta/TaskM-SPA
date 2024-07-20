import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../models/task.create.model';
import { TaskService } from '../../services/task.service';
import { ResponseModel } from '../../models/response.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  @Output() formSubmit = new EventEmitter<any>();
  taskForm: FormGroup;
  selectedStatus: number;
  editingTask: any;
  currentDate: Date = new Date();
  dateNowStr: string = this.currentDate.toISOString().split('T')[0];
  statusList: any =[];
  priorityList: any =[];
  businessList: any =[]; 

  constructor(
    private fb: FormBuilder,
    private taskService : TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
    
  ) {
    this.selectedStatus = 1;
    this.taskForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      description: [''],
      status: new FormControl(1, Validators.required),
      expiredDate: [this.dateNowStr, Validators.required],
      priority: new FormControl(1, Validators.required),
      order: new FormControl(1, Validators.required),
      business: new FormControl(1, Validators.required),
      createDate : [this.dateNowStr]
    });
    this.editingTask = null;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadTask(id);
        this.taskForm.value.id = id;
      }
    });
    this.getBusinessList();
    this.getPriorityList();
    this.getStatusList();
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskCreate: Task = {
        id: this.taskForm.value.id || 0,
        name: this.taskForm.value.name,
        description: this.taskForm.value.description,
        expiredDate: this.taskForm.value.expiredDate,
        priority: this.taskForm.value.priority,
        order: this.taskForm.value.order,
        status: this.taskForm.value.status,
        business: this.taskForm.value.business,
        createDate: this.taskForm.value.createDate
      };

      const request = taskCreate.id === 0 ?
        this.taskService.insertTask(taskCreate) :
        this.taskService.updateTask(taskCreate);

      request.subscribe(
        (response : ResponseModel) => {
          if(response.status){
            this.toastr.success(response.message);

            this.formSubmit.emit(taskCreate); 
            setTimeout(() => {
              this.router.navigate(['/']); 
            }, 200);
            this.taskForm.reset();
          }else{
            this.toastr.error(response.message);
          }
        },(error: HttpErrorResponse) => {
          this.toastr.error('Ocurrio un error al enviar el formulario!');
        }
      );
    } else {
      this.toastr.error('Por favor, completa todos los campos requeridos', 'Error');
    }
  }

  loadTask(id: number): void {
    this.taskService.getTaskById(id).subscribe(task => {
      this.editingTask = task;
      this.taskForm.patchValue({
        id: task.id,
        name: task.name,
        description: task.description,
        status: task.status,
        expiredDate: task.expiredDate,
        priority: task.priority,
        order: task.order,
        business: task.business,
        createDate: task.createDate
      });
    });
  }

  getStatusList(){
    this.statusList = [
      { value: 1, viewValue: 'Pendiente', icon: 'watch_later', iconClass: 'pending' },
      { value: 2, viewValue: 'Completo', icon: 'check_circle', iconClass: 'complete' }
    ];
  }
  getPriorityList(){
    this.priorityList = [
      { value: 1, viewValue: 'Alta', icon: 'arrow_upward', iconClass: 'red-icon' },
      { value: 2, viewValue: 'Media', icon: 'arrow_drop_up', iconClass: 'orange-icon' },
      { value: 3, viewValue: 'Baja', icon: 'arrow_drop_down', iconClass: 'blue-icon' }
    ];
  }

  getBusinessList(){
    this.businessList = [
      { value: 1, viewValue: 'TOUCH' },
      { value: 2, viewValue: 'TISMART' },
      { value: 3, viewValue: 'INNOVA' },
      { value: 4, viewValue: 'PERSONAL'}
    ];
  }

  goToBack(){
    this.router.navigate(['']);
  }
}
