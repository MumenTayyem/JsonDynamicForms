import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ControlData } from '../models/controlData.model';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  @Input() controlData:ControlData;

  constructor() { }

  ngOnInit(): void {
    this.controlData.options = 
    [
      new FormGroup({
        name : new FormControl('',[Validators.required]),
        value : new FormControl('',[Validators.required])
      }),
      new FormGroup({
        name : new FormControl('',[Validators.required]),
        value : new FormControl('',[Validators.required])
      })
    ];
  }

  removeOption(index){
    (this.controlData.options).splice(index,1);
  }

  addANewOption(){
    this.controlData.options.push(
      new FormGroup({
        name : new FormControl('',[Validators.required]),
        value : new FormControl('',[Validators.required])
      })
    );
  }


}
