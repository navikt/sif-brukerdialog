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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ds_react_1 = require("@navikt/ds-react");
const react_1 = __importStar(require("react"));
const ValidationErrorLink_1 = __importDefault(require("./ValidationErrorLink"));
const ValidationSummary = ({ errors, heading, headingTag }) => {
    const summaryEl = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const { current } = summaryEl;
        if (current !== null) {
            current.focus();
        }
    }, []);
    return (react_1.default.createElement(ds_react_1.ErrorSummary, { ref: summaryEl, heading: heading || 'Feil i skjema', headingTag: headingTag }, errors.map((error, idx) => (react_1.default.createElement(ValidationErrorLink_1.default, { key: `validation_error_key_${idx}`, className: 'lenke', onClick: () => {
            const elementById = document.getElementById(error.fieldName);
            const elementByName = document.getElementsByName(error.fieldName)[0];
            if (elementById) {
                elementById.focus();
            }
            else if (elementByName) {
                elementByName.focus();
            }
        } }, error.errorMessage)))));
};
exports.default = ValidationSummary;
