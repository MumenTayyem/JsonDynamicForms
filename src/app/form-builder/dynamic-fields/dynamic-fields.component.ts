import { Component, OnInit, Input } from '@angular/core';
import { DynamicField } from '../models/controlData.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-fields',
  templateUrl: './dynamic-fields.component.html',
  styleUrls: ['./dynamic-fields.component.scss']
})
export class DynamicFieldsComponent {

  @Input() dynamicFields:DynamicField[]=[];
  @Input() form:FormGroup;
  panelOpenState = false;

}
