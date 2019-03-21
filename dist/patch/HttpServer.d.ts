/// <reference types="node" />
import { HttpServerPatcher } from 'pandora-hook';
import { ParsedUrlQuery } from 'querystring';
export declare class KlgHttpServerPatcher extends HttpServerPatcher {
    constructor(options?: {
        recordResponse?: boolean;
        recordGetParams?: boolean;
        recordPostData?: boolean;
    });
    /**
     * 放在 class 这一层，方便子类替换实现
     * @param options
     * @param req
     * @param res
     * @param tracer
     * @param span
     */
    recordResponse(options: any, req: any, res: any, tracer: any, span: any): void;
    /**
     * 放在 class 这一层，方便子类替换实现
     * @param options
     * @param req
     * @param res
     * @param tracer
     * @param span
     */
    recordQuery(options: any, req: any, res: any, tracer: any, span: any): void;
    bufferTransformer(buffer: any): ParsedUrlQuery | string;
    /**
     * 放在 class 这一层，方便子类替换实现
     * @param options
     * @param req
     * @param res
     * @param tracer
     * @param span
     */
    recordPostData(options: any, req: any, res: any, tracer: any, span: any): void;
    /**
     * 如果要新增钩子，复写此方法，添加调用
     * super.wrapRequest()
     * this.newRecord(options, req, res, tracer, span)
     * @param options
     * @param req
     * @param res
     * @param tracer
     * @param span
     */
    wrapRequest(options: any, req: any, res: any, tracer: any, span: any): void;
    shimmer(options: any): void;
    reportMetrics(ctx: any): void;
}
