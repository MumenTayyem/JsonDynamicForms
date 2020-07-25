import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-number-control-to-add',
  templateUrl: './number-control-to-add.component.html',
  styleUrls: ['./number-control-to-add.component.scss']
})
export class NumberControlToAddComponent implements OnInit {

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    displayName: new FormControl('', [Validators.required])
  });



  valdiators: any[] = [];
  selectedValidators = [];
  dyanmicFields = [];

  constructor(private sharedService:SharedService) { }

  ngOnInit(): void {
    this.valdiators = this.sharedService.allValidators['number'];
  }

  validatorsChanged(event) {
    this.selectedValidators = event.value;
    this.handleDynamicFields();
  }

  handleDynamicFields() {
    this.dyanmicFields = [];
    console.log(this.selectedValidators);
    this.selectedValidators.forEach(f => {

      switch (f) {
        case 'required':
          break;
        case 'max':
          this.form.addControl('max', new FormControl('', [Validators.required]));
          this.dyanmicFields.push({
            name: 'max',
            type: 'text',
            specificType: 'number'
          });
          break;
        case 'min':
          this.form.addControl('min', new FormControl('', [Validators.required]));
          this.dyanmicFields.push({
            name: 'min',
            type: 'text',
            specificType: 'number'
          });
          break;
        case 'regex':
          this.form.addControl('regex', new FormControl('', [Validators.required]));
          this.dyanmicFields.push({
            name: 'regex',
            type: 'text'
          });
          break;
        case 'maxLength':
          this.form.addControl('maxLength', new FormControl('', [Validators.required]));
          this.dyanmicFields.push({
            name: 'maxLength',
            type: 'text',
            specificType: 'number'
          });
          break;
        case 'minLength':
          this.form.addControl('minLength', new FormControl('', [Validators.required]));
          this.dyanmicFields.push({
            name: 'minLength',
            type: 'text',
            specificType: 'number'
          });
          break;
        case 'before':
          this.form.addControl('before', new FormControl('', [Validators.required]));
          this.dyanmicFields.push({
            name: 'before',
            type: 'date'
          });
          break;
        case 'after':
          this.form.addControl('after', new FormControl('', [Validators.required]));
          this.dyanmicFields.push({
            name: 'after',
            type: 'date'
          });
          break;
        case 'afterDateInForm':
          this.form.addControl('afterDateInForm', new FormControl('', [Validators.required]));
          this.dyanmicFields.push({
            name: 'afterDateInForm',
            type: 'select',
            others: this.getOtherDateFields(this.form.controls.name.value)
          });
          break;
        case 'beforeDateInForm':
          this.form.addControl('beforeDateInForm', new FormControl('', [Validators.required]));
          this.dyanmicFields.push({
            name: 'beforeDateInForm',
            type: 'select',
            others: this.getOtherDateFields(this.form.controls.name.value)
          });
          break;
      }
    });

    this.cleanForm();
  }

  getOtherDateFields(currentFieldName: string) {
    let fieldNames = [];

    //let keys = Object.keys(this.form.controls);
    let keys = ['date of birth', 'visa expiry', 'hi'];
    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];
      // if (element == this.form.controls.name.value)
      //   continue;
      // else
      //   fieldNames.push(element);
      fieldNames.push(element);


    }
    console.log(fieldNames);
    return fieldNames;
  }

  cleanForm() {
    let keys = Object.keys(this.form.controls);

    for (let index = 0; index < keys.length; index++) {
      const element: string = keys[index];
      if (element == 'name' || element == 'displayName')
        continue;

      if (this.dyanmicFields.filter(df => df.name == element).length == 0) {
        this.form.removeControl(element);
      }
    }
    this.form.updateValueAndValidity();
  }


  submit() {
    console.log(this.form.controls);
  }

}
