import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'mui-caret',
  template: `<span class='mui-caret' #caret></span>`,
  styles: []
})
export class CaretComponent implements AfterViewInit {
  @Input() direction?: string;

  @ViewChild('caret', {static: true}) caret: ElementRef<HTMLSpanElement>;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    // add class
    if (this.direction) {
      this.renderer.addClass(this.caret.nativeElement, `mui-caret--${this.direction}`);
    }
  }
}
