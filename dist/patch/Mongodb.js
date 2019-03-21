"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pandora_hook_1 = require("pandora-hook");
const Shimmer_1 = require("pandora-hook/dist/patch/shimmers/mongodb/Shimmer");
const Database_1 = require("pandora-hook/dist/utils/Database");
// import { MongodbPatcher } from 'pandora-hook/dist/patch/Mongodb'
const is = require("is-type-of");
class NewMongodbShimmer extends Shimmer_1.MongodbShimmer {
    constructor(shimmer, traceManager, options = {}) {
        super(shimmer, traceManager, options = {});
    }
    buildTagsAndMore(ctx, invokeInfo, isQuery, parsedQuery) {
        const tags = {};
        if (isQuery) {
            tags['mongodb.method'] = {
                value: parsedQuery.operation || invokeInfo.query,
                type: 'string'
            };
            tags['mongodb.host'] = {
                type: 'string',
                value: invokeInfo.instanceAttr.host
            };
            tags['mongodb.portPath'] = {
                type: 'string',
                value: String(invokeInfo.instanceAttr.portPath)
            };
            tags['mongodb.database'] = {
                type: 'string',
                value: invokeInfo.instanceAttr.databaseName
            };
            tags['mongodb.collection'] = {
                type: 'string',
                value: parsedQuery.collection
            };
        }
        else {
            tags['mongodb.method'] = {
                value: invokeInfo.name,
                type: 'string'
            };
        }
        // 透传 invokeInfo，但最后不输出 tag
        tags['invokeInfo'] = {
            callback: invokeInfo.callback,
            promise: invokeInfo.promise,
            callbackIdx: invokeInfo.callbackIdx
        };
        tags['mongodb.cmd'] = {
            value: ctx.cmd
        };
        return tags;
    }
    wrapQuery(module, method, extractInvoke, isQuery) {
        const self = this;
        return this._wrapQuery(module, method, function queryTagsBuilder(ctx, args) {
            let invokeInfo = is.function(extractInvoke) ? extractInvoke(ctx, args) : extractInvoke || {};
            if (isQuery) {
                if (invokeInfo.instanceAttr) {
                    invokeInfo.instanceAttr = Database_1.normalizeInfo(invokeInfo.instanceAttr);
                }
            }
            let parsedQuery = {};
            if (invokeInfo.query) {
                parsedQuery = self.parseQuery(ctx, invokeInfo.query);
            }
            return self.buildTagsAndMore(ctx, invokeInfo, isQuery, parsedQuery);
        });
    }
}
// export class NewMongodbPatcher extends MongodbPatcher {
//   constructor(options = {}) {
//     super(options);
//     this.shimmer(options);
//   }
//   getModuleName() {
//     return 'mongodb';
//   }
//   shimmer(options) {
//     const traceManager = this.getTraceManager();
//     const shimmer = this.getShimmer();
//     this.hook('^2.x', (loadModule) => {
//       const mongodb = loadModule('./index');
//       if (mongodb.instrument) {
//         const mongodbShimmer = new MongodbShimmer(shimmer, traceManager, options);
//         mongodb.instrument({}, mongodbShimmer.instrumentModules);
//       }
//       // 暂时不考虑没有 apm 的低版本
//       return;
//     });
//   }
// }
class MongodbPatcher extends pandora_hook_1.MongodbPatcher {
    constructor(options) {
        super(options);
    }
    shimmer(options) {
        const traceManager = this.getTraceManager();
        const shimmer = this.getShimmer();
        const mongodb = options.mongodb;
        if (mongodb.instrument) {
            const mongodbShimmer = new NewMongodbShimmer(shimmer, traceManager, options);
            mongodb.instrument({}, mongodbShimmer.instrumentModules);
        }
    }
}
exports.MongodbPatcher = MongodbPatcher;
//# sourceMappingURL=Mongodb.js.map