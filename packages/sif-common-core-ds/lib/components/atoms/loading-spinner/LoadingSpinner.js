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
const ds_react_1 = require("@navikt/ds-react");
const react_1 = __importDefault(require("react"));
const LoadingSpinner = (_a) => {
    var { type, size, style = 'inline', blockTitle } = _a, rest = __rest(_a, ["type", "size", "style", "blockTitle"]);
    const spinner = react_1.default.createElement(ds_react_1.Loader, { type: type, size: size, "data-testid": rest['data-testid'] });
    if (style === 'inline') {
        return spinner;
    }
    return (react_1.default.createElement("div", { style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: '15rem',
            alignItems: 'center',
        } },
        react_1.default.createElement(LoadingSpinner, { type: "XXL" }),
        blockTitle && (react_1.default.createElement(ds_react_1.Heading, { size: "medium", style: { marginTop: '1rem' } }, blockTitle))));
};
exports.default = LoadingSpinner;
