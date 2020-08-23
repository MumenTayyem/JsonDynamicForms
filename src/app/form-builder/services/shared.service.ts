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
      'pattern',
      'maxLength',
      'minLength'
    ],
    number: [
      'required',
      'max',
      'min'
    ],
    date: [
      'required',
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

    this.cleanForm(controlData);
    for (let index = 0; index < controlData.selectedValidators.length; index++) {
      const f = controlData.selectedValidators[index];

      if (controlData.dynamicFields.filter(df => df.name == f).length > 0) { // if dynamic field already exist, no need to add it again
        continue;
      }

      switch (f) {
        case 'required':
          controlData.isRequired = true;
          break;
        case 'atLeastOne':
          controlData.isRequired = true;
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
        case 'pattern':
          // controlData.form.addControl('regex', new FormControl('', [Validators.required]));
          controlData.dynamicFields.push({
            name: 'pattern',
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
    // this.cleanForm(controlData);
  }

  cleanForm(controlData: ControlData) {
    console.log(controlData.dynamicFields);
    for (let index = 0; index < controlData.selectedValidators.length; index++) {
      const element: string = controlData.selectedValidators[index];
      if (element == 'name' || element == 'displayName' || element == 'options')
        continue;

      if (controlData.dynamicFields.filter(df => df.type == element).length == 0) {
        console.log('removing '+element);
        let indexToDelete = controlData.dynamicFields.findIndex(df => df.type == element);
        controlData.dynamicFields.splice(indexToDelete,1);
      }
    }
    controlData.form.updateValueAndValidity();
    console.log(controlData.dynamicFields);
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

  getControlValue(controlData: ControlData) {
    let value = Object.assign({}, controlData.form.getRawValue());
    delete value.errorMessage;

    value.type = controlData.type;
    if (controlData.specificType){
      value.specificType = controlData.specificType;
    }

    value.validators = [];
    controlData.dynamicFields.forEach(df => value.validators.push(df.form.getRawValue()));

    if (controlData.isRequired){
      value.validators.push({
        type: controlData.type === "checkbox" ? "atLeastOne":"required",
        errorMessage: controlData.form.controls.errorMessage.value
      });
    }

    if (controlData.options){
      value.options = [];
      controlData.options.forEach(option=>{
        value.options.push(option.getRawValue());
      });
    }
    return value;
  }
}
