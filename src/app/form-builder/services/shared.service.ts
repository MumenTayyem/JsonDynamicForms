import { Injectable } from '@angular/core';
import { ControlData } from '../models/controlData.model';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  allValidators: any = {
    text: [
      'required',
      'regex',
      'maxLength',
      'minLength'
    ],
    number: [
      'max',
      'min'
    ],
    date: [
      'before',
      'after',
      'afterDateInForm',
      'beforeDateInForm'
    ],
    radio: [
      'required'
    ],
    select: [
      'required'
    ],
    checkbox: [
      'atLeastOne'
    ]
  };

  getAvailableValidators(key:string){
    return this.allValidators[key];
  }

  validatorsChanged(event:any,controlData:ControlData) {
    controlData.selectedValidators = event.value;
    this.handleDynamicFields(controlData);
  }

  handleDynamicFields(controlData:ControlData) {
    controlData.dyanmicFields = [];
    console.log(controlData.selectedValidators);
    controlData.selectedValidators.forEach(f => {

      switch (f) {
        case 'required':
          break;
        case 'max':
          controlData.form.addControl('max', new FormControl('', [Validators.required]));
          controlData.dyanmicFields.push({
            name: 'max',
            type: 'text',
            specificType: 'number'
          });
          break;
        case 'min':
          controlData.form.addControl('min', new FormControl('', [Validators.required]));
          controlData.dyanmicFields.push({
            name: 'min',
            type: 'text',
            specificType: 'number'
          });
          break;
        case 'regex':
          controlData.form.addControl('regex', new FormControl('', [Validators.required]));
          controlData.dyanmicFields.push({
            name: 'regex',
            type: 'text'
          });
          break;
        case 'maxLength':
          controlData.form.addControl('maxLength', new FormControl('', [Validators.required]));
          controlData.dyanmicFields.push({
            name: 'maxLength',
            type: 'text',
            specificType: 'number'
          });
          break;
        case 'minLength':
          controlData.form.addControl('minLength', new FormControl('', [Validators.required]));
          controlData.dyanmicFields.push({
            name: 'minLength',
            type: 'text',
            specificType: 'number'
          });
          break;
        case 'before':
          controlData.form.addControl('before', new FormControl('', [Validators.required]));
          controlData.dyanmicFields.push({
            name: 'before',
            type: 'date'
          });
          break;
        case 'after':
          controlData.form.addControl('after', new FormControl('', [Validators.required]));
          controlData.dyanmicFields.push({
            name: 'after',
            type: 'date'
          });
          break;
        case 'afterDateInForm':
          controlData.form.addControl('afterDateInForm', new FormControl('', [Validators.required]));
          controlData.dyanmicFields.push({
            name: 'afterDateInForm',
            type: 'select',
            // others: controlData.getOtherDateFields(controlData.form.controls.name.value)
          });
          break;
        case 'beforeDateInForm':
          controlData.form.addControl('beforeDateInForm', new FormControl('', [Validators.required]));
          controlData.dyanmicFields.push({
            name: 'beforeDateInForm',
            type: 'select',
            // others: controlData.getOtherDateFields(controlData.form.controls.name.value)
          });
          break;
      }
    });

    this.cleanForm(controlData);
  }

  cleanForm(controlData:ControlData) {
    let keys = Object.keys(controlData.form.controls);

    for (let index = 0; index < keys.length; index++) {
      const element: string = keys[index];
      if (element == 'name' || element == 'displayName' || element == 'options')
        continue;

      if (controlData.dyanmicFields.filter(df => df.name == element).length == 0) {
        controlData.form.removeControl(element);
      }
    }
    controlData.form.updateValueAndValidity();
  }

  getOtherDateFields(currentFieldName: string,form:FormGroup) {
    let fieldNames = [];

    let keys = Object.keys(form.controls);
    // let keys = ['date of birth', 'visa expiry', 'hi'];
    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];
      if (element == form.controls.name.value)
        continue;
      else
        fieldNames.push(element);
      // fieldNames.push(element);


    }
    console.log(fieldNames);
    return fieldNames;
  }
}
