import { Injectable, QueryList } from '@angular/core';
import { ControlData, DynamicField } from '../models/controlData.model';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ControlToAddComponent } from '../control-to-add/control-to-add.component';

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

  addedControls!: QueryList<ControlToAddComponent>;

  getAvailableValidators(key: string) {
    return this.allValidators[key];
  }

  validatorsChanged(event: any, controlData: ControlData) {
    controlData.selectedValidators = event.value;
    this.handleDynamicFields(controlData);
  }

  handleDynamicFields(controlData: ControlData) {

    if (!controlData.selectedValidators)
      return;
    controlData.isRequired = controlData.selectedValidators.indexOf('required') > -1
      || controlData.selectedValidators.indexOf('atLeastOne') > -1 ? true : false;

    for (let index = 0; index < controlData.selectedValidators.length; index++) {
      const f = controlData.selectedValidators[index];

      if (controlData.dynamicFields.filter(df => df.name == f).length > 0) { // if dynamic field already exist, no need to add it again
        continue;
      }

      switch (f) {
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
          });
          controlData.others = this.getOtherDateFields(controlData);
          break;
        case 'beforeDateInForm':
          // controlData.form.addControl('beforeDateInForm', new FormControl('', [Validators.required]));
          controlData.dynamicFields.push({
            name: 'beforeDateInForm',
            type: 'select'
          });
          controlData.others = this.getOtherDateFields(controlData);
          break;
      }
    }
    this.cleanForm(controlData);
  }

  cleanForm(controlData: ControlData) {
    //you need to check whether the new selected validators still exist in the dynamic fields
    controlData.dynamicFields.forEach(df => {
      let indexInSelectedValidators = controlData.selectedValidators.findIndex(sv => sv === df.name);
      if (indexInSelectedValidators === -1) {
        let indexToRemove = controlData.dynamicFields.findIndex(tempDF => tempDF.name === df.name);
        controlData.dynamicFields.splice(indexToRemove, 1);
      }
    });
  }

  getOtherDateFields(controlData: ControlData) {

    let controlsToSelectFrom: string[] = [];

    this.addedControls.forEach(ad => {
      if (ad.control.controlData.form.controls.name.value && controlData.form.controls.name.value) {
        if (ad.control.controlData.form.controls.name.value != controlData.form.controls.name.value) {
          controlsToSelectFrom.push(this.getControlName(ad.control.controlData));

        }
      }
    });
    console.log(controlsToSelectFrom);
    return controlsToSelectFrom;
  }

  getControlValue(controlData: ControlData) {

    let basicInfoInvalid = false;
    let dynamicFieldsInvalid = false;
    let optionsInvalid = false;

    if (controlData.form.invalid) {
      basicInfoInvalid = true;
      controlData.form.markAllAsTouched();
      controlData.form.markAsDirty();
    }

    controlData.dynamicFields.forEach(ad => {
      if (ad.form.invalid) {
        dynamicFieldsInvalid = true;
        ad.form.markAllAsTouched();
        ad.form.markAsDirty();
      }
    });

    if (controlData.fetchFromAPI !== null || controlData.fetchFromAPI !== undefined) {


      if (controlData.fetchFromAPI === true) {
        if (controlData.fetchForm.invalid) {
          optionsInvalid = true;
          controlData.fetchForm.markAllAsTouched();
          controlData.fetchForm.markAsDirty();
        }
      } else {

        controlData.options.forEach(optionForm => {
          if (optionForm.invalid) {
            optionsInvalid = true;
            optionForm.markAllAsTouched();
            optionForm.markAsDirty();
          }
        });
      }
    }

    if (basicInfoInvalid || dynamicFieldsInvalid || optionsInvalid) {
      controlData.panelOpenState = true;
      return;
    }

    let value = Object.assign({}, controlData.form.getRawValue());
    delete value.errorMessage;

    value.type = controlData.type;
    if (controlData.specificType) {
      value.specificType = controlData.specificType;
    }

    value.validators = [];
    controlData.dynamicFields.forEach(df => value.validators.push(df.form.getRawValue()));

    if (controlData.isRequired) {
      value.validators.push({
        type: controlData.type === "checkbox" ? "atLeastOne" : "required",
        errorMessage: controlData.form.controls.errorMessage.value
      });
    }

    if (controlData.type == "checkbox" ||
      controlData.type == "select" ||
      controlData.type == "radio") {

      if (controlData.fetchFromAPI) {
        value.fetch = controlData.fetchFromAPI;
        value.api = controlData.fetchForm.controls.api.value;
        value.mapper = {};
        value.mapper.arguments = controlData.fetchForm.controls.arguments.value;
        value.mapper.body = controlData.fetchForm.controls.body.value;
      } else {
        value.options = [];
        controlData.options.forEach(option => {
          value.options.push(option.getRawValue());
        });
      }


    }
    return value;
  }

  getControlName(controlData: ControlData): string {
    if (controlData.form.controls.name.value && controlData.form.controls.displayName.value) {
      return controlData.form.controls.displayName.value + ' - ' + controlData.form.controls.name.value;
    } else if (controlData.form.controls.name.value) {
      return controlData.form.controls.name.value
    } else if (controlData.form.controls.displayName.value) {
      return controlData.form.controls.displayName.value
    }
  }

  updateFormControlsAfterSettingNames() {
    this.addedControls.forEach(ad => {
      console.log(ad.control.controlData.type);
      if (ad.control.controlData.type === 'text' && ad.control.controlData.specificType === 'date') {
        ad.control.controlData.others = this.getOtherDateFields(ad.control.controlData);
      }
    });
  }
}
