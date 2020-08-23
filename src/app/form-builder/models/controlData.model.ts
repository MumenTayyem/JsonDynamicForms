import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

export interface ControlData{
    type:string;
    specificType?:string;
    selectedValidators?:string[];
    others?:string[];
    availableValidators:string[];
    dynamicFields:DynamicField[];
    form:FormGroup;
    title$?:Observable<string>;
    panelOpenState:boolean;
    dynamicFieldsChanged?:Subject<Object>
    isRequired:boolean;
    optionsForm?: FormGroup;
}

export interface Option{
    value:number;
    name:string;
}

export interface DynamicField{
    name:string;
    type:string;
    specificType?:string;
    form?:FormGroup;
    reuiredForm?:FormGroup;
}