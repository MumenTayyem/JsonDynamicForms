import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import {RouterModule,Routes} from '@angular/router';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ControlToAddComponent } from './control-to-add/control-to-add.component';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DateControlToAddComponent } from './controls-to-add/date-control-to-add/date-control-to-add.component';

const routes:Routes = [
  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
      }
    ]
  }
];

@NgModule({
  declarations: [LayoutComponent, HomeComponent, ControlToAddComponent, DateControlToAddComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DragDropModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule
  ],
  exports:[RouterModule]
})
export class FormBuilderModule { }
