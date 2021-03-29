# MUI Angular

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

Create a new Angular app and install MUI Angular:

```shell
$ ng new my-app
$ cd my-app
$ ng add @muicss/angular
```

Add the MUI Angular button module to the app module (`src/app/app.module.ts`):

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
