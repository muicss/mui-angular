# MUI Angular Component Library

[![MUI](https://www.muicss.com/static/favicons/icon-192x192.png)](https://www.muicss.com/)
[![Angular](https://angular.io/assets/images/favicons/favicon-194x194.png)](https://angular.io/)

MUI Angular is a library that helps you to add MUI components to your Angular apps seamlessly.

**Install with NPM:**

```shell
$ npm install --save @muicss/angular
```

**Install with ng:**

```shell
$ ng add @muicss/angular
```

## Quickstart

Create a new Angular app and install MUI Angular

```shell
$ ng new my-app
$ cd my-app
$ ng add mui-angular
```

Add the MUI Angular button module to the app module (`src/app/app.module.ts`):

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ButtonModule } from '@muicss/angular/button';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Replace the app component html code with the following (`src/app/app.component.html`):

```html
<mui-button>Press Me!</mui-button>
```

Run the development server:

```shell
$ ng serve
```

Then visit http://localhost:4200/

## Development

This repository contains the source code for the MUI Angular library (`projects/mui-angular`) and an example app that uses the library (`projects/example-app`).

To build the library run:

```shell
$ ng build @muicss/angular
```

To view the example app:

```shell
$ ng serve example-app
```

### Build

Run `ng build` to build the library. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build. Use the `--watch` flag to rebuild the library on code changes.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
