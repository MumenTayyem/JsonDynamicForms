import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [LayoutComponent, HomeComponent],
  imports: [
    CommonModule
  ]
})
export class FormBuilderModule { }
