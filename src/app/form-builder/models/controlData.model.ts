import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

export interface ControlData{
    selectedValidators?:string[];
    others?:string[];
    availableValidators:string[];
    dyanmicFields:DynamicField[];
    form:FormGroup;
    title$?:Observable<string>;
    panelOpenState:boolean;
}

export interface DynamicField{
    name:string;
    type:string;
    specificType?:string;
}