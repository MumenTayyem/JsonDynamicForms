import { Component, OnInit, Input } from '@angular/core';
import { ControlData } from '../models/controlData.model';
import { mergeMap, map, tap } from 'rxjs/operators';
import { merge, Observable } from 'rxjs';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-control-basic-info',
  templateUrl: './control-basic-info.component.html',
  styleUrls: ['./control-basic-info.component.scss']
})
export class ControlBasicInfoComponent implements OnInit {

  @Input() controlData: ControlData;

  constructor(private sharedService:SharedService) { }

  ngOnInit(): void {
    let name$:Observable<string> = this.controlData.form.controls.name.valueChanges.pipe();
    let displayName$:Observable<string> = this.controlData.form.controls.displayName.valueChanges.pipe();

    this.controlData.title$ = merge(name$,displayName$)
    .pipe(
      tap(()=>this.sharedService.updateFormControlsAfterSettingNames()),
      map(()=> this.sharedService.getControlName(this.controlData))
    );
  }
}
