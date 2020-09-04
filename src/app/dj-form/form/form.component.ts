import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
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
  @Input() json;



  public formJsonFields;

  group: FormGroup;
  isSubmitted: Subject<boolean>;
  title: string = '';
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit() {

    this.isSubmitted = new Subject<boolean>();

    this.group = new FormGroup({});

    if (this.json) {
      let res = this.json;
      this.formJsonFields = res;
      this.cdr.detectChanges();
      this.group.updateValueAndValidity();
    } else {
      this.getJSON().subscribe(res => {
        this.formJsonFields = res['fields'];
        this.title = res['formName'];
        this.cdr.detectChanges();
        this.group.updateValueAndValidity();
      },
        (err) => console.log('File does not exist!'))
    }
  }

  public getJSON() {
    return this.http.get(this.FromSchemaPath);;

  }


  printControls() {
    if (this.group.valid) {
      console.log(this.group.value);
    } else {
      this.isSubmitted.next(true);
      this.group.markAllAsTouched();
      console.log(this.group.errors);
    }
  }

}
