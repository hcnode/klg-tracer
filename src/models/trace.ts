import * as mongoose from 'mongoose'
import mongodb from './mongodb'
import httpServer from './httpServer';
var traceSchema = new mongoose.Schema({
    status: { type: Number, index: true },         
    traceId: { type: String, index: true },      // 用于串联业务的 唯一id
    name: { type: String, required: true, index: true },
    timestamp: { type: Number },  // 开始时间
    duration: { type: Number },  // 请求耗时 ms
    spans : [{
        mongoTages : mongodb,
        httpTags : httpServer
    }]
})

export default traceSchema