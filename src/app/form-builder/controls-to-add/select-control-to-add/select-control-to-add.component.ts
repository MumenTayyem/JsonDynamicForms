import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ControlData } from '../../models/controlData.model';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-select-control-to-add',
  templateUrl: './select-control-to-add.component.html',
  styleUrls: ['./select-control-to-add.component.scss']
})
export class SelectControlToAddComponent {

  controlData: ControlData = {
    form: new FormGroup({
      name: new FormControl('', [Validators.required]),
      displayName: new FormControl('', [Validators.required]),
      options: new FormArray([new FormControl('', Validators.required), new FormControl('', Validators.required)])
    }),
    dyanmicFields: [],
    availableValidators: this.sharedService.getAvailableValidators('select')
  };

  constructor(private sharedService: SharedService) { }

  validatorsChanged(event) {
    this.sharedService.validatorsChanged(event, this.controlData);
    console.log(this.controlData);
  }

  submit() {
    console.log(this.controlData.form.controls);
  }

}
