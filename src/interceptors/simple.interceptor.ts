import {Interceptor} from '@loopback/core';

export const myLog: Interceptor = (invocationCtx, next) => {
  console.log('myLog: before-' + invocationCtx.methodName);
  // Calling `next()` without `await`
  const result = next();
  // It's possible that the statement below is executed before downstream
  // interceptors or the target method finish
  console.log('myLog: after-' + invocationCtx.methodName);
  return result;
};
