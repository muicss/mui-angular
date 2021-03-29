import { Component } from '@angular/core';
import { TabComponent } from '@muicss/angular/tabs';

@Component({ templateUrl: 'tabs-page.component.html' })
export class TabsPageComponent {
    select(tab: TabComponent): void {
        console.log('Tab selected: ', tab.label);
    }

    deselect(tab: TabComponent): void {
        console.log('Tab deselected: ', tab.label);
    }

    change(index: number): void {
        console.log('User activated new tab index: ', index);
    }
}
