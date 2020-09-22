import { AfterViewInit, Component, ContentChildren, ElementRef, HostListener, Input, OnDestroy, OnInit, QueryList, Renderer2, ViewChild } from '@angular/core';
import { DropdownItemComponent } from './dropdown-item.component';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'mui-dropdown',
  template: `
  <div class="mui-dropdown" #wrapper>
    <mui-button (click)="onClick($event)" [disabled]="disabled">
      <ng-container *ngIf="placement === 'left' else default">
        <mui-caret *ngIf="!noCaret" direction={{placement}}></mui-caret>&nbsp;{{label}}
      </ng-container>
    </mui-button>
    <ul class="mui-dropdown__menu" #menu>
      <ng-container *ngFor="let item of items">
        <ng-container [ngTemplateOutlet]="item.itemTemplate"></ng-container>
      </ng-container>
    </ul>
  </div>

  <ng-template #default>
    {{label}}&nbsp;<mui-caret *ngIf="!noCaret" direction={{placement}}></mui-caret>
  </ng-template>
  `,
  styles: []
})
export class DropdownComponent implements OnDestroy, AfterViewInit, OnInit {
  @Input() noCaret?: boolean = false;

  @Input() variant?: string;

  @Input() label: string;

  @Input() color?: string;

  @Input() size?: string;

  @Input() placement?: string;

  @Input() alignment?: string;

  @Input() disabled?: boolean = false;

  @ViewChild('wrapper') wrapper: ElementRef;

  @ViewChild('menu') menu: ElementRef;

  @ContentChildren(DropdownItemComponent) items: QueryList<DropdownItemComponent>;

  open: BehaviorSubject<boolean> = new BehaviorSubject(null);



  private wrapperEl: HTMLDivElement;
  private buttonEl: HTMLButtonElement;
  private menuEl: HTMLUListElement;

  private unsubscribe: Subscription = new Subscription();

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // cache references
    this.menuEl = this.menu.nativeElement;
    this.wrapperEl = this.wrapper.nativeElement;
    this.buttonEl = this.wrapperEl.querySelector('button');

    // set button styles
    ['variant', 'color', 'size'].forEach(attrName => {
      const attrVal = this[attrName];
      if (attrVal) {
        this.renderer.addClass(this.buttonEl, 'mui-btn--' + attrVal);
      }
    });

    // placement class
    if (this.placement) {
      this.renderer.addClass(this.wrapperEl, `mui-dropdown--${this.placement}`);
    }

    // alignment class
    if (this.alignment) {
      this.renderer.addClass(this.menuEl, `mui-dropdown__menu--${this.alignment}`);
    }

    // listen for changes in open
    const openSub = this.open.subscribe((open) => {
      if (this.open.value === null) { return; }

      if (open) {
        this.openDropdown();
      } else {
        this.closeDropdown();
      }
    });
    this.unsubscribe.add(openSub);
  }

  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }

  /**
   * KeyDown event handler
   * @param event - the DOM event
   */
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    const key = event.key;
    if (key === 'Escape' || key === 'Esc') {
      this.open.next(false);
    }
  }

  /**
   * click handler
   * @param targetEl - the DOM event target
   */
   @HostListener('document:click', ['$event.target'])
   handleDocumentClick(targetEl: HTMLElement): void {
     if (!this.wrapperEl.contains(targetEl)) { this.open.next(false); }
   }

  closeDropdown(): void {
    this.renderer.removeClass(this.menuEl, 'mui--is-open');
  }

  openDropdown(): void {
    // menu placement
    const wrapperRect = this.wrapperEl.getBoundingClientRect();
    const buttonRect = this.buttonEl.getBoundingClientRect();

    const pos = {
      bottom: '',
      top: '',
      right: '',
      left: ''
    };

    switch (this.placement) {
      case 'up':
        pos.bottom = buttonRect.height + buttonRect.top
          - wrapperRect.top + 'px';
        break;
      case 'right':
        pos.left = buttonRect.width + 5 + 'px';
        pos.top = buttonRect.top - wrapperRect.top + 'px';
        break;
      case 'left':
        pos.right = buttonRect.width + 5 + 'px';
        pos.top = buttonRect.top - wrapperRect.top + 'px';
        break;
      default:
        pos.top = buttonRect.top - wrapperRect.top + buttonRect.height
          + 'px';
    }

    // menu alignment
    if (this.alignment === 'bottom') {
      pos.top = 'auto';
      pos.bottom = buttonRect.top - wrapperRect.top + 'px';
    }
    this.renderer.setStyle(this.menuEl, 'top', pos.top);
    this.renderer.setStyle(this.menuEl, 'bottom', pos.bottom);
    this.renderer.setStyle(this.menuEl, 'right', pos.right);
    this.renderer.setStyle(this.menuEl, 'left', pos.left);

    this.renderer.addClass(this.menuEl, 'mui--is-open');
  }

  onClick(event: MouseEvent): void {
    // exit if disabled
    if (this.disabled) { return; }

    if (event.button !== 0) { return; }

    // prevent from submission
    event.preventDefault();

    // toggle open
    this.open.value ? this.open.next(false) : this.open.next(true);
  }
}
