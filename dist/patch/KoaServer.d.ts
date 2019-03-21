import { HttpServerPatcher } from 'pandora-hook';
import { HttpServerHookOptions } from '../domain';
export declare class KoaServerPatcher extends HttpServerPatcher {
    constructor(options: HttpServerHookOptions);
    getModuleName(): string;
    buildTags(ctx: any): {
        'http.method': {
            value: any;
            type: string;
        };
        'http.url': {
            value: any;
            type: string;
        };
        'http.client': {
            value: boolean;
            type: string;
        };
    };
    recordQueryLog(ctx: any, tracer: any, span: any): void;
    recordBodyLog(ctx: any, tracer: any, span: any): void;
    recordResponseLog(ctx: any, tracer: any, span: any): void;
    recordTagsAndLog(ctx: any, tracer: any, span: any): void;
    createSpan(tracer: any): any;
    shimmer(): void;
    reportMetrics(ctx: any): void;
}
