import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { ControlData } from '../../models/controlData.model';
import { merge, concat, combineLatest, forkJoin } from 'rxjs';
import {map, tap, combineAll, startWith, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-text-control-to-add',
  templateUrl: './text-control-to-add.component.html',
  styleUrls: ['./text-control-to-add.component.scss']
})
export class TextControlToAddComponent{

  controlData: ControlData = {
    form: new FormGroup({
      name: new FormControl('', [Validators.required]),
      displayName: new FormControl('', [Validators.required])
    }),
    dyanmicFields: [],
    availableValidators: this.sharedService.getAvailableValidators('text')
  };
  
  panelOpenState = false;

  name$ = this.controlData.form.controls.name.valueChanges.pipe();
  displayName$ = this.controlData.form.controls.displayName.valueChanges.pipe();

  title$ = this.displayName$.pipe(
    mergeMap(displayName=> this.name$.pipe(
      map(name => '( '+displayName+' - '+name+' )')
    )),
    tap(console.log)
  );

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
