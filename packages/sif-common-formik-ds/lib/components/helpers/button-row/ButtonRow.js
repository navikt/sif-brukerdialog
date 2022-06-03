"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./buttonRow.scss");
const ButtonRow = ({ children, align = 'center', layout = 'normal' }) => {
    const cls = `buttonRow buttonRow--${align} buttonRow--${layout}`;
    return (react_1.default.createElement("div", { className: cls }, react_1.default.Children.map(children, (knapp, index) => (react_1.default.createElement("span", { key: index, className: "buttonRow__button" }, knapp)))));
};
exports.default = ButtonRow;
