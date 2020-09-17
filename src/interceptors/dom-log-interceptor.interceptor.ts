import {
  injectable,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise,
} from '@loopback/core';

/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
@injectable({tags: {key: DomLogInterceptorInterceptor.BINDING_KEY}})
export class DomLogInterceptorInterceptor implements Provider<Interceptor> {
  static readonly BINDING_KEY = `interceptors.${DomLogInterceptorInterceptor.name}`;

  /*
  constructor() {}
  */

  /**
   * This method is used by LoopBack context to produce an interceptor function
   * for the binding.
   *
   * @returns An interceptor function
   */
  value() {
    return this.intercept.bind(this);
  }

  /**
   * The logic to intercept an invocation
   * @param invocationCtx - Invocation context
   * @param next - A function to invoke next interceptor or the target method
   */
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    try {
      // Add pre-invocation logic here
      console.log('log: before-' + invocationCtx.methodName);
      const result = await next();
      // Add post-invocation logic here
      console.log('log: after-' + invocationCtx.methodName);
      return result;
    } catch (err) {
      // Add error handling logic here
      console.log('log: error-' + invocationCtx.methodName);
      throw err;
    }
  }
}
