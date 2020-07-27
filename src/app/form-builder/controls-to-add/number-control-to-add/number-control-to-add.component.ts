import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { ControlData } from '../../models/controlData.model';

@Component({
  selector: 'app-number-control-to-add',
  templateUrl: './number-control-to-add.component.html',
  styleUrls: ['./number-control-to-add.component.scss']
})
export class NumberControlToAddComponent {

  controlData: ControlData = {
    form: new FormGroup({
      name: new FormControl('', [Validators.required]),
      displayName: new FormControl('', [Validators.required])
    }),
    dyanmicFields: [],
    availableValidators: this.sharedService.getAvailableValidators('number'),
    panelOpenState: false
  };


  constructor(private sharedService: SharedService) { }

  validatorsChanged(event) {
    this.sharedService.validatorsChanged(event, this.controlData);
    console.clear();
    console.log(this.controlData);
  }

}
