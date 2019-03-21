"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url = require("url");
const semver = require("semver");
const LOCALHOST_NAMES = {
    'localhost': true,
    '127.0.0.1': true,
    '0.0.0.0': true,
    '0:0:0:0:0:0:0:1': true,
    '::1': true,
    '0:0:0:0:0:0:0:0': true,
    '::': true
};
/**
 * 提取 path 信息，去掉尾部反斜杠
 * @param requestUrl
 * @returns {string}
 */
function extractPath(requestUrl) {
    if (typeof requestUrl === 'string') {
        requestUrl = url.parse(requestUrl);
    }
    let path = requestUrl.pathname;
    if (path) {
        if (path !== '/' && path.charAt(path.length - 1) === '/') {
            path = path.substring(0, path.length - 1);
        }
    }
    else {
        path = '/';
    }
    return path;
}
exports.extractPath = extractPath;
function safeParse(str) {
    try {
        return JSON.parse(str);
    }
    catch (e) {
        return str;
    }
}
exports.safeParse = safeParse;
function isLocalhost(host) {
    return !!LOCALHOST_NAMES[host];
}
exports.isLocalhost = isLocalhost;
function nodeVersion(rule) {
    return semver.satisfies(process.version, rule);
}
exports.nodeVersion = nodeVersion;
function hasOwn(obj, key) {
    return Object.hasOwnProperty.call(obj, key);
}
exports.hasOwn = hasOwn;
function isAsyncFunction(funktion) {
    return funktion && {}.toString.call(funktion) === '[object AsyncFunction]';
}
exports.isAsyncFunction = isAsyncFunction;
function isGeneratorFunction(funktion) {
    const constructor = funktion.constructor;
    if (!constructor) {
        return false;
    }
    if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) {
        return true;
    }
    return 'function' === typeof constructor.prototype.next && 'function' === typeof constructor.prototype.throw;
}
exports.isGeneratorFunction = isGeneratorFunction;
function isFunction(funktion) {
    return funktion && ({}.toString.call(funktion) === '[object Function]' || isGeneratorFunction(funktion) || isAsyncFunction(funktion));
}
exports.isFunction = isFunction;
//# sourceMappingURL=Utils.js.map