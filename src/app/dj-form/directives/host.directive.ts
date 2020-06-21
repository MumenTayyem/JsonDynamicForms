import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[djHost]'
})
export class HostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
