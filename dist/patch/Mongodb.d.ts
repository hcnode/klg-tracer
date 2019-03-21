import { MongodbPatcher as PandoraMongodbPatcher } from 'pandora-hook';
export declare class MongodbPatcher extends PandoraMongodbPatcher {
    constructor(options?: any);
    shimmer(options: any): void;
}
