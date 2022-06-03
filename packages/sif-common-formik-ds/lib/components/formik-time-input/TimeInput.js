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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidTime = void 0;
const ds_react_1 = require("@navikt/ds-react");
const react_1 = __importStar(require("react"));
const bemUtils_1 = __importDefault(require("../../utils/bemUtils"));
const numberInputUtils_1 = require("../../utils/numberInputUtils");
const validationUtils_1 = require("../../validation/validationUtils");
require("./timeInput.scss");
const MAX_HOURS = 23;
const MAX_MINUTES = 59;
const bem = (0, bemUtils_1.default)('timeInput');
const isValidTime = (time) => {
    const hours = (0, numberInputUtils_1.getNumberFromNumberInputValue)(time.hours || '0');
    const minutes = (0, numberInputUtils_1.getNumberFromNumberInputValue)(time.minutes || '0');
    return hours !== undefined && minutes !== undefined;
};
exports.isValidTime = isValidTime;
const handleTimeChange = (time, onChange) => {
    onChange(time, (0, exports.isValidTime)(time));
};
const TimeInput = (_a) => {
    var { time = { hours: undefined, minutes: undefined }, maxHours = MAX_HOURS, maxMinutes = MAX_MINUTES, direction: layout = 'normal', compact = true, justifyContent = 'center', placeholders, description, disabled, onChange, refs, className } = _a, restProps = __rest(_a, ["time", "maxHours", "maxMinutes", "direction", "compact", "justifyContent", "placeholders", "description", "disabled", "onChange", "refs", "className"]);
    const [stateTime, setStateTime] = (0, react_1.useState)(time);
    const testKey = restProps['data-testid'];
    return (react_1.default.createElement("div", { "data-testid": testKey, className: bem.classNames(bem.block, bem.modifier(layout), bem.modifier(`content-${justifyContent}`), bem.modifierConditional('compact', compact), bem.modifierConditional('withValue', (0, validationUtils_1.hasValue)(time.hours) || (0, validationUtils_1.hasValue)(time.minutes)), bem.modifierConditional('withHours', (0, validationUtils_1.hasValue)(time.hours)), bem.modifierConditional('withMinutes', (0, validationUtils_1.hasValue)(time.minutes)), className) },
        react_1.default.createElement("div", { className: bem.element('contentWrapper') },
            react_1.default.createElement("div", { className: bem.element('inputWrapper') },
                react_1.default.createElement("span", { className: bem.element('label') }, "Timer"),
                react_1.default.createElement(ds_react_1.TextField, { ref: refs === null || refs === void 0 ? void 0 : refs.hours, className: bem.element('hours'), type: "text", autoComplete: 'off', inputMode: 'numeric', pattern: '[0-9]*', placeholder: placeholders === null || placeholders === void 0 ? void 0 : placeholders.hours, min: 0, max: maxHours, maxLength: 2, value: (stateTime === null || stateTime === void 0 ? void 0 : stateTime.hours) || '', disabled: disabled, onChange: (evt) => {
                        const newTime = Object.assign(Object.assign({}, stateTime), { hours: evt.target.value });
                        setStateTime(newTime);
                        handleTimeChange(newTime, onChange);
                    }, label: 'Timer', hideLabel: true, "data-testid": testKey ? `${testKey}_hours` : undefined })),
            react_1.default.createElement("div", { className: bem.element('inputWrapper') },
                react_1.default.createElement("span", { className: bem.element('label') }, "Minutter"),
                react_1.default.createElement(ds_react_1.TextField, { label: "Minutter", hideLabel: true, className: bem.element('minutes'), ref: refs === null || refs === void 0 ? void 0 : refs.minutes, type: "text", autoComplete: 'off', inputMode: 'numeric', placeholder: placeholders === null || placeholders === void 0 ? void 0 : placeholders.minutes, pattern: '[0-9]*', min: 0, maxLength: 2, max: maxMinutes, value: (stateTime === null || stateTime === void 0 ? void 0 : stateTime.minutes) || '', disabled: disabled, onChange: (evt) => {
                        const newTime = Object.assign(Object.assign({}, stateTime), { minutes: evt.target.value });
                        setStateTime(newTime);
                        handleTimeChange(newTime, onChange);
                    }, "data-testid": testKey ? `${testKey}_minutes` : undefined }))),
        description && react_1.default.createElement("p", { className: bem.element('description') }, description)));
};
exports.default = TimeInput;
