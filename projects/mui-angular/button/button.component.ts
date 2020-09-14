import { Component, ElementRef, Input, ViewChild, HostListener, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'mui-button',
  template: `
    <button class="mui-btn" #button [disabled]="disabled">
      <ng-content></ng-content>
      <span class="mui-btn__ripple-container"><span class="mui-ripple" #ripple></span></span>
    </button>
  `
})

export class ButtonComponent implements AfterViewInit {
  @ViewChild('button') button: ElementRef<HTMLButtonElement>;
  @ViewChild('ripple') ripple: ElementRef<HTMLSpanElement>;

  @Input() variant?: string;
  @Input() color?: string;
  @Input() size?: string;
  @Input() disabled?: boolean = false;

  private buttonEl: HTMLButtonElement;
  private rippleEl: HTMLSpanElement;

  /**
   * MouseDown event handler
   * @param event - the DOM event
   */
  @HostListener('mousedown', ['$event', '$event.currentTarget'])
  mouseDown(event: MouseEvent): void {
    if (this.disabled) { return; }
    if (event.button === 0) {
      this.getFadeOutAnimation(event);
    }
  }

  /**
   * MouseUp event handler
   * @param event - the DOM event
   */
  @HostListener('mouseup', ['$event', '$event.currentTarget'])
  mouseUp(event: MouseEvent): void {
    this.getFadeInAnimation();
  }

  constructor(private renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    // cache button and ripple elements
    this.buttonEl = this.button.nativeElement;
    this.rippleEl = this.ripple.nativeElement;

    // set button styles
    ['variant', 'color', 'size'].forEach(attrName => {
      const attrVal = this[attrName];
      if (attrVal) {
        this.renderer.addClass(this.buttonEl, 'mui-btn--' + attrVal);
      }
    });
  }

  private getFadeOutAnimation(event): void {

    // get (x, y) position of click
    const offsetWidth = this.buttonEl.offsetWidth;
    const offsetHeight = this.buttonEl.offsetHeight;
    const offsetTop = this.buttonEl.offsetTop;
    const offsetLeft = this.buttonEl.offsetLeft;

    // calculate radius
    const radius = Math.sqrt(offsetWidth * offsetWidth + offsetHeight * offsetHeight);
    const diameter = radius * 2 + 'px';

    // set position and dimensions
    const width = diameter;
    const height = diameter;
    const left = Math.round(event.pageX - offsetLeft - radius) + 'px';
    const top = Math.round(event.pageY - offsetTop - radius) + 'px';

    // apply styles
    this.renderer.setStyle(this.rippleEl, 'left', left);
    this.renderer.setStyle(this.rippleEl, 'top', top);
    this.renderer.setStyle(this.rippleEl, 'width', width);
    this.renderer.setStyle(this.rippleEl, 'height', height);

    // apply classes
    this.renderer.removeClass(this.rippleEl, 'mui--is-animating');
    this.renderer.addClass(this.rippleEl, 'mui--is-visible');

    // start animation
    window.requestAnimationFrame(() => this.renderer.addClass(this.rippleEl, 'mui--is-animating'));
  }

  private getFadeInAnimation(): void {
    // allow a repaint to occur before removing class so animation shows for tap events
    window.requestAnimationFrame(() => this.renderer.removeClass(this.rippleEl, 'mui--is-visible'));
  }
}
