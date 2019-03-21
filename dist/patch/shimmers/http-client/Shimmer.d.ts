/// <reference types="node" />
import { HttpClientShimmer } from 'pandora-hook';
import { ClientRequest } from 'http';
export declare class KlgHttpClientShimmer extends HttpClientShimmer {
    buildTagsAndLog(args: any, _request: any, span: any, tracer: any): void;
    httpRequestWrapper: (request: any) => (this: ClientRequest) => any;
    wrapRequest: (request: any, tracer: any, span: any) => void;
}
