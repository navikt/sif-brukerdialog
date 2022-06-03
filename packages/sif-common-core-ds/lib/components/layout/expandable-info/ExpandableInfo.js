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
const uuid_1 = require("uuid");
const CollapsableContainer_1 = __importDefault(require("./CollapsableContainer"));
const InfoToggleButton_1 = __importDefault(require("./InfoToggleButton"));
require("./expandableInfo.less");
const bemUtils_1 = __importDefault(require("../../../utils/bemUtils"));
const bem = (0, bemUtils_1.default)('expandableInfo');
const ExpandableInfo = ({ children, initialOpen, closeTitle, title, filledBackground = true }) => {
    const [isOpen, setIsOpen] = (0, react_1.useState)(initialOpen || false);
    const [toggleContentId] = (0, react_1.useState)((0, uuid_1.v4)());
    return (react_1.default.createElement("div", { className: bem.block },
        react_1.default.createElement("div", { className: bem.element('toggler', isOpen ? 'open' : undefined) },
            react_1.default.createElement(InfoToggleButton_1.default, { onToggle: () => setIsOpen(!isOpen), isOpen: isOpen, controlsId: toggleContentId }, isOpen ? closeTitle || title : title)),
        react_1.default.createElement("div", { className: bem.element('content'), id: toggleContentId },
            react_1.default.createElement(CollapsableContainer_1.default, { isOpen: isOpen, animated: true, ariaLive: "polite" }, filledBackground ? react_1.default.createElement(ds_react_1.Alert, { variant: "info" }, children) : children))));
};
exports.default = ExpandableInfo;
