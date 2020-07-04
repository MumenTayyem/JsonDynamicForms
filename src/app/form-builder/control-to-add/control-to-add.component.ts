import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-control-to-add',
  templateUrl: './control-to-add.component.html',
  styleUrls: ['./control-to-add.component.scss']
})
export class ControlToAddComponent implements OnInit {

  @Input() type;
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
    this.valdiators = this.allValidators[this.type];
  }

  validatorsChanged(event) {
    this.selectedValidators = event.value;
    console.log(this.selectedValidators);
    this.handleDynamicFields();
  }

  handleDynamicFields() {
    this.dyanmicFields = [];
    this.selectedValidators.forEach(f => {

      switch (f) {
        case 'required':
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
            type: 'number'
          });
          break;
        case 'minLength':
          this.form.addControl('minLength', new FormControl('', [Validators.required]));
          this.dyanmicFields.push({
            name: 'minLength',
            type: 'number'
          });
          break;
        case 'before':
          break;
        case 'after':
          break;
        case 'afterDateInForm':
          break;
        case 'beforeDateInForm':
          break;
      }
    });

    this.cleanForm();
  }

  cleanForm() {
    let keys = Object.keys(this.form.controls);

    for (let index = 0; index < keys.length; index++) {
      const element: string = keys[index];
      console.log(element);
      if (element == 'name' || element == 'displayName')
        continue;

      if (this.dyanmicFields.filter(df => df.name == element).length == 0) {
        console.log('removing : ' + element);
        this.form.removeControl(element);
      }
    }
    this.form.updateValueAndValidity();
  }

}
