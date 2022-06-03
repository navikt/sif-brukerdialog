"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ds_icons_1 = require("@navikt/ds-icons");
const bemUtils_1 = __importDefault(require("../../../utils/bemUtils"));
require("./infoToggleButton.less");
const cls = (0, bemUtils_1.default)('infoToggleButton');
const InfoToggleButton = (props) => {
    const { isOpen = false, children, onToggle, controlsId } = props;
    return (react_1.default.createElement("button", { type: "button", className: cls.block, onClick: onToggle, "aria-expanded": isOpen, "aria-controls": controlsId },
        react_1.default.createElement("span", { className: cls.element('content') },
            react_1.default.createElement("span", { className: cls.element('label') }, children),
            react_1.default.createElement("span", { className: cls.element('chevron') }, isOpen ? react_1.default.createElement(ds_icons_1.Collapse, null) : react_1.default.createElement(ds_icons_1.Expand, null)))));
};
exports.default = InfoToggleButton;
