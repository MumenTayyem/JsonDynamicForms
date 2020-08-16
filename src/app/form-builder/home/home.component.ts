import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem,copyArrayItem} from '@angular/cdk/drag-drop';
import { ControlToAddComponent } from '../control-to-add/control-to-add.component';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private sharedService:SharedService) { }

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
      console.log(event.previousIndex);
      console.log(this.selectedControls);
      copyArrayItem(event.previousContainer.data,event.container.data,event.previousIndex,event.currentIndex);
    }
  }

  print(){
    this.addedControls.forEach(control=>{
      control.control.controlData.form.markAllAsTouched();
      control.control.controlData.dynamicFields.forEach(df=>{
        df.form.markAllAsTouched();
      });
      this.json.push(this.sharedService.getControlValue(control.control.controlData));
    });
  }

}
