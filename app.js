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
  // look in this folder, root, for the views folder
  root: path.join(__dirname, 'views'),
  // a layout wraps all your views
  layout: 'layout',
  // configure a views extension
  viewExt: 'html',
  cache: false,
  debug: false
});

// Create a route for the index page
router.get('/', async ctx => {
  await ctx.render('index', {
    // pass in an object as a second parameter -> add 'title' to index.html
    title: 'Things I Love:'
  });
});

router.get('/test', ctx => (ctx.body = 'Hello Test'));

// Router Middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('Server up'));
