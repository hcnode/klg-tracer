"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const span_1 = require("./span");
var traceSchema = new mongoose.Schema({
    status: { type: Number, index: true },
    traceId: { type: String, index: true },
    name: { type: String, required: true, index: true },
    timestamp: { type: Number },
    duration: { type: Number },
    spans: [Object.assign({}, span_1.default)],
    logs: [
        {
            "fields": [
                {
                    "key": { type: String },
                    "value": { type: String }
                }
            ],
            "timestamp": { type: Number }
        }
    ]
});
exports.default = traceSchema;
//# sourceMappingURL=trace.js.map