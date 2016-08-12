import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[sp_src]'
})

export class SpaceifySourceDirective {
  private el: HTMLElement;

  constructor(el: ElementRef) { this.el = el.nativeElement; }


  @Input('sp_src') set spaceifySource(src : string) {
    //console.log(src);
    this.el['src'] = "http://"+src;
    //this.el
  }
 
   


  }

  