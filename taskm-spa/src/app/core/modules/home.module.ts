import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from '../../modules/home/home.component';
import { CoreModule } from './core.module';
import { TableComponent } from '../components/table/table.component';
import { FormComponent } from '../components/form/form.component';
import { DropdownComponent } from '../components/dropdown/dropdown.component';
import { CommunicationService } from '../services/communication.service';
import { FormatDatePipe } from '../../shared/pipes/date.pipe';

@NgModule({
  declarations: [
    HomeComponent,
    TableComponent,
    FormComponent,
    DropdownComponent,
    FormatDatePipe
  ],
  imports: [
    CoreModule,
    FormsModule ,
  ],
  providers: [
    CommunicationService
  ]
})
export class HomeModule { }
