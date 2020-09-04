import { HostDirective } from '../../directives/host.directive';
import { TextComponent, before, after,beforeDateInForm } from '../../types/text/text.component';
import { Subject } from 'rxjs';
import { SelectComponent } from '../../types/select/select.component';
import { RadioComponent } from '../../types/radio/radio.component';
import { CheckboxComponent, AtLeastOneChecked, CustomFormArray } from '../../types/checkbox/checkbox.component';
import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'dj-form-control-host',
  templateUrl: './form-control-host.component.html',
  styleUrls: ['./form-control-host.component.scss']
})
export class FormControlHostComponent implements OnInit {

  @Input() controlInfo: any;
  @Input() customFormGroup: FormGroup;
  @Input() isSubmitted: Subject<boolean>;
  @ViewChild(HostDirective,{static:true}) host: HostDirective;
  isLoading=false;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private http: HttpClient) { }

  ngOnInit() {
    switch (this.controlInfo.type) {
      case 'text':
        this.prepareTextField();
        break;
      case 'select':
        this.prepareSelectField();
        break;
      case 'radio':
        this.prepareRadioField();
        break;
      case 'checkbox':
        this.prepareCheckboxField();
        break;
    }
  }

  prepareTextField() {
    let componentRef;
    let validators: ValidatorFn[] = [];

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(TextComponent);

    let viewContainerRef = this.host.viewContainerRef;

    componentRef = viewContainerRef.createComponent(componentFactory);
    //init with needed data
    (<TextComponent>componentRef.instance).name = this.controlInfo.name;
    (<TextComponent>componentRef.instance).customFormGroup = this.customFormGroup;
    (<TextComponent>componentRef.instance).isSubmitted = this.isSubmitted;
    (<TextComponent>componentRef.instance).specificType = this.controlInfo.specificType;
    (<TextComponent>componentRef.instance).displayName = this.controlInfo.displayName;

    let validations = [];
    let formValidators = [];

    this.controlInfo.validators.forEach(validation => {
      validations.push({ 'type': validation.type, 'errorMessage': validation.errorMessage });
      switch (validation.type) {
        case 'required':
          validators.push(Validators.required);
          break;
        case 'pattern':
          validators.push(Validators.pattern(validation.value));
          break;
        case 'min':
          validators.push(Validators.min(validation.value));
          break;
        case 'max':
          validators.push(Validators.max(validation.value));
          break;
        case 'maxLength':
          validators.push(Validators.maxLength(validation.value));
          break;
        case 'minLength':
          validators.push(Validators.minLength(validation.value));
          break;
        case 'before':
          formValidators.push(before(this.controlInfo.name, validation.value));
          break;
        case 'after':
          formValidators.push(after(this.controlInfo.name, validation.value));
          break;
        case 'beforeDateInForm':
          formValidators.push(beforeDateInForm(this.controlInfo.name, validation.secondControlName));
          break;
      }
    });
    // this.customFormGroup.setValidators(formValidators);
    if (this.customFormGroup.validator){
      formValidators.push(this.customFormGroup.validator);
    }
    this.customFormGroup.setValidators(formValidators);
    (<TextComponent>componentRef.instance).validations = validations;

    //add it to the form
    this.customFormGroup.addControl(this.controlInfo.name, (<TextComponent>componentRef.instance));
    this.customFormGroup.controls[this.controlInfo.name].setValidators(validators);
  }

  prepareSelectField() {
    let componentRef;
    let validators: ValidatorFn[] = [];

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(SelectComponent);

    let viewContainerRef = this.host.viewContainerRef;
    if (this.controlInfo.fetch) {
      this.isLoading=true;
      var f = new Function(this.controlInfo.mapper.arguments, this.controlInfo.mapper.body);
      this.http.get(this.controlInfo.api).subscribe(res => {
      this.isLoading=false;
        //creating the component
        componentRef = viewContainerRef.createComponent(componentFactory);
        //init with needed data
        (<SelectComponent>componentRef.instance).name = this.controlInfo.name;
        (<SelectComponent>componentRef.instance).displayName = this.controlInfo.displayName;
        (<SelectComponent>componentRef.instance).customFormGroup = this.customFormGroup;
        (<SelectComponent>componentRef.instance).isSubmitted = this.isSubmitted;
        (<SelectComponent>componentRef.instance).options = f(res);
        let validations = [];

        this.controlInfo.validators.forEach(validation => {
          validations.push({ 'type': validation.type, 'errorMessage': validation.errorMessage });
          switch (validation.type) {
            case 'required':
              validators.push(Validators.required);
              break;
          }
        });
        (<SelectComponent>componentRef.instance).validations = validations;

        //add it to the form
        this.customFormGroup.addControl(this.controlInfo.name, (<SelectComponent>componentRef.instance));
        this.customFormGroup.controls[this.controlInfo.name].setValidators(validators);
      });
    } else {
      //creating the component
      componentRef = viewContainerRef.createComponent(componentFactory);
      //init with needed data
      (<SelectComponent>componentRef.instance).name = this.controlInfo.name;
      (<SelectComponent>componentRef.instance).displayName = this.controlInfo.displayName;
      (<SelectComponent>componentRef.instance).customFormGroup = this.customFormGroup;
      (<SelectComponent>componentRef.instance).isSubmitted = this.isSubmitted;
      (<SelectComponent>componentRef.instance).options = this.controlInfo.options;
      let validations = [];

      this.controlInfo.validators.forEach(validation => {
        validations.push({ 'type': validation.type, 'errorMessage': validation.errorMessage });
        switch (validation.type) {
          case 'required':
            validators.push(Validators.required);
            break;
        }
      });
      (<SelectComponent>componentRef.instance).validations = validations;

      //add it to the form
      this.customFormGroup.addControl(this.controlInfo.name, (<SelectComponent>componentRef.instance));
      this.customFormGroup.controls[this.controlInfo.name].setValidators(validators);
    }


  }

  prepareRadioField() {
    let componentRef;
    let validators: ValidatorFn[] = [];

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(RadioComponent);

    let viewContainerRef = this.host.viewContainerRef;



    if (this.controlInfo.fetch) {
      this.isLoading=true;
      var f = new Function(this.controlInfo.mapper.arguments, this.controlInfo.mapper.body);
      this.http.get(this.controlInfo.api).subscribe(res => {
        this.isLoading=false;
        //creating the component
        componentRef = viewContainerRef.createComponent(componentFactory);
        //init with needed data
        (<RadioComponent>componentRef.instance).name = this.controlInfo.name;
        (<RadioComponent>componentRef.instance).displayName = this.controlInfo.displayName;
        (<RadioComponent>componentRef.instance).customFormGroup = this.customFormGroup;
        (<RadioComponent>componentRef.instance).isSubmitted = this.isSubmitted;
        (<RadioComponent>componentRef.instance).options = f(res);
        let validations = [];

        this.controlInfo.validators.forEach(validation => {
          validations.push({ 'type': validation.type, 'errorMessage': validation.errorMessage });
          switch (validation.type) {
            case 'required':
              validators.push(Validators.required);
              break;
          }
        });
        (<RadioComponent>componentRef.instance).validations = validations;

        //add it to the form
        this.customFormGroup.addControl(this.controlInfo.name, (<RadioComponent>componentRef.instance));
        this.customFormGroup.controls[this.controlInfo.name].setValidators(validators);
      });
    } else {
      //creating the component
      componentRef = viewContainerRef.createComponent(componentFactory);
      //init with needed data
      (<RadioComponent>componentRef.instance).name = this.controlInfo.name;
      (<RadioComponent>componentRef.instance).displayName = this.controlInfo.displayName;
      (<RadioComponent>componentRef.instance).customFormGroup = this.customFormGroup;
      (<RadioComponent>componentRef.instance).isSubmitted = this.isSubmitted;
      (<RadioComponent>componentRef.instance).options = this.controlInfo.options;

      let validations = [];

      this.controlInfo.validators.forEach(validation => {
        validations.push({ 'type': validation.type, 'errorMessage': validation.errorMessage });
        switch (validation.type) {
          case 'required':
            validators.push(Validators.required);
            break;
        }
      });
      (<RadioComponent>componentRef.instance).validations = validations;

      //add it to the form
      this.customFormGroup.addControl(this.controlInfo.name, (<RadioComponent>componentRef.instance));
      this.customFormGroup.controls[this.controlInfo.name].setValidators(validators);
    }


  }

  prepareCheckboxField() {
    let componentRef;
    let validators: ValidatorFn[] = [];

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(CheckboxComponent);

    let viewContainerRef = this.host.viewContainerRef;



    if (this.controlInfo.fetch) {
      this.isLoading=true;
      var f = new Function(this.controlInfo.mapper.arguments, this.controlInfo.mapper.body);

      this.http.get(this.controlInfo.api).subscribe(res => {
        this.isLoading=false;
        //creating the component
        componentRef = viewContainerRef.createComponent(componentFactory);
        //init with needed data
        (<CheckboxComponent>componentRef.instance).name = this.controlInfo.name;
        (<CheckboxComponent>componentRef.instance).displayName = this.controlInfo.displayName;
        (<CheckboxComponent>componentRef.instance).customFormGroup = this.customFormGroup;
        (<CheckboxComponent>componentRef.instance).isSubmitted = this.isSubmitted;
        (<CheckboxComponent>componentRef.instance).checkboxes = f(res);

        let validations = [];

        this.controlInfo.validators.forEach(validation => {
          validations.push({ 'type': validation.type, 'errorMessage': validation.errorMessage });
          switch (validation.type) {
            case 'atLeastOne':
              validators.push(AtLeastOneChecked());
              break;
          }
        });
        (<CheckboxComponent>componentRef.instance).validations = validations;

        //add it to the form
        this.customFormGroup.addControl(this.controlInfo.name, new CustomFormArray([]));
        this.customFormGroup.controls[this.controlInfo.name].setValidators(validators);

      });

    } else {

      //creating the component
      componentRef = viewContainerRef.createComponent(componentFactory);
      //init with needed data
      (<CheckboxComponent>componentRef.instance).name = this.controlInfo.name;
      (<CheckboxComponent>componentRef.instance).displayName = this.controlInfo.displayName;
      (<CheckboxComponent>componentRef.instance).customFormGroup = this.customFormGroup;
      (<CheckboxComponent>componentRef.instance).isSubmitted = this.isSubmitted;
      (<CheckboxComponent>componentRef.instance).checkboxes = this.controlInfo.options;

      let validations = [];

      this.controlInfo.validators.forEach(validation => {
        validations.push({ 'type': validation.type, 'errorMessage': validation.errorMessage });
        switch (validation.type) {
          case 'atLeastOne':
            validators.push(AtLeastOneChecked());
            break;
        }
      });
      (<CheckboxComponent>componentRef.instance).validations = validations;

      //add it to the form
      this.customFormGroup.addControl(this.controlInfo.name, new CustomFormArray([]));
      this.customFormGroup.controls[this.controlInfo.name].setValidators(validators);
    }


  }

}
