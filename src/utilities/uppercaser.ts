import {intercept} from '@loopback/core';
import {DomLogInterceptorInterceptor, myLog} from '../interceptors';

export class UpperCaser {
  constructor() {}

  @intercept(myLog)
  async doIt(original: string): Promise<string> {
    return original.toUpperCase();
  }

  @intercept(DomLogInterceptorInterceptor.BINDING_KEY)
  async doIt2(original: string): Promise<string> {
    return original.toUpperCase();
  }
}
