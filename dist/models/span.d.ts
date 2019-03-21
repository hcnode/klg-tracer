import * as mongoose from "mongoose";
declare const _default: {
    name: {
        type: StringConstructor;
        required: boolean;
        index: boolean;
    };
    timestamp: {
        type: NumberConstructor;
    };
    duration: {
        type: NumberConstructor;
    };
    "context": {
        "traceId": {
            type: StringConstructor;
        };
        "parentId": {
            type: StringConstructor;
        };
        "spanId": {
            type: StringConstructor;
        };
    };
    tags: {
        name: {
            type: StringConstructor;
        };
        value: {
            type: typeof mongoose.Schema.Types.Mixed;
        };
    }[];
    logs: {
        name: {
            type: StringConstructor;
        };
        value: {
            type: typeof mongoose.Schema.Types.Mixed;
        };
    }[];
};
export default _default;
