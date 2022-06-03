"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var ds_react_1 = require("@navikt/ds-react");
var types_1 = require("../../types");
var utils_1 = require("../../utils");
var SanityBlock_1 = __importDefault(require("../sanity-block/SanityBlock"));
require("./statusMessage.css");
var getAlertStripeTypeFromMessageType = function (type) {
    switch (type) {
        case types_1.SanityMessageType.info:
            return 'info';
        case types_1.SanityMessageType.warning:
            return 'warning';
        case types_1.SanityMessageType.error:
            return 'error';
        default:
            return 'info';
    }
};
var StatusMessage = function (_a) {
    var message = _a.message, _b = _a.locale, locale = _b === void 0 ? 'nb' : _b, _c = _a.wrapInAlertStripe, wrapInAlertStripe = _c === void 0 ? true : _c;
    var info = (0, utils_1.getLocaleBlockContent)(message.message, locale);
    if (!info || info.length === 0) {
        return null;
    }
    var content = (0, jsx_runtime_1.jsx)(SanityBlock_1.default, { content: info });
    return wrapInAlertStripe ? ((0, jsx_runtime_1.jsx)(ds_react_1.Alert, __assign({ variant: getAlertStripeTypeFromMessageType(message.messageType), className: "statusMessage" }, { children: content }))) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: content }));
};
exports.default = StatusMessage;
