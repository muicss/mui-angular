import { Component, ElementRef, Input, ViewChild, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'mui-button',
  template: `
    <button class="mui-btn" #button [disabled]="disabled">
      <ng-content></ng-content>
      <span class="mui-btn__ripple-container" #container><span class="mui-ripple" #ripple></span></span>
    </button>
  `
})

export class ButtonComponent {
  @ViewChild('button') button: ElementRef;
  @ViewChild('ripple') ripple: ElementRef;

  @Input() variant: string = '';
  @Input() color: string = '';
  @Input() size: string = '';
  @Input() disabled?: boolean = false;

  @HostListener('mousedown', ['$event', '$event.currentTarget'])
  mouseDown(event: MouseEvent) {
    if (event.button === 0) {
      this.getFadeOutAnimation(event);
    }
  }

  @HostListener('mouseup', ['$event', '$event.currentTarget']) mouseUp() {
    this.getFadeInAnimation()
  }

  constructor(private renderer: Renderer2) {
  }

  ngAfterViewInit() {
    // set button styles
    ['variant', 'color', 'size'].forEach(attrName => {
      let attrVal = this[attrName];
      if (attrVal) {
        this.renderer.addClass(this.button.nativeElement, 'mui-btn--' + attrVal);
      }
    });
  }

  private getFadeOutAnimation(event) {
    var offsetWidth, offsetHeight, offsetTop, offsetLeft, radius, diameter, width, height, left, top;

    // get (x, y) position of click
    offsetWidth = this.button.nativeElement.offsetWidth;
    offsetHeight = this.button.nativeElement.offsetHeight;
    offsetTop = this.button.nativeElement.offsetTop;
    offsetLeft = this.button.nativeElement.offsetLeft;

    // calculate radius
    radius = Math.sqrt(offsetWidth * offsetWidth + offsetHeight * offsetHeight);
    diameter = radius * 2 + 'px';

    // set position and dimensions
    width = diameter;
    height = diameter;
    left = Math.round(event.pageX - offsetLeft - radius) + 'px';
    top = Math.round(event.pageY - offsetTop - radius) + 'px';

    this.renderer.setStyle(this.ripple.nativeElement, 'left', left);
    this.renderer.setStyle(this.ripple.nativeElement, 'top', top);
    this.renderer.setStyle(this.ripple.nativeElement, 'width', width);
    this.renderer.setStyle(this.ripple.nativeElement, 'height', height);

    this.renderer.removeClass(this.ripple.nativeElement, 'mui--is-animating');
    this.renderer.addClass(this.ripple.nativeElement, 'mui--is-visible');

    // start animation
    window.requestAnimationFrame(() => this.renderer.addClass(this.ripple.nativeElement, 'mui--is-animating'));
  }

  private getFadeInAnimation() {
    // allow a repaint to occur before removing class so animation shows for tap events
    window.requestAnimationFrame(() => this.renderer.removeClass(this.ripple.nativeElement, 'mui--is-visible'));
  }
}
