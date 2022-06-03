"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_collapse_1 = require("react-collapse");
const bemUtils_1 = __importDefault(require("../../../utils/bemUtils"));
require("./collapsableContainer.less");
const bem = (0, bemUtils_1.default)('collapsableContainer');
const CollapsableContainer = ({ children, animated = true, isOpen = false, ariaLive = 'off' }) => {
    const content = react_1.default.createElement("div", { "aria-live": ariaLive }, isOpen ? react_1.default.createElement("div", null, children) : react_1.default.createElement("div", null));
    if (!animated) {
        return content;
    }
    return (react_1.default.createElement(react_collapse_1.Collapse, { isOpened: isOpen, className: bem.classNames(bem.block, bem.modifierConditional('isOpen', isOpen)) }, content));
};
exports.default = CollapsableContainer;
