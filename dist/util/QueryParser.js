"use strict";
/**
 * copy from koa.js
 * @param req
 * @returns {number}
 */
Object.defineProperty(exports, "__esModule", { value: true });
const qs = require("querystring");
const parse = require("parseurl");
function query(req) {
    const str = querystring(req);
    const c = this._querycache = this._querycache || {};
    return c[str] || (c[str] = qs.parse(str));
}
exports.query = query;
function querystring(req) {
    if (!req)
        return '';
    return parse(req).query || '';
}
//# sourceMappingURL=QueryParser.js.map