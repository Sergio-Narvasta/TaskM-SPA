import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { FormComponent } from './core/components/form/form.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'edit/:id', component: FormComponent },
    { path: 'create', component: FormComponent },
];
