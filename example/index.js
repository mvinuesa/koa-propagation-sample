'use strict';

const Koa = require('koa');
const morgan = require('koa-morgan');
const api = require('./api');
var sleuth = require('koa-devstack-sleuth');
const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  { name: 'port', alias: 'p', type: Number }
];

const options = commandLineArgs(optionDefinitions);

var port = 4000;

if (options.port) {
    port = options.port;
}

const app = new Koa();

app
  .use(morgan())
  .use(sleuth())
  .use(api.routes())
  .use(api.allowedMethods());

app.listen(port);
console.log("Listening in port ", port);
