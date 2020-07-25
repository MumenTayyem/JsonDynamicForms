import { FormGroup } from '@angular/forms';

export interface ControlData{
    selectedValidators:string[];
    others?:string[];
    dyanmicFields:DynamicField[];
    form:FormGroup;
}

export interface DynamicField{
    name:string;
    type:string;
    specificType?:string;
}