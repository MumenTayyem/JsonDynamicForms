import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DynamicField, ControlData } from '../models/controlData.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dynamic-fields',
  templateUrl: './dynamic-fields.component.html',
  styleUrls: ['./dynamic-fields.component.scss']
})
export class DynamicFieldsComponent implements OnInit, OnDestroy {
  

  @Input() controlData: ControlData;
  subs: Subscription[] = [];

  ngOnDestroy(): void {
    this.subs.forEach(sub=>sub.unsubscribe());
  }

  ngOnInit(): void {
    this.subs.push(this.controlData.dynamicFieldsChanged.subscribe(() => {
      for (let index = 0; index < this.controlData.dynamicFields.length; index++) {
        const df = this.controlData.dynamicFields[index];
        if (!df.form) {
          df.form = new FormGroup({
            [df.name]: new FormControl('', [Validators.required]),
            errorMessage: new FormControl('', [Validators.required])
          });
        }
      }
    }));
  }
}
