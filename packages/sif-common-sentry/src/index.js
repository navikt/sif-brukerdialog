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
exports.setSentryEnvironment = exports.logToSentry = exports.isRunningLocally = exports.TAG_APPLICATION = exports.SentryEnvironment = void 0;
const Sentry = __importStar(require("@sentry/browser"));
const window = global;
var SentryEnvironment;
(function (SentryEnvironment) {
    SentryEnvironment["LOCALHOST"] = "LOCALHOST";
    SentryEnvironment["q"] = "q";
    SentryEnvironment["prod"] = "prod";
    SentryEnvironment["hostUndefined"] = "hostUndefined";
})(SentryEnvironment = exports.SentryEnvironment || (exports.SentryEnvironment = {}));
exports.TAG_APPLICATION = 'application';
const isRunningLocally = (hostname) => hostname.includes('localhost');
exports.isRunningLocally = isRunningLocally;
const logToSentry = (message, severity, application, extras) => {
    Sentry.withScope((scope) => {
        if (extras) {
            scope.setExtras(extras);
        }
        scope.setTag(exports.TAG_APPLICATION, application);
        Sentry.captureMessage(message, severity);
    });
};
exports.logToSentry = logToSentry;
const logToSentryOrConsole = (message, severity, application, extras) => {
    if ((0, exports.isRunningLocally)(window.location.hostname)) {
        console.warn(`Severity: ${severity}. Message: ${message}`, extras);
    }
    else {
        (0, exports.logToSentry)(message, severity, application, extras);
    }
};
const logApiCallErrorToSentryOrConsole = (error, application) => {
    var _a;
    const maybeXRequestId = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.headers['x-request-id'];
    const errorMsg = error === null || error === void 0 ? void 0 : error.message;
    logToSentryOrConsole('Api call error', 'fatal', application, {
        XRequestId: maybeXRequestId || undefined,
        errorMsg: errorMsg,
    });
};
const setSentryEnvironment = (maybeHost) => {
    if (maybeHost && typeof maybeHost === 'string') {
        if (maybeHost.indexOf('localhost') > -1) {
            return SentryEnvironment.LOCALHOST;
        }
        if (maybeHost.indexOf('www-q0.nav.no') > -1) {
            return SentryEnvironment.q;
        }
        if (maybeHost.indexOf('www.nav.no') > -1) {
            return SentryEnvironment.prod;
        }
    }
    return SentryEnvironment.hostUndefined;
};
exports.setSentryEnvironment = setSentryEnvironment;
const setSentryEnvironmentFromHost = () => { var _a; return (0, exports.setSentryEnvironment)((_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.host); };
const initSentryForSIF = (allowUrls) => {
    Sentry.init({
        dsn: 'https://20da9cbb958c4f5695d79c260eac6728@sentry.gc.nav.no/30',
        environment: setSentryEnvironmentFromHost(),
        allowUrls,
    });
};
const getSentryLoggerForApp = (application, allowUrls) => ({
    init: () => initSentryForSIF(allowUrls),
    log: (message, severity, payload) => logToSentryOrConsole(message, severity, application, payload ? { info: payload } : undefined),
    logInfo: (message, payload) => logToSentryOrConsole(message, 'info', application, payload ? { info: payload } : undefined),
    logError: (message, payload) => logToSentryOrConsole(message, 'error', application, payload ? { info: payload } : undefined),
    logApiError: (error) => logApiCallErrorToSentryOrConsole(error, application),
    logToSentry: (message, severity, payload) => (0, exports.logToSentry)(message, severity, application, payload ? { info: payload } : undefined),
});
exports.default = getSentryLoggerForApp;
