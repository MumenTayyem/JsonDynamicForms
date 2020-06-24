import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { TextComponent } from './types/text/text.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HostDirective } from './directives/host.directive';
import { FormControlHostComponent } from './form/form-control-host/form-control-host.component';
import { SelectComponent } from './types/select/select.component';
import { RadioComponent } from './types/radio/radio.component';
import { CheckboxComponent } from './types/checkbox/checkbox.component';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MAT_DATE_LOCALE, MatSelectModule,MatRadioModule,MatCheckboxModule, MatButtonModule} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';



@NgModule({
  declarations: [FormComponent, TextComponent, HostDirective, FormControlHostComponent, SelectComponent, RadioComponent, CheckboxComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule
    // MatMomentDateModule
  ],
  exports:[FormComponent],
  entryComponents:[TextComponent,SelectComponent,RadioComponent,CheckboxComponent],
  providers:[
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ]
})
export class DJFormModule { }
