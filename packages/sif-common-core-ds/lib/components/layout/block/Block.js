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
const bemUtils_1 = __importDefault(require("../../../utils/bemUtils"));
require("./block.scss");
const bem = (0, bemUtils_1.default)('box');
const Block = (_a) => {
    var { margin = 'l', padBottom, className, textAlignCenter } = _a, rest = __rest(_a, ["margin", "padBottom", "className", "textAlignCenter"]);
    const classNames = bem.classNames(bem.block, bem.modifierConditional(margin, margin !== undefined), bem.modifierConditional(`bottom-${padBottom}`, padBottom !== undefined), {
        [bem.modifier('textAlignCenter')]: textAlignCenter,
        [`${className}`]: className !== undefined,
    });
    return react_1.default.createElement("div", Object.assign({ className: classNames }, rest));
};
exports.default = Block;
