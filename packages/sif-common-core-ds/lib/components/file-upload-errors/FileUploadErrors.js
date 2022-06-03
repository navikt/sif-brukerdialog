"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ds_react_1 = require("@navikt/ds-react");
const react_1 = __importDefault(require("react"));
const react_intl_1 = require("react-intl");
const pretty_bytes_1 = __importDefault(require("pretty-bytes"));
const fileUploaderUtils_1 = require("../file-uploader/fileUploaderUtils");
const FileUploadErrors = ({ filesThatDidntGetUploaded }) => {
    if (filesThatDidntGetUploaded.length === 0) {
        return null;
    }
    return (react_1.default.createElement(ds_react_1.Alert, { variant: "warning" },
        react_1.default.createElement(react_intl_1.FormattedMessage, { id: "fileUploadErrors.part1" }),
        react_1.default.createElement("ul", null, filesThatDidntGetUploaded.map(({ name, size, type }) => {
            return (react_1.default.createElement("li", { key: name },
                name,
                type,
                size && !(0, fileUploaderUtils_1.fileSizeIsValid)(size) && (react_1.default.createElement("div", { className: "text-small" },
                    "Fila er for stor (",
                    (0, pretty_bytes_1.default)(size),
                    "). Maks filst\u00F8rrelse er ",
                    (0, pretty_bytes_1.default)(10000000),
                    "."))));
        }))));
};
exports.default = FileUploadErrors;
