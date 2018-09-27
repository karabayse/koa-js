// requires
const Koa = require('koa');
// npm install koa-router
const KoaRouter = require('koa-router');
// npm install koa-json
const json = require('koa-json');
// core Node module
const path = require('path');
// npm install koa-ejs
const render = require('koa-ejs');

const app = new Koa();
const router = new KoaRouter();

// uses
// JSON Prettier Middleware
app.use(json());

// Simple Middleware Example
// app.use(async ctx => (ctx.body = 'Hello World'));
// app.use(async ctx => (ctx.body = { msg: 'Hello World' }));

render(app, {

});

router.get('/test', ctx => (ctx.body = 'Hello Test'));

// Router Middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('Server up'));
