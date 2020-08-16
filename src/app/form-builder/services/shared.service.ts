import { Injectable } from '@angular/core';
import { ControlData, DynamicField } from '../models/controlData.model';
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

  getAvailableValidators(key: string) {
    return this.allValidators[key];
  }

  validatorsChanged(event: any, controlData: ControlData) {
    controlData.selectedValidators = event.value;
    this.handleDynamicFields(controlData);
  }

  handleDynamicFields(controlData: ControlData) {
    // this.cleanForm(controlData);
    for (let index = 0; index < controlData.selectedValidators.length; index++) {
      const f = controlData.selectedValidators[index];

      if (controlData.dynamicFields.filter(df => df.name == f).length > 0) { // if dynamic field already exist, no need to add it again
        continue;
      }

      switch (f) {
        case 'required':
          break;
        case 'max':
          // controlData.form.addControl('max', new FormControl('', [Validators.required]));
          controlData.dynamicFields.push({
            name: 'max',
            type: 'text',
            specificType: 'number'
          });
          break;
        case 'min':
          // controlData.form.addControl('min', new FormControl('', [Validators.required]));
          controlData.dynamicFields.push({
            name: 'min',
            type: 'text',
            specificType: 'number'
          });
          break;
        case 'regex':
          // controlData.form.addControl('regex', new FormControl('', [Validators.required]));
          controlData.dynamicFields.push({
            name: 'regex',
            type: 'text'
          });
          break;
        case 'maxLength':
          // controlData.form.addControl('maxLength', new FormControl('', [Validators.required]));
          controlData.dynamicFields.push({
            name: 'maxLength',
            type: 'text',
            specificType: 'number'
          });
          break;
        case 'minLength':
          // controlData.form.addControl('minLength', new FormControl('', [Validators.required]));
          controlData.dynamicFields.push({
            name: 'minLength',
            type: 'text',
            specificType: 'number'
          });
          break;
        case 'before':
          // controlData.form.addControl('before', new FormControl('', [Validators.required]));
          controlData.dynamicFields.push({
            name: 'before',
            type: 'date'
          });
          break;
        case 'after':
          // controlData.form.addControl('after', new FormControl('', [Validators.required]));
          controlData.dynamicFields.push({
            name: 'after',
            type: 'date'
          });
          break;
        case 'afterDateInForm':
          // controlData.form.addControl('afterDateInForm', new FormControl('', [Validators.required]));
          controlData.dynamicFields.push({
            name: 'afterDateInForm',
            type: 'select',
            // others: controlData.getOtherDateFields(controlData.form.controls.name.value)
          });
          break;
        case 'beforeDateInForm':
          // controlData.form.addControl('beforeDateInForm', new FormControl('', [Validators.required]));
          controlData.dynamicFields.push({
            name: 'beforeDateInForm',
            type: 'select',
            // others: controlData.getOtherDateFields(controlData.form.controls.name.value)
          });
          break;
      }
    }
  }

  cleanForm(controlData: ControlData) {
    let keys = Object.keys(controlData.form.controls);

    for (let index = 0; index < keys.length; index++) {
      const element: string = keys[index];
      if (element == 'name' || element == 'displayName' || element == 'options')
        continue;

      if (controlData.dynamicFields.filter(df => df.name == element).length == 0) {
        controlData.form.removeControl(element);
      }
    }
    controlData.form.updateValueAndValidity();
  }

  getOtherDateFields(currentFieldName: string, form: FormGroup) {
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
    return fieldNames;
  }
}
