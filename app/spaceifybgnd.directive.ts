import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
	selector: '[sp_bgnd]'
})

export class SpaceifyBgndDirective
{
private el: HTMLElement;

constructor(el: ElementRef) { this.el = el.nativeElement; }

@Input('sp_bgnd') set spaceifyBgnd(src : string)
	{
	this.el.setAttribute("sp_bgnd", src);						// Dynamic and static, e.g. dynamic: [sp_src]="app.icon", static: sp_src="assets/images/icon.png"

	spaceifyLoader.loadData(this.el, {}, null);
	}

}
