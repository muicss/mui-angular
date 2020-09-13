import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mui-appbar',
  template: `<div class="mui-appbar"><ng-content></ng-content></div>`
})

export class AppbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
