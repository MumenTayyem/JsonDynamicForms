import { Component, OnInit, Input } from '@angular/core';
import { DynamicField } from '../models/controlData.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-fields',
  templateUrl: './dynamic-fields.component.html',
  styleUrls: ['./dynamic-fields.component.scss']
})
export class DynamicFieldsComponent implements OnInit {

  @Input() dynamicFields:DynamicField[]=[];
  @Input() form:FormGroup;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      console.log(this.dynamicFields);
    }, 5000);
  }

}
