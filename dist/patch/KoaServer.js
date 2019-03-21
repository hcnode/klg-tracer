"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("../util/Utils");
const bodyParser = require("koa-bodyparser");
const pandora_hook_1 = require("pandora-hook");
const debug = require('debug')('Klg:Tracer:Hook:KoaServerPatcher');
class KoaServerPatcher extends pandora_hook_1.HttpServerPatcher {
    constructor(options) {
        super(options);
        if (options && options.interceptor) {
            if (!Utils_1.isFunction(options.interceptor))
                throw new Error('KoaServer interceptor must be a function');
        }
    }
    getModuleName() {
        return 'koa';
    }
    buildTags(ctx) {
        const tags = super.buildTags(ctx.req);
        tags['http.res.status'] = {
            value: ctx.status,
            type: typeof (ctx.status)
        };
        return tags;
    }
    recordQueryLog(ctx, tracer, span) {
        const query = ctx.request.query;
        if (query) {
            span.log({ query });
        }
    }
    recordBodyLog(ctx, tracer, span) {
        const data = ctx.request.body;
        if (data) {
            span.log({ data });
        }
    }
    recordResponseLog(ctx, tracer, span) {
        const response = Utils_1.safeParse(ctx.body);
        if (response) {
            span.log({ response });
        }
    }
    recordTagsAndLog(ctx, tracer, span) {
        const tags = this.buildTags(ctx);
        span.addTags(tags);
        tracer.named(`HTTP-${tags['http.method'].value}:${tags['http.url'].value}`);
        this.recordQueryLog(ctx, tracer, span);
        this.recordBodyLog(ctx, tracer, span);
        this.recordResponseLog(ctx, tracer, span);
    }
    createSpan(tracer) {
        const span = tracer.startSpan('http-server', {
            traceId: tracer.traceId
        });
        return span;
    }
    shimmer() {
        const self = this;
        const traceManager = this.getTraceManager();
        const shimmer = this.getShimmer();
        const options = this.options;
        shimmer.wrap(options.Koa.prototype, 'use', function (use) {
            return function wrappedUse(args) {
                debug(`koa use arguments `, arguments);
                if (this.middleware.length === 0) {
                    this.middleware.push(bodyParser());
                    this.middleware.push(traceManager.bind(async function (ctx, next) {
                        if (options.requestFilter && options.requestFilter(ctx))
                            return await next();
                        traceManager.bindEmitter(ctx.req);
                        traceManager.bindEmitter(ctx.res);
                        const tracer = self.createTracer(ctx.request);
                        const span = self.createSpan(tracer);
                        tracer.setCurrentSpan(span);
                        if (options.interceptor)
                            options.interceptor(ctx, tracer, span);
                        await next();
                        self.recordTagsAndLog(ctx, tracer, span);
                        span.finish();
                        tracer.finish();
                    }));
                    debug(`koa hook complete `);
                }
                return use.apply(this, arguments);
            };
        });
    }
    reportMetrics(ctx) { }
}
exports.KoaServerPatcher = KoaServerPatcher;
//# sourceMappingURL=KoaServer.js.map