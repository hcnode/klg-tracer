import { TracerOptions } from './domain';
import { MongoReportOption } from './report/MongoReport';
export declare class TraceService {
    constructor();
    setPandoraEnv(): void;
    registerHooks(options?: TracerOptions): this;
    registerMongoReporter(options: MongoReportOption): void;
}
