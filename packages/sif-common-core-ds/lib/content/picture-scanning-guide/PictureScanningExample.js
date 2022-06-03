"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ds_react_1 = require("@navikt/ds-react");
const react_1 = __importDefault(require("react"));
const StatusIcon_1 = __importDefault(require("./status-icon/StatusIcon"));
const PictureScanningExample = ({ image, status, statusText, description }) => (react_1.default.createElement(ds_react_1.BodyShort, null,
    react_1.default.createElement("div", { className: "pl-4 mb-3" }, image),
    react_1.default.createElement(ds_react_1.Heading, { size: "xsmall", level: "4", spacing: true, className: "flex" },
        react_1.default.createElement(StatusIcon_1.default, { status: status }),
        react_1.default.createElement("span", { className: "pl-2" }, statusText)),
    react_1.default.createElement("p", null, description)));
exports.default = PictureScanningExample;
