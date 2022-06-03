"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ds_react_1 = require("@navikt/ds-react");
const react_1 = __importDefault(require("react"));
const react_intl_1 = require("react-intl");
require("./unansweredQuestionsInfo.scss");
const UnansweredQuestionsInfo = ({ children }) => {
    const intl = (0, react_intl_1.useIntl)();
    const getDefaultMessage = () => {
        switch (intl.locale) {
            case 'nn':
                return 'For å kome vidare, må du svare på alle spørsmåla ovafor';
            default:
                return 'For å komme videre, må du svare på alle spørsmålene ovenfor';
        }
    };
    return (react_1.default.createElement("div", { className: "unansweredQuestionsInfo" },
        react_1.default.createElement(ds_react_1.Alert, { variant: "info", size: "small" }, children || getDefaultMessage())));
};
exports.default = UnansweredQuestionsInfo;
