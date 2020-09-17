import {inject} from '@loopback/core';
import {get, Request, ResponseObject, RestBindings} from '@loopback/rest';
import {UpperCaser} from '../utilities';
/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
export class PingController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject('uppercaser') private ucr: UpperCaser,
  ) {}

  // Map to `GET /ping`
  @get('/ping', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async ping(): Promise<object> {
    // Reply with a greeting, the current time, the url, and request headers

    //const ucr: UpperCaser = new UpperCaser();
    let ucMessage = await this.ucr.doIt('from controller #1');
    console.log(`\n#1: ${ucMessage}\n`);
    ucMessage = await this.ucr.doIt2('from controller #2');
    console.log(`\n#2: ${ucMessage}\n`);

    return {
      greeting: 'Hello from LoopBack',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }
}
