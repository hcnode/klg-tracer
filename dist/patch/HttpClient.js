"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pandora_hook_1 = require("pandora-hook");
const Shimmer_1 = require("./shimmers/http-client/Shimmer");
class KlgHttpClientPatcher extends pandora_hook_1.HttpClientPatcher {
    constructor(options) {
        super(Object.assign({
            shimmerClass: Shimmer_1.KlgHttpClientShimmer
        }, options));
    }
}
exports.KlgHttpClientPatcher = KlgHttpClientPatcher;
//# sourceMappingURL=HttpClient.js.map