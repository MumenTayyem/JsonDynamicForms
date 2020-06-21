import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'dj-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent extends FormControl implements OnInit {

  @Input() customFormGroup:FormGroup;
  @Input() isSubmitted:Subject<boolean>;
  @Input() name:string;
  @Input() validations:any[];

  isSubmittedFlag=false;



  constructor() {
    super();
   }

   getControlValidationStatus(type){
    return this.customFormGroup.controls[this.name].errors && this.customFormGroup.controls[this.name].errors[type]?'invalid':'valid';
   }

  ngOnInit() {

    this.isSubmitted.subscribe(res=>{
      this.isSubmittedFlag=res;
    });
  }

}
