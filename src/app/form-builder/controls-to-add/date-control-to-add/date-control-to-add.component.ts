import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { ControlData } from '../../models/controlData.model';

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
    availableValidators: this.sharedService.getAvailableValidators('date')
  };

  constructor(private sharedService: SharedService) { }

  validatorsChanged(event) {
    this.sharedService.validatorsChanged(event, this.controlData);
    console.clear();
    console.log(this.controlData);
  }


  submit() {
    console.log(this.controlData.form.controls);
  }

}
