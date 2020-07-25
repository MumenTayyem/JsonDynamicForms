import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  @Input() form:FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  removeOption(index){
    (this.form.controls.options as FormArray).removeAt(index);
  }

  addANewOption(){
    (this.form.controls.options as FormArray).push(new FormControl('',[Validators.required]));
  }


}
