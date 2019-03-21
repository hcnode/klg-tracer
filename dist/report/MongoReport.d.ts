import { IReport } from '../domain';
import { TracerCRUD } from 'klg-tracer-model';
import { TraceData } from '../domain';
export interface MongoReportOption {
    mongoUrl: string;
    collectionName?: string;
}
export declare class MongoReport implements IReport {
    options: MongoReportOption;
    crud: TracerCRUD;
    constructor(options: MongoReportOption);
    report(data: TraceData): Promise<void>;
    initDb(): void;
    transData(data: TraceData): Array<any>;
}
