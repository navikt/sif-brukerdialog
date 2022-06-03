"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStartedSøknadRequestParam = exports.isUserLoggedOut = exports.isUnauthorized = exports.isForbidden = void 0;
const http_status_codes_1 = __importStar(require("http-status-codes"));
const isForbidden = ({ response }) => response !== undefined &&
    (response.status === http_status_codes_1.default.FORBIDDEN || response.status === http_status_codes_1.StatusCodes.UNAVAILABLE_FOR_LEGAL_REASONS);
exports.isForbidden = isForbidden;
const isUnauthorized = (error) => error !== undefined && error.response !== undefined && error.response.status === http_status_codes_1.default.UNAUTHORIZED;
exports.isUnauthorized = isUnauthorized;
const isUserLoggedOut = (error) => (0, exports.isUnauthorized)(error);
exports.isUserLoggedOut = isUserLoggedOut;
const getStartedSøknadRequestParam = (date) => {
    return date ? `startetSøknad=${date.toISOString()}` : undefined;
};
exports.getStartedSøknadRequestParam = getStartedSøknadRequestParam;
