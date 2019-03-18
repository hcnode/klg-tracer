import { connect } from "net";
import * as mongoose from "mongoose";
import traceSchema from "./trace";
import span from "./span";


export default class Manager {
    constructor(url) {
        this.url = url;
        if (!this.connected) {
            this.connect()
        }
    }
    connected = false
    url = null
    Trace = mongoose.model('trace', traceSchema)
    connect() {
        if (this.url) {
            mongoose.createConnection(this.url)
            this.connected = true;
        }
    }

    async insert(data) {
        var convertData = {
            ...data,
            spans: data.spans.map(span => {
                return {
                    ...span,
                    tags: Object.keys(span.tags).map(tag => {
                        return {
                           name : tag,
                           value : span.tags[tag].value
                        }
                    }),
                    logs : span.logs.map(log => {
                        return {
                            name : log.fields[0].key,
                            value : log.fields[0].value
                        }
                    })
                }
            })
        }
        var trace = new this.Trace(convertData);
        var result = await trace.save();
        return result;
    }

}