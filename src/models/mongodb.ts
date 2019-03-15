import * as mongoose from 'mongoose'
export default {
    mongoTages : {
        'method': { type: String },
        'host': { type: String },
        'portPath': { type: String },
        'database': { type: String },
        'collection': { type: String },
        'cmd' : {type : mongoose.SchemaTypes.Mixed}
    }
}