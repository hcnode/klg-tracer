const Koa = require('koa');
const { TraceService, Tracer } = require('../dist')
new TraceService().registerHooks({
  httpServer: {
    // enabled: true,
    useKoa: true, // 在 koa 设置钩子，比直接在 http 层设置钩子稳定
    Koa
    // 过滤器，只记录特定接口, 注意 return true 的才会被过滤
    // requestFilter: function (req) {
    //   return true;
    // }
  },
  mongodb: {
    enabled: true,
    options: {
      useMongoose: true,
      mongodb: require('mongodb')
    }
  }
}).registerMongoReporter({
  mongoUrl: 'mongodb://127.0.0.1:27017/koa-cola-tracer',
  collectionName: 'tracer'
});

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
const Cat = mongoose.model('Cat', { name: String });
const app = new Koa();
app.use(async ctx => {
  const kitty = new Cat({ name: 'harry' });
//   await kitty.save().then();
  var cat = await Cat.find({name : 'harry'}).select('name').then()
  ctx.body = cat;
});

app.listen(3000);
