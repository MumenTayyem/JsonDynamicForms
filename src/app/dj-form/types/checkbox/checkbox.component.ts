import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Subject } from 'rxjs';
import { ClassField } from '@angular/compiler';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent extends FormControl implements OnInit {

  @Input() customFormGroup: FormGroup;
  @Input() isSubmitted: Subject<boolean>;
  @Input() name: string;
  @Input() checkboxes: any[];
  @Input() validations: any[];

  selectedValues = [];

  isSubmittedFlag = false;

  constructor() {
    super();
  }

  getControlValidationStatus(type) {
    return this.customFormGroup.controls[this.name].errors && this.customFormGroup.controls[this.name].errors[type] ? 'invalid' : 'valid';
  }

  ngOnInit() {
    this.isSubmitted.subscribe(res => {
      this.isSubmittedFlag = res;
    });
    this.checkboxes.forEach(checkbox => {
      let formControl = new CustomCheckBox(false);
      formControl.customValue = checkbox.value;
      formControl.name = checkbox.name;
      (this.customFormGroup.controls[this.name] as CustomFormArray).push(formControl)
    });
  }
}

export class CustomCheckBox extends FormControl {
  public customValue: any;
  public name: string;
}

export class CustomFormArray extends FormArray {

  get value() {
    let values = [];

    this.controls.forEach((c: CustomCheckBox) => {
      if (c.value) {
        values.push({ value: c.customValue, name: c.name })
      }
    });

    return values;
  }

  set value(value) {

  }

  getRawValue(){
    return this.value;
  }

  constructor(controls) {
    super(controls);
  }

}

export function AtLeastOneChecked(): ValidatorFn {
  return (arr: FormArray): ValidationErrors | null => {
    let isValid = false;

    arr.controls.forEach(c => {
      if (c.value == true) {
        isValid = true;
      }
    });

    if (isValid) {
      return null;
    } else {
      setTimeout(() => {
        arr.setErrors({atLeastOne: true});
      }, 10);
      return { atLeastOne: true}
    }
  }
}
