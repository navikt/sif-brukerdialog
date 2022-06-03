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
const ModalContent_1 = __importDefault(require("@navikt/ds-react/esm/modal/ModalContent"));
const react_1 = __importDefault(require("react"));
require("../dialogs.scss");
const InfoDialog = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    return (react_1.default.createElement(ds_react_1.Modal, Object.assign({ className: `infoDialog ${props.className}` }, props),
        react_1.default.createElement(ModalContent_1.default, { className: "sif--modal__content", title: props['aria-label'] }, children)));
};
exports.default = InfoDialog;
