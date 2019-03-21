"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const trace_1 = require("./trace");
class Manager {
    constructor(url) {
        this.connected = false;
        this.connectedInfo = null;
        this.url = null;
        this.Trace = mongoose.model('trace', trace_1.default);
        this.url = url;
        if (!this.connected) {
            this.connect();
        }
    }
    async connect() {
        if (this.url) {
            this.connectedInfo = mongoose.connect(this.url, { useNewUrlParser: true });
            this.connected = true;
        }
    }
    async insert(data) {
        var convertData = Object.assign({}, data, { spans: data.spans.map(span => {
                return Object.assign({}, span, { tags: Object.keys(span.tags).map(tag => {
                        return {
                            name: tag,
                            value: span.tags[tag].value
                        };
                    }), logs: span.logs.map(log => {
                        return {
                            name: log.fields[0].key,
                            value: log.fields[0].value
                        };
                    }) });
            }) });
        var trace = new this.Trace(convertData);
        var result = await trace.save();
        return result;
    }
    async query(limit, skip, query) {
        var result = await this.Trace.find(query).limit(limit).skip(skip).lean();
        return result;
    }
}
exports.default = Manager;
//# sourceMappingURL=Manager.js.map