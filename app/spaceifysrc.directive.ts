import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
	selector: '[sp_src]'
})

export class SpaceifySourceDirective
{
private el: HTMLElement;

constructor(el: ElementRef) { this.el = el.nativeElement; }

@Input('sp_src') set spaceifySource(src : string)
	{
	this.el.setAttribute("sp_src", src);						// Dynamic and static, e.g. dynamic: [sp_src]="app.icon", static: sp_src="assets/icon.png"

	spaceifyLoader.loadData(this.el, null);
	}

}
