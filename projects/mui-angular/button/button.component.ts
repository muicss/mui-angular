import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'mui-button',
  template: `
    <button class="mui-btn" #button>
      <ng-content></ng-content>
    </button>
  `
})


export class ButtonComponent implements OnInit {
  @ViewChild('button') button: ElementRef;

  @Input() variant: string = '';
  @Input() color: string = '';
  @Input() size: string = '';
  
  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // set button styles
    ['variant', 'color', 'size'].forEach(attrName => {
      let attrVal = this[attrName];
      if (attrVal) {
        this.button.nativeElement.classList.add('mui-btn--' + attrVal);
      }
    });
  }
}
