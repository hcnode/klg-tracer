import * as mongoose from "mongoose";

export default {
    name: { type: String, required: true, index: true },
    timestamp: { type: Number },  // 开始时间
    duration: { type: Number },  // 请求耗时 ms
    "context": {
        "traceId": {type : String},
        "parentId": {type : String},
        "spanId": {type : String},
    },
    tags : [
        {
            name : {type : String},
            value : {type : mongoose.SchemaTypes.Mixed}
        }
    ],
    logs : [
        {
            name : {type : String},
            value : {type : mongoose.SchemaTypes.Mixed}
        }
    ]
}