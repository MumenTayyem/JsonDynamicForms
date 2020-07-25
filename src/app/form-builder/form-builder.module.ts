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
import { SelectControlToAddComponent } from './controls-to-add/select-control-to-add/select-control-to-add.component';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { TextControlToAddComponent } from './controls-to-add/text-control-to-add/text-control-to-add.component';
import { NumberControlToAddComponent } from './controls-to-add/number-control-to-add/number-control-to-add.component';
import { RadioControlToAddComponent } from './controls-to-add/radio-control-to-add/radio-control-to-add.component';
import { DynamicFieldsComponent } from './dynamic-fields/dynamic-fields.component';
import { OptionsComponent } from './options/options.component';
import { CheckBoxControlToAddComponent } from './controls-to-add/check-box-control-to-add/check-box-control-to-add.component';
import {MatExpansionModule} from '@angular/material/expansion';

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
  declarations: [LayoutComponent, HomeComponent, ControlToAddComponent, DateControlToAddComponent, SelectControlToAddComponent, TextControlToAddComponent, NumberControlToAddComponent, RadioControlToAddComponent, DynamicFieldsComponent, OptionsComponent, CheckBoxControlToAddComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DragDropModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule
  ],
  exports:[RouterModule]
})
export class FormBuilderModule { }
