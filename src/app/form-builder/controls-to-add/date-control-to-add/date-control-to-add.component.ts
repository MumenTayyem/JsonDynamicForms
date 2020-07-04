import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-date-control-to-add',
  templateUrl: './date-control-to-add.component.html',
  styleUrls: ['./date-control-to-add.component.scss']
})
export class DateControlToAddComponent implements OnInit {

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    displayName: new FormControl('', [Validators.required])
  });


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
    checkbox: [
      'atLeastOne'
    ]
  };

  valdiators: any[] = [];
  selectedValidators = [];
  dyanmicFields = [];

  constructor() { }

  ngOnInit(): void {
    this.valdiators = this.allValidators['date'];
  }

  validatorsChanged(event) {
    this.selectedValidators = event.value;
    this.handleDynamicFields();
  }

  handleDynamicFields() {
    this.dyanmicFields = [];
    this.selectedValidators.forEach(f => {

      switch (f) {
        case 'required':
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
            others : this.getOtherDateFields(this.form.controls.name.value)
          });
          break;
        case 'beforeDateInForm':
          this.form.addControl('beforeDateInForm', new FormControl('', [Validators.required]));
          this.dyanmicFields.push({
            name: 'beforeDateInForm',
            type: 'select',
            others : this.getOtherDateFields(this.form.controls.name.value)
          });
          break;
      }
    });

    this.cleanForm();
  }

  getOtherDateFields(currentFieldName:string){
    let fieldNames = [];

    //let keys = Object.keys(this.form.controls);
    let keys = ['date of birth','visa expiry','hi'];
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

  submit(){
    console.log(this.form.controls);
  }
}
