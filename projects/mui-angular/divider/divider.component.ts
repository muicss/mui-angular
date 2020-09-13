import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'mui-divider',
  template: `
  <div *ngIf="isHorizontal; else elseBlock" class="mui-divider" #div>
    <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
  </div>
  <ng-template #elseBlock>
    <span class="mui-divider" #span>
      <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
    </span>
  </ng-template>
  <ng-template #contentTpl><ng-content></ng-content></ng-template>
  `,
  styles: []
})
export class DividerComponent implements AfterViewInit, OnInit {
  @ViewChild('div', { static: false }) div: ElementRef<HTMLDivElement>;

  @ViewChild('span', { static: false }) span: ElementRef<HTMLSpanElement>;

  @Input() location?: string;

  private el: HTMLElement;

  isHorizontal: boolean;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    // set element
    this.isHorizontal ? this.el = this.div.nativeElement : this.el = this.span.nativeElement;

    // set class
    if (this.location) {
      this.renderer.removeClass(this.el, 'mui-divider');
      this.renderer.addClass(this.el, 'mui--divider-' + this.location);
    }

  }

  ngOnInit(): void {
    // set horizontal flag
    (['right', 'left'].indexOf(this.location) > -1) ? this.isHorizontal = false : this.isHorizontal = true;
  }

}
