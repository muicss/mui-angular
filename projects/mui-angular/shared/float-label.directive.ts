import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[floatLabel]'
})
export class FloatLabelDirective implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) {

  }

  ngAfterViewInit(): void {
    const div = this.el.nativeElement.querySelector('div');
    const label = this.el.nativeElement.querySelector('label');

    this.renderer.addClass(div, 'mui-textfield--float-label');
    setTimeout(() => {
      this.renderer.setStyle(label, 'transition', '.15s ease-in-out');
      this.renderer.setStyle(label, '-webkit-transition', '.15s ease-out');
      this.renderer.setStyle(label, '-moz-transition', '.15s ease-out');
      this.renderer.setStyle(label, '-o-transition', '.15s ease-out');
      this.renderer.setStyle(label, '-ms-transition', '.15s ease-out');
    }, 150);
  }
}
