import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DJFormModule } from './dj-form/dj-form.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DJFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
