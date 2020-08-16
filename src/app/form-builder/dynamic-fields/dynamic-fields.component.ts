import { Component, OnInit, Input } from '@angular/core';
import { DynamicField, ControlData } from '../models/controlData.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-fields',
  templateUrl: './dynamic-fields.component.html',
  styleUrls: ['./dynamic-fields.component.scss']
})
export class DynamicFieldsComponent implements OnInit {
  
  @Input() dynamicFields:DynamicField[]=[];
  @Input() form:FormGroup;
  @Input() controlData:ControlData;
  panelOpenState = false;

  ngOnInit(): void {
    if (this.controlData && this.controlData.dynamicFieldsChanged){
      this.controlData.dynamicFieldsChanged.subscribe(()=>{
        for (let index = 0; index < this.controlData.dyanmicFields.length; index++) {
          const df = this.controlData.dyanmicFields[index];
          df.form = new FormGroup({
            [df.name] : new FormControl('',[Validators.required]),
            errorMessage : new FormControl('',[Validators.required])
          });
        }
        console.log(this.controlData.dyanmicFields);
      });
    }
  }
}
