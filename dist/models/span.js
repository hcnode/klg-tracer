"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.default = {
    name: { type: String, required: true, index: true },
    timestamp: { type: Number },
    duration: { type: Number },
    "context": {
        "traceId": { type: String },
        "parentId": { type: String },
        "spanId": { type: String },
    },
    tags: [
        {
            name: { type: String },
            value: { type: mongoose.SchemaTypes.Mixed }
        }
    ],
    logs: [
        {
            name: { type: String },
            value: { type: mongoose.SchemaTypes.Mixed }
        }
    ]
};
//# sourceMappingURL=span.js.map