import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { ControlData } from '../../models/controlData.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-text-control-to-add',
  templateUrl: './text-control-to-add.component.html',
  styleUrls: ['./text-control-to-add.component.scss']
})
export class TextControlToAddComponent {

  controlData: ControlData = {
    type:'text',
    specificType:'text',
    form: new FormGroup({
      name: new FormControl('', [Validators.required]),
      displayName: new FormControl('', [Validators.required])
    }),
    dynamicFields: [],
    availableValidators: this.sharedService.getAvailableValidators('text'),
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
