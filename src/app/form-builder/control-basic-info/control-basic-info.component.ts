import { Component, OnInit, Input } from '@angular/core';
import { ControlData } from '../models/controlData.model';
import { mergeMap, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-control-basic-info',
  templateUrl: './control-basic-info.component.html',
  styleUrls: ['./control-basic-info.component.scss']
})
export class ControlBasicInfoComponent implements OnInit {

  @Input() controlData: ControlData;

  constructor() { }

  ngOnInit(): void {
    let name$ = this.controlData.form.controls.name.valueChanges.pipe();
    let displayName$ = this.controlData.form.controls.displayName.valueChanges.pipe();

    this.controlData.title$ = displayName$.pipe(
      mergeMap(displayName => name$.pipe(
        map(name => '( ' + displayName + ' - ' + name + ' )')
      )),
      tap(console.log)
    );
  }
}
