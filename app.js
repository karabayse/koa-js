// REQUIRES
const Koa = require('koa');
// npm install koa-router
const KoaRouter = require('koa-router');
// npm install koa-json
const json = require('koa-json');
// core Node module
const path = require('path');
// npm install koa-ejs
const render = require('koa-ejs');
// npm install koa-bodyparser
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new KoaRouter();

// Replace with DB (could use MongoDB)
const things = ['My Family', 'Programming', 'Music']

// USES
// JSON Prettier Middleware
app.use(json());
// BodyParser Middleware
app.use(bodyParser());

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

// Routes -> function called 'index'
router.get('/', index);
router.get('/add', showAdd);
// request type different (post rather than add), but same route ('/add')
router.post('/add', add);

// List of things -> pass in context, 'ctx'
async function index(ctx) {
  await ctx.render('index', {
    // pass in an object as a second parameter -> add 'title' to index.html
    title: 'Things I Love:',
    things: things
  });
}

// Show add page
async function showAdd(ctx) {
  await ctx.render('add');
}

// Add thing
async function add(ctx) {
  const body = ctx.request.body;
  things.push(body.thing);
  ctx.redirect('/');
}

// Create a route for the index page
// router.get('/', async ctx => {
//   await ctx.render('index', {
    // pass in an object as a second parameter -> add 'title' to index.html
//     title: 'Things I Love:',
//     things: things
//   });
// });

router.get('/test', ctx => (ctx.body = 'Hello Test'));

// Router Middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('Server up'));
