import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { ControlData } from '../../models/controlData.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-date-control-to-add',
  templateUrl: './date-control-to-add.component.html',
  styleUrls: ['./date-control-to-add.component.scss']
})
export class DateControlToAddComponent {
  
  controlData: ControlData = {
    form: new FormGroup({
      name: new FormControl('', [Validators.required]),
      displayName: new FormControl('', [Validators.required])
    }),
    dyanmicFields: [],
    availableValidators: this.sharedService.getAvailableValidators('date'),
    panelOpenState: false,
    dynamicFieldsChanged: new Subject<Object>()
  };


  constructor(private sharedService: SharedService) { }

  validatorsChanged(event) {
    this.sharedService.validatorsChanged(event, this.controlData);
    this.controlData.dynamicFieldsChanged.next();
  }

}
