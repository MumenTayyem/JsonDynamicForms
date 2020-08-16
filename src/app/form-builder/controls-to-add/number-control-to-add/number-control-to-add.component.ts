import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { ControlData } from '../../models/controlData.model';
import { Subject } from 'rxjs';

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
    dynamicFields: [],
    availableValidators: this.sharedService.getAvailableValidators('number'),
    panelOpenState: false,
    dynamicFieldsChanged: new Subject<Object>()
  };


  constructor(private sharedService: SharedService) { }

  validatorsChanged(event) {
    this.sharedService.validatorsChanged(event, this.controlData);
    this.controlData.dynamicFieldsChanged.next();
  }

}
