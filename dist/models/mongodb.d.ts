import * as mongoose from 'mongoose';
declare const _default: {
    mongoTags: {
        'mongodb.method': {
            type: StringConstructor;
        };
        'mongodb.host': {
            type: StringConstructor;
        };
        'mongodb.portPath': {
            type: StringConstructor;
        };
        'mongodb.database': {
            type: StringConstructor;
        };
        'mongodb.collection': {
            type: StringConstructor;
        };
        'mongodb.cmd': {
            type: typeof mongoose.Schema.Types.Mixed;
        };
    };
};
export default _default;
