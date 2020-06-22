import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'dj-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent extends FormControl implements OnInit {

  @Input() customFormGroup: FormGroup;
  @Input() specificType: string;
  @Input() isSubmitted: Subject<boolean>;
  @Input() name: string;
  @Input() validations: any[];

  isSubmittedFlag = false;



  constructor() {
    super();
  }

  getControlValidationStatus(type) {
    if (type== 'before' || type == 'after' || 'beforedateinform'){
      type=type+this.name;
    }
    return ((this.customFormGroup.controls[this.name].errors && this.customFormGroup.controls[this.name].errors[type])
      || (this.customFormGroup.errors && this.customFormGroup.errors[type])
    ) ? 'invalid' : 'valid';
  }

  ngOnInit() {
    this.isSubmitted.subscribe(res => {
      this.isSubmittedFlag = res;
    });
  }

}

export function before(controlName: string, beforeValue: string): ValidatorFn {
  return (group: FormGroup): ValidationErrors | null => {
    let controlValue = group.controls[controlName].value;

    if (controlValue) {
      let controlDate = new Date(controlValue);
      let beforeDate = new Date(beforeValue);
      if (controlDate >= beforeDate) {
        
        return { ['before'+controlName]: true };
      } else {
        return null;
      }
    } else {
      return { ['before'+controlName]: true };
    }
  }
}

export function after(controlName: string, afterValue: string): ValidatorFn {
  return (group: FormGroup): ValidationErrors | null => {
    let controlValue = group.controls[controlName].value;
    if (controlValue) {
      let controlDate = new Date(controlValue);
      let afterDate = new Date(afterValue);
      if (controlDate <= afterDate) {
        return { ['after'+controlName]: true };
      } else {
        return null;
      }
    } else {
      return { ['after'+controlName]: true };
    }
  }
}

export function beforeDateInForm(controlName: string, secondControlName: string): ValidatorFn {
  return (group: FormGroup): ValidationErrors | null => {
    let controlValue = group.controls[controlName].value;
    let secondControlValue = group.controls[secondControlName].value;
    if (controlValue && secondControlValue) {
      let controlDate = new Date(controlValue);
      let secondControlDate = new Date(secondControlValue);
      if (controlDate >= secondControlDate) {
        return { ['beforedateinform'+controlName]: true };
      } else {
        return null;
      }
    } else {
      return { ['beforedateinform'+controlName]: true };
    }
  }
}
