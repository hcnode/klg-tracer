"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pandora_hook_1 = require("pandora-hook");
const QueryParser_1 = require("../../../util/QueryParser");
const Utils_1 = require("../../../util/Utils");
const querystring_1 = require("querystring");
const debug = require('debug')('PandoraHook:HttpClient:Shimmer');
class KlgHttpClientShimmer extends pandora_hook_1.HttpClientShimmer {
    constructor() {
        super(...arguments);
        this.httpRequestWrapper = (request) => {
            const self = this;
            const traceManager = this.traceManager;
            const options = self.options;
            return function wrappedHttpRequest() {
                const tracer = traceManager.getCurrentTracer();
                let args = Array.from(arguments);
                if (!tracer) {
                    debug('No current tracer, skip trace');
                    return request.apply(this, args);
                }
                const span = self.createSpan(tracer);
                if (!span) {
                    debug('Create new span empty, skip trace');
                    return request.apply(this, args);
                }
                if (options.remoteTracing) {
                    args = self.remoteTracing(args, tracer, span);
                }
                const _request = request.apply(this, args);
                self.buildTagsAndLog(args, _request, span, tracer);
                self.wrapRequest(_request, tracer, span);
                return _request;
            };
        };
        this.wrapRequest = (request, tracer, span) => {
            const traceManager = this.traceManager;
            const shimmer = this.shimmer;
            const self = this;
            request.once('error', (res) => {
                self.handleError(span, res);
            });
            request.once('response', (res) => {
                self.handleResponse(tracer, span, res);
            });
            /**
             * 结束发送请求。 如果部分请求主体还未被发送，则会刷新它们到流中。 如果请求是分块的，则会发送终止字符 '0\r\n\r\n'。
             * 如果指定了 data，则相当于调用 request.write(data, encoding) 之后再调用 request.end(callback)。
             * 见：http://nodejs.cn/api/http.html#http_request_end_data_encoding_callback
             */
            shimmer.wrap(request, 'end', function requestWriteWrapper(write) {
                const bindRequestWrite = traceManager.bind(write);
                return function wrappedRequestWrite(data, encoding) {
                    if (dataTypeFilter(data, encoding)) {
                        handleBody(span, data);
                    }
                    return bindRequestWrite.apply(this, arguments);
                };
            });
            function dataTypeFilter(chunk, encoding) {
                const hasChunk = chunk && typeof (chunk) === 'string';
                const isUtf8 = encoding === undefined || encoding === 'utf8'; // default is utf8
                return (hasChunk && isUtf8);
            }
            function handleBody(span, chunk) {
                if (span) {
                    span.log({
                        data: querystring_1.parse(chunk) || Utils_1.safeParse(chunk)
                    });
                }
            }
        };
    }
    buildTagsAndLog(args, _request, span, tracer) {
        const tags = this.buildTags(args, _request);
        span.addTags(tags);
        span.log({
            query: QueryParser_1.query({ url: _request.path })
        });
    }
}
exports.KlgHttpClientShimmer = KlgHttpClientShimmer;
//# sourceMappingURL=Shimmer.js.map