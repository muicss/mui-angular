import { AfterContentInit, EventEmitter, Component, ContentChildren, Input,  Output, QueryList } from '@angular/core';
import { TabComponent } from './tab.component';

@Component({
  selector: 'mui-tabs',
  template: `
  <ul class="mui-tabs__bar" [ngClass]="{'mui-tabs__bar--justified': justified}">
    <li *ngFor="let tab of tabs" [ngClass]="{'mui--is-active': tab.active}">
      <a (click)="onClick(tab)">{{tab.label}}</a>
    </li>
  </ul>
  <ng-content></ng-content>
  `,
  styles: []
})
export class TabsComponent implements AfterContentInit {

  @Input()
  justified?: boolean = false;

  @Output() muiChange = new EventEmitter<number>();

  @ContentChildren(TabComponent)
  tabs: QueryList<TabComponent>;

  private selected: TabComponent;

  constructor() { }

  ngAfterContentInit(): void {
    const activeTab = this.tabs.find((tab) => tab.active);

    if (activeTab) {
      this.selectTab(activeTab);
    } else {
      this.selectTab(this.tabs.first);
    }
  }

  onClick(tab: TabComponent): void {
    this.selectTab(tab);
  }

  private selectTab(tab: TabComponent): void {
    if (this.selected === tab) { return; }

    if (this.selected) {
      this.selected.onDeselect();
    }

    this.selected = tab;
    tab.onSelect();

    this.muiChange.emit(this.tabs.toArray().indexOf(this.selected));
  }

}
