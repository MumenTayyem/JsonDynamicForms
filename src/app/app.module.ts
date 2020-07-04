import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DJFormModule } from './dj-form/dj-form.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './form-builder/layout/layout.component';
import { HomeComponent } from './form-builder/home/home.component';

const routes:Routes = [
  {
    path:'formsbuilder',
    loadChildren:()=> import('./form-builder/form-builder.module').then(m=>m.FormBuilderModule)
  },
  {
    path:'',
    redirectTo:'formsbuilder',
    pathMatch:'full'
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DJFormModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
