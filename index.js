import Koa from 'koa';
import KoaStatic from 'koa-static';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

const app = new Koa()
const router = new Router();

app.use(bodyParser());
app.use(KoaStatic(__dirname + '/public'));

// router.get('/', (ctx, next) => {
//   ctx.body="test page"
// });

// x-response-time
async function xResponse (ctx, next) {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-time', `${ms}ms`);
};

async function timeLogger (ctx, next) {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  const info = `${ctx.method} ${ctx.url} - ${ms}ms`;
  console.log(info);
  ctx.body += info;
}

async function bodyPrinter (ctx, next) {
  ctx.body = "Hello Koa \n";
}


app
  .use(xResponse)
  .use(timeLogger)
  .use(bodyPrinter)

app.listen(4000);

console.log('server listen port: ' + 4000)