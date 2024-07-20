import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  standalone: false,
})
export class DropdownComponent {
  @Input() control!: FormControl;
  selectedStatus: number;

  statuses = [
    { value: 1, viewValue: 'Pendiente', icon: 'watch_later', iconClass: 'pending' },
    { value: 2, viewValue: 'Completo', icon: 'check_circle', iconClass: 'complete' }
  ];
  constructor(){
    this.selectedStatus = 1;

  }
  ngOnInit(): void {
    
    if (!this.control.value) {
      this.control.setValue(1); 
    }
  }
}
