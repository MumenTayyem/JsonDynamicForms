import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import {SelectMapper} from './seletContract';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends FormControl implements OnInit {

  @Input() customFormGroup: FormGroup;
  @Input() isSubmitted: Subject<boolean>;
  @Input() name: string;
  @Input() options: any[];
  @Input() validations: any[];

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
    super.setValue('');
  }
}
