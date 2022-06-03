"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppSanityClient = void 0;
var client_1 = __importDefault(require("@sanity/client"));
var getAppSanityClient = function (_a) {
    var projectId = _a.projectId, dataset = _a.dataset, _b = _a.token, token = _b === void 0 ? '' : _b;
    return (0, client_1.default)({
        projectId: projectId,
        dataset: dataset,
        token: token,
        useCdn: false,
    });
};
exports.getAppSanityClient = getAppSanityClient;
