require('ts-node').register({ /* options */ })
const Koa = require('koa');
const app = new Koa();
var Manage = require('../dist/models/Manager').default
var manager = new Manage('mongodb://127.0.0.1:27017/koa-cola-tracer');
const cors = require('@koa/cors');
// var mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
// const Cat = mongoose.model('Cat', { name: String });
app.use(require('koa-static')(__dirname + '/'))
app.use(cors());
app.use(async (ctx, next) => {
    try {
        if (ctx.path == '/data') {
            var { limit = '10', skip = "0", query = '{}' } = ctx.query;
            var result = await manager.query(limit - 10, skip - 0, JSON.parse(query));
            ctx.body = result.map(({ timestamp, duration, status, name, spans }) => {
                return {
                    time: new Date(timestamp),
                    duration,
                    status,
                    name,
                    spans: spans.map(({ name, timestamp, duration, tags }) => {
                        return {
                            name,
                            time: new Date(timestamp),
                            duration,
                            tags: tags.map(tag => JSON.stringify(tag.value)).join('-')
                        }
                    })
                }
            });
        }
        // const kitty = new Cat({ name: 'harry' });
        // await kitty.save().then();
        // var cat = await Cat.find({name : 'harry'}).select('name').then()
        // ctx.body = cat; 
    } catch (error) {
        ctx.body = error
    }

    await next();
});

app.listen(3001);