import * as mongoose from 'mongoose'
export default {
    mongoTags : {
        'mongodb.method': { type: String },
        'mongodb.host': { type: String },
        'mongodb.portPath': { type: String },
        'mongodb.database': { type: String },
        'mongodb.collection': { type: String },
        'mongodb.cmd' : {type : mongoose.SchemaTypes.Mixed}
    }
}