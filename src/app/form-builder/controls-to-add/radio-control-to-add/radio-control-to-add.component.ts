import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { ControlData } from '../../models/controlData.model';

@Component({
  selector: 'app-radio-control-to-add',
  templateUrl: './radio-control-to-add.component.html',
  styleUrls: ['./radio-control-to-add.component.scss']
})
export class RadioControlToAddComponent {

  controlData: ControlData = {
    form: new FormGroup({
      name: new FormControl('', [Validators.required]),
      displayName: new FormControl('', [Validators.required]),
      options: new FormArray([new FormControl('', Validators.required), new FormControl('', Validators.required)])
    }),
    dyanmicFields: [],
    availableValidators: this.sharedService.getAvailableValidators('radio')
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
