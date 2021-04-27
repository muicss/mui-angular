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

  @Input('xs-offset') xsOffset?: number;

  @Input('sm-offset') smOffset?: number;

  @Input('md-offset') mdOffset?: number;

  @Input('lg-offset') lgOffset?: number;

  @Input('xl-offset') xlOffset?: number;

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
      xsOffset: 'mui-col-xs-offset-',
      smOffset: 'mui-col-sm-offset-',
      mdOffset: 'mui-col-md-offset-',
      lgOffset: 'mui-col-lg-offset-',
      xlOffset: 'mui-col-xl-offset-'
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
