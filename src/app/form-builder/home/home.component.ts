import { Component, OnInit, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem,copyArrayItem} from '@angular/cdk/drag-drop';
import { ControlToAddComponent } from '../control-to-add/control-to-add.component';
import { SharedService } from '../services/shared.service';
import { ControlData, DynamicField } from '../models/controlData.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private sharedService:SharedService,private crd:ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  controls = [
    'text',
    'number',
    'date',
    'checkbox',
    'radio',
    'select'
  ];

  selectedControls = [];
  json=[];
  @ViewChildren('addedControl') addedControls !: QueryList<ControlToAddComponent>;


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      copyArrayItem(event.previousContainer.data,event.container.data,event.previousIndex,event.currentIndex);
      this.sharedService.addedControls = this.addedControls;
    }
  }

  print(){
    this.json.splice(0);
    this.crd.detectChanges();
    let addedControls:ControlToAddComponent[] = this.addedControls.toArray();
    for (let index = 0; index < addedControls.length; index++) {
      const controlData:ControlData = addedControls[index].control.controlData;
      
      if (controlData.form.invalid){
        controlData.form.markAllAsTouched();
        controlData.panelOpenState=true;
        break;
      }

      for (let dfIndex = 0; dfIndex < controlData.dynamicFields.length; dfIndex++) {
        const df:DynamicField = controlData.dynamicFields[dfIndex];
        
        if (df.form.invalid){
          df.form.markAllAsTouched();
          controlData.panelOpenState=true;
          break;
        }
      }

      let value = this.sharedService.getControlValue(controlData);
      if (value){
        console.log(value);
        this.json.push(value);
      }else{

      }
      
      
    }
  }

}
