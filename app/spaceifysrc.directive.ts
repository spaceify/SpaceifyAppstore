import { Directive, ElementRef, Input } from '@angular/core';

//import {WindowRef} from './windowref';'

declare class SpaceifyLoader
	{
	public installApplication(element: Object, callback: Function): void;
	}

@Directive({
	selector: '[sp_src]'
})

export class SpaceifySourceDirective
{
private el: HTMLElement;
//private windowRef: WindowRef;

constructor(el: ElementRef/*, windowRef: WindowRef*/)
	{
	this.el = el.nativeElement;
	//this.windowRef = windowRef.nativeWindow;
	}

@Input('sp_src') set spaceifySource(src : string)
	{
	this.el.setAttribute("sp_src", src);						// Dynamic and static, e.g. dynamic: [sp_src]="app.icon", static: sp_src="assets/icon.png"

	/*this.windowRef.*/spaceifyLoader.loadData(this.el, null);
	}

}
