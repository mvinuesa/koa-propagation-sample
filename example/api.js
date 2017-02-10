var Router = require('koa-router');
const api = new Router();
const rp = require('request-promise');


api.get('/request', async (ctx, next) => {
  const authorization  = ctx.request.headers.authorization;
  const XB3SpanId      = ctx.response.get('x-b3-spanid') || {};
  const XB3TraceId      = ctx.response.get('x-b3-traceid');

  var options = {
    uri: 'http://localhost:3000/response',
    json: true // Automatically parses the JSON string in the response
  };

  var headers = options.headers;
  if (headers){
    if (authorization){
      headers['Authorization'] = authorization;
    }
    if (XB3SpanId){
      headers['X-B3-SpanId'] = XB3SpanId;
    }
    if (XB3TraceId){
      headers['X-B3-TraceId'] = XB3TraceId;
    }
  } else {
    var headers = {
        'Authorization': authorization,
        'X-B3-TraceId': XB3TraceId,
        'X-B3-SpanId': XB3SpanId
    };
    options['headers'] = headers;
    console.log(options);
  }

  var res = await rp(options)
    .then(function (response) {
        return response;
    })
    .catch(function (err) {
        ctx.throw(err);
    });
  ctx.body = `from request: Authorization: ${authorization} X-B3-SpanId: ${XB3SpanId} X-B3-TraceId: ${XB3TraceId} ${res}`;
});


api.get('/health',async(ctx, next) => {
  ctx.body = { status: 'UP' };
})

api.get('/response', async (ctx, next) => {
  const authorization  = ctx.request.headers.authorization;
  const XB3SpanId      = ctx.response.get('x-b3-spanid') || {};
  const XB3TraceId      = ctx.response.get('x-b3-traceid');
  ctx.body = `from response: Authorization: ${authorization} X-B3-SpanId: ${XB3SpanId} X-B3-TraceId: ${XB3TraceId}`;
});

module.exports = api;
