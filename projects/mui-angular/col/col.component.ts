import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'mui-col',
  template: `<div #col><ng-content></ng-content></div>`,
  styles: []
})

export class ColComponent implements AfterViewInit {

  @Input() xs?: number;

  @Input() sm?: number;

  @Input() md?: number;

  @Input() lg?: number;

  @Input() xl?: number;

  @Input() 'xs-offset'?: number;

  @Input() 'sm-offset'?: number;

  @Input() 'md-offset'?: number;

  @Input() 'lg-offset'?: number;

  @Input() 'xl-offset'?: number;

  @ViewChild('col') col: ElementRef<HTMLDivElement>;

  private colEl: HTMLDivElement;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    // cache col element
    this.colEl = this.col.nativeElement;

    // define attributes
    const breakpoints = {
      xs: 'mui-col-xs-',
      sm: 'mui-col-sm-',
      md: 'mui-col-md-',
      lg: 'mui-col-lg-',
      xl: 'mui-col-xl-',
      'xs-offset': 'mui-col-xs-offset-',
      'sm-offset': 'mui-col-sm-offset-',
      'md-offset': 'mui-col-md-offset-',
      'lg-offset': 'mui-col-lg-offset-',
      'xl-offset': 'mui-col-xl-offset-'
    };

    // set col classes
    Object.entries(breakpoints).forEach(([attrName, attrClass]) => {
      const attrVal = this[attrName];
      if (attrVal) {
        this.renderer.addClass(this.colEl, `${attrClass}${attrVal}`);
      }
    });
  }
}
