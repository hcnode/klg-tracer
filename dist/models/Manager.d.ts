import * as mongoose from "mongoose";
export default class Manager {
    constructor(url: any);
    connected: boolean;
    connectedInfo: any;
    url: any;
    Trace: mongoose.Model<mongoose.Document, {}>;
    connect(): Promise<void>;
    insert(data: any): Promise<mongoose.Document>;
    query(limit: any, skip: any, query: any): Promise<any>;
}
