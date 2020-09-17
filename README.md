# myint

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

## Installation

Install  using `npm`;

```sh
$ npm install myint
```

## Basic Use

Configure and load  in the application constructor
as shown below.

```ts
import {, , } from 'myint';
// ...
export class MyApplication extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication))) {
  constructor(options: ApplicationConfig = {}) {
    const opts:  = ;
    this.configure(.COMPONENT).to(opts);
      // Put the configuration options here
    });
    this.component();
    // ...
  }
  // ...
}
```
