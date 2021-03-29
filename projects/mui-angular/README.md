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

Create a new Angular app and install the MUI Angular library:

```shell
$ ng new my-app --style scss
$ cd my-app
$ ng add @muicss/angular
```

Next install the MUI SCSS files:

```shell
$ npm install --save muicss
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
<mui-button color="primary">Press Me!</mui-button>
```

Next add the MUI SCSS modules we need to your styles.scss file (`src/styles.scss`):

```scss
// Core variables and mixins
@import
"~muicss/lib/sass/mui/colors",
"~muicss/lib/sass/mui/variables",
"~muicss/lib/sass/mui/mixins";

// Globals
@import
"~muicss/lib/sass/mui/globals";

// Components
@import
"~muicss/lib/sass/mui/buttons";

// Miscellaneous
@import
"~muicss/lib/sass/mui/helpers",
"~muicss/lib/sass/mui/ripple",
"~muicss/lib/sass/mui/typography";
```

Run the development server:

```shell
$ ng serve
```

Then visit http://localhost:4200/
