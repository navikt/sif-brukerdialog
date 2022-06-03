"use strict";
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
const react_1 = __importDefault(require("react"));
const types_1 = require("../../types");
const FormikRadioGroup_1 = __importDefault(require("../formik-radio-group/FormikRadioGroup"));
function FormikYesOrNoQuestion(_a) {
    var { name, labels } = _a, restProps = __rest(_a, ["name", "labels"]);
    const { yes: yesLabel = 'Ja', no: noLabel = 'Nei' } = labels || {};
    const testKey = restProps['data-testid'];
    delete restProps['data-testid'];
    return (react_1.default.createElement(FormikRadioGroup_1.default, Object.assign({ "data-testid": testKey }, restProps, { radios: [
            { label: yesLabel, value: types_1.YesOrNo.YES, ['data-testid']: testKey ? `${testKey}_yes` : undefined },
            { label: noLabel, value: types_1.YesOrNo.NO, ['data-testid']: testKey ? `${testKey}_no` : undefined },
        ], name: name })));
}
exports.default = FormikYesOrNoQuestion;
