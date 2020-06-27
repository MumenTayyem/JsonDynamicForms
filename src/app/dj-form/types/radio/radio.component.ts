import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent extends FormControl implements OnInit {

  @Input() customFormGroup: FormGroup;
  @Input() isSubmitted: Subject<boolean>;
  @Input() name: string;
  @Input() options: any[];
  @Input() validations: any[];
  @Input() displayName:string;


  
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
