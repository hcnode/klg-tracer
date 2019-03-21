"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.default = {
    mongoTags: {
        'mongodb.method': { type: String },
        'mongodb.host': { type: String },
        'mongodb.portPath': { type: String },
        'mongodb.database': { type: String },
        'mongodb.collection': { type: String },
        'mongodb.cmd': { type: mongoose.SchemaTypes.Mixed }
    }
};
//# sourceMappingURL=mongodb.js.map