export interface IReport {
    report(data: TraceData): void;
}
export interface SpanData {
    name: string;
    references: Array<{
        refType?: string;
        traceId: string;
        spanId: string;
    }>;
    context: object;
    timestamp: number;
    duration: number;
    logs: Array<{
        timestamp: number;
        fields: any;
    }>;
    tags: object;
}
export interface TraceData {
    name: string;
    userId?: string;
    traceId: string;
    status: number;
    timestamp: number;
    duration: number;
    spans: Array<SpanData>;
}
export interface TracerReport {
    report(): any;
    getValue(): any;
}
export declare type requestFilter = (req: any) => boolean;
export declare type interceptor = (ctx: any, tracer: any, span: any) => void;
export interface HttpHookOptions {
    recordGetParams?: boolean;
    recordPostData?: boolean;
    recordResponse?: boolean;
}
export interface HttpServerHookOptions extends HttpHookOptions {
    useKoa?: boolean;
    requestFilter?: requestFilter;
    interceptor?: interceptor;
}
export interface EnableOptions<T> {
    enabled: boolean;
    options?: T;
}
export interface HttpClientHookOptions extends HttpHookOptions {
}
export interface TracerOptions {
    httpServer?: HttpServerHookOptions;
    httpClient?: EnableOptions<HttpClientHookOptions>;
    mongodb?: EnableOptions<any>;
}
