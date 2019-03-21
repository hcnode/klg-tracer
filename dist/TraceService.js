"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const HttpServer_1 = require("./patch/HttpServer");
const KoaServer_1 = require("./patch/KoaServer");
const HttpClient_1 = require("./patch/HttpClient");
const Mongodb_1 = require("./patch/Mongodb");
const pandora_env_1 = require("pandora-env");
const DefaultEnvironment_1 = require("./mock/DefaultEnvironment");
const Manager_1 = require("./models/Manager");
const debug = require('debug')('Klg:Tracer:TraceService');
const defaultOptions = {
    httpServer: {
        useKoa: false,
        recordGetParams: true,
        recordPostData: true,
        recordResponse: true
    },
    httpClient: {
        enabled: true,
        options: {
            recordGetParams: true,
            recordPostData: true,
            recordResponse: true
        }
    },
    mongodb: {
        enabled: true,
        options: {
            useMongoose: true
        }
    }
};
class TraceService {
    constructor() {
        this.setPandoraEnv();
    }
    setPandoraEnv() {
        pandora_env_1.EnvironmentUtil.getInstance().setCurrentEnvironment(new DefaultEnvironment_1.DefaultEnvironment());
    }
    registerHooks(options = defaultOptions) {
        _.defaultsDeep(options, defaultOptions);
        debug('options:', options);
        if (options.httpServer.useKoa) {
            new KoaServer_1.KoaServerPatcher(options.httpServer).run();
        }
        else {
            new HttpServer_1.KlgHttpServerPatcher(options.httpServer).run();
        }
        if (options.httpClient.enabled)
            new HttpClient_1.KlgHttpClientPatcher(options.httpClient.options).run();
        if (options.mongodb.enabled)
            new Mongodb_1.MongodbPatcher(options.mongodb.options).run();
        return this;
    }
    registerMongoReporter(options) {
        // const mongo = new MongoReport(options)
        var manager = new Manager_1.default(options.mongoUrl);
        process.on('PANDORA_PROCESS_MESSAGE_TRACE', async (tracer) => {
            var result = await manager.insert(tracer);
            // mongo.report(tracer).then(result => {
            //   // empty
            // }).catch(err => {
            //   logger.err('save mongo report err', err)
            // })
        });
    }
}
exports.TraceService = TraceService;
//# sourceMappingURL=TraceService.js.map