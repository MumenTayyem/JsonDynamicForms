import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { ControlData } from '../../models/controlData.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-check-box-control-to-add',
  templateUrl: './check-box-control-to-add.component.html',
  styleUrls: ['./check-box-control-to-add.component.scss']
})
export class CheckBoxControlToAddComponent  {

  controlData: ControlData = {
    type:'checkbox',
    form: new FormGroup({
      name: new FormControl('', [Validators.required]),
      displayName: new FormControl('', [Validators.required])
    }),
    dynamicFields: [],
    availableValidators: this.sharedService.getAvailableValidators('checkbox'),
    panelOpenState: false,
    dynamicFieldsChanged: new Subject<Object>(),
    isRequired:false
  };


  constructor(private sharedService: SharedService) { }

  validatorsChanged(event) {
    this.sharedService.validatorsChanged(event, this.controlData);
    this.controlData.dynamicFieldsChanged.next();
  }
}
