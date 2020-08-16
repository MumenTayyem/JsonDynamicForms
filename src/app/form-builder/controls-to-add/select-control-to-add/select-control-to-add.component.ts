import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ControlData } from '../../models/controlData.model';
import { SharedService } from '../../services/shared.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-select-control-to-add',
  templateUrl: './select-control-to-add.component.html',
  styleUrls: ['./select-control-to-add.component.scss']
})
export class SelectControlToAddComponent {

  controlData: ControlData = {
    type:'select',
    form: new FormGroup({
      name: new FormControl('', [Validators.required]),
      displayName: new FormControl('', [Validators.required])
    }),
    dynamicFields: [],
    availableValidators: this.sharedService.getAvailableValidators('select'),
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
