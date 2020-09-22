import { Directive, HostListener, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { offset } from 'muicss/lib/js/lib/jqlite';

@Directive({
  selector: '[muiRipple]',
})
export class RippleDirective implements AfterViewInit {

  private button: HTMLButtonElement;
  private ripple: HTMLSpanElement;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  /**
   * MouseDown event handler
   * @param event - the DOM event
   */
  @HostListener('mousedown', ['$event', '$event.currentTarget'])
  mouseDown(event: MouseEvent): void {
    if (event.button === 0) {
      this.getFadeOutAnimation(event);
    }
  }

  /**
   * MoueUp event handler
   */
  @HostListener('mouseup', ['$event', '$event.currentTarget'])
  mouseUp(): void {
    this.getFadeInAnimation();
  }

  ngAfterViewInit(): void {
    // cache references
    this.button = this.el.nativeElement;
    this.ripple = this.button.querySelector('.mui-ripple');
  }

  private getFadeOutAnimation(event: MouseEvent): void {
    // get (x, y) position of click
    const rect = offset(this.button);
    const offsetWidth = rect.width;
    const offsetHeight = rect.height;
    const offsetTop = rect.top;
    const offsetLeft = rect.left;

    // calculate radius
    const radius = Math.sqrt(offsetWidth * offsetWidth + offsetHeight * offsetHeight);
    const diameter = radius * 2 + 'px';

    // set position and dimensions
    const width = diameter;
    const height = diameter;
    const left = Math.round(event.pageX - offsetLeft - radius) + 'px';
    const top = Math.round(event.pageY - offsetTop - radius) + 'px';

    this.renderer.setStyle(this.ripple, 'left', left);
    this.renderer.setStyle(this.ripple, 'top', top);
    this.renderer.setStyle(this.ripple, 'width', width);
    this.renderer.setStyle(this.ripple, 'height', height);

    this.renderer.removeClass(this.ripple, 'mui--is-animating');
    this.renderer.addClass(this.ripple, 'mui--is-visible');

    // start animation
    window.requestAnimationFrame(() => this.renderer.addClass(this.ripple, 'mui--is-animating'));
  }

  private getFadeInAnimation(): void {
    // allow a repaint to occur before removing class so animation shows for tap events
    window.requestAnimationFrame(() => this.renderer.removeClass(this.ripple, 'mui--is-visible'));
  }
}
