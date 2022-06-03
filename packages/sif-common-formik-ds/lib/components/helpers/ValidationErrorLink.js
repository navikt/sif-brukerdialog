"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ds_react_1 = require("@navikt/ds-react");
const react_1 = __importDefault(require("react"));
const stopClickEvent = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
};
const ValidationErrorLink = ({ onClick, children, className }) => {
    return (react_1.default.createElement(ds_react_1.Link, { className: className, href: "#", onClick: (evt) => {
            stopClickEvent(evt);
            onClick();
        } }, children));
};
exports.default = ValidationErrorLink;
