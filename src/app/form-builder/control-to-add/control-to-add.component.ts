import { Component, Input, ViewChild} from '@angular/core';
import { RadioControlToAddComponent } from '../controls-to-add/radio-control-to-add/radio-control-to-add.component';
import { CheckBoxControlToAddComponent } from '../controls-to-add/check-box-control-to-add/check-box-control-to-add.component';
import { DateControlToAddComponent } from '../controls-to-add/date-control-to-add/date-control-to-add.component';
import { NumberControlToAddComponent } from '../controls-to-add/number-control-to-add/number-control-to-add.component';
import { TextControlToAddComponent } from '../controls-to-add/text-control-to-add/text-control-to-add.component';
import { SelectControlToAddComponent } from '../controls-to-add/select-control-to-add/select-control-to-add.component';

@Component({
  selector: 'app-control-to-add',
  templateUrl: './control-to-add.component.html',
  styleUrls: ['./control-to-add.component.scss']
})
export class ControlToAddComponent {

  @Input() type;
  
  @ViewChild('control',{static:false}) control:CheckBoxControlToAddComponent | DateControlToAddComponent | NumberControlToAddComponent
  | RadioControlToAddComponent | SelectControlToAddComponent | TextControlToAddComponent;

}
