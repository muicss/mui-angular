import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'mui-container',
  template: `<div #container class="mui-container"><ng-content></ng-content></div>`,
  styles: []
})
export class ContainerComponent implements AfterViewInit {
  @ViewChild('container') container: ElementRef<HTMLDivElement>;

  private isFluid: boolean;

  private containerEl: HTMLDivElement;

  @Input()
  set fluid(value: any) {
    if (this.transformBooleanProperty(value)) {
      this.isFluid = true;
    }
  }

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    if (this.isFluid) {
      this.containerEl = this.container.nativeElement;
      this.renderer.removeClass(this.containerEl, 'mui-container');
      this.renderer.addClass(this.containerEl, 'mui-container-fluid');
    }
  }

  transformBooleanProperty(value: any): boolean {
    return value != null && `${value}` !== 'false';
  }
}
