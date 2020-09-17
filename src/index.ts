import {Context, invokeMethod} from '@loopback/core';
import {ApplicationConfig, MyIntApp} from './application';
import {UpperCaser} from './utilities';
export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new MyIntApp(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  const ucr: UpperCaser = new UpperCaser();

  //const ctx: Context = app;
  const ctx: Context = new Context(app);
  let upperCasedString = await invokeMethod(ucr, 'doIt', ctx, [
    'some string #1',
  ]);
  console.log(`\nupperCasedString1:${upperCasedString}\n`);

  upperCasedString = await invokeMethod(ucr, 'doIt2', ctx, ['some string #2']);
  console.log(`\nupperCasedString2:${upperCasedString}\n`);

  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST,
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
