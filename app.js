const Koa = require('koa');
const app = new Koa();

// uses
app.use(async ctx => ctx.body = 'Hello World');

app.listen(3000, () => console.log('Server up'));
