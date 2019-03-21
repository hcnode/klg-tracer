"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pandora_env_1 = require("pandora-env");
const pandora_metrics_1 = require("pandora-metrics");
class DefaultEnvironment extends pandora_env_1.BaseEnvironment {
    constructor() {
        super({
            appName: pandora_metrics_1.MetricsConstants.METRICS_DEFAULT_APP
        });
    }
    match(name) {
        return name === 'default';
    }
}
exports.DefaultEnvironment = DefaultEnvironment;
//# sourceMappingURL=DefaultEnvironment.js.map