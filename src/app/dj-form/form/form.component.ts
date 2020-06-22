import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import { TextComponent } from '../types/text/text.component';
import { HostDirective } from '../directives/host.directive';
import { Subject } from 'rxjs';


@Component({
  selector: 'dj-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() FromSchemaPath;
 

  public formJsonFields;

  group:FormGroup;
  isSubmitted:Subject<boolean>;

  constructor(private http: HttpClient, private cdr:ChangeDetectorRef) { }

  ngOnInit() {

    this.isSubmitted=new Subject<boolean>();

    this.group = new FormGroup({});
    this.getJSON().subscribe(res => {
      this.formJsonFields = res['fields'];
      this.cdr.detectChanges();
      this.group.updateValueAndValidity();
      //date validators not working
      


    },
      (err) => console.log('File does not exist!'))
  }

  public getJSON() {
    return this.http.get(this.FromSchemaPath);;

  }

  buildComponent(){
    
  }

  printControls(){
    // console.log(this.group.controls['favouriteAnimals']);
    console.log(this.group.controls);
    this.isSubmitted.next(true);
    // console.log(this.group.getRawValue());
  }

}
