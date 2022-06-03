"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ds_react_1 = require("@navikt/ds-react");
const react_1 = __importDefault(require("react"));
const SkjemagruppeQuestion_1 = __importDefault(require("../../helpers/skjemagruppe-question/SkjemagruppeQuestion"));
require("./fileInput.scss");
const UploadSvg_1 = __importDefault(require("./UploadSvg"));
class FileInput extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.fileSelectHandler = this.fileSelectHandler.bind(this);
        this.onFileDropHandler = this.onFileDropHandler.bind(this);
        this.onFileDragOverHandler = this.onFileDragOverHandler.bind(this);
        this.onFileSelect = this.onFileSelect.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }
    fileSelectHandler(fileList) {
        const files = Array.from(fileList);
        this.props.onFilesSelect(files);
    }
    onFileDragOverHandler(e) {
        e.preventDefault();
    }
    onFileDropHandler(e) {
        e.preventDefault();
        this.fileSelectHandler(e.dataTransfer.files);
    }
    onFileSelect(e) {
        if (e.target.files) {
            this.fileSelectHandler(e.target.files);
            e.target.value = '';
        }
    }
    onKeyPress(e) {
        const { id } = this.props;
        const ENTER_KEYCODE = 13;
        const inputElement = document.getElementById(id);
        if (e.which === ENTER_KEYCODE && inputElement !== null) {
            inputElement.click();
        }
    }
    render() {
        const { id, name, buttonLabel, error, description, multiple, legend, onClick, accept } = this.props;
        const inputId = `${id}-input`;
        return (react_1.default.createElement(SkjemagruppeQuestion_1.default, { error: error, legend: legend, description: description, className: `fileInput ${error !== undefined ? 'fileInput--withError' : ''}` },
            react_1.default.createElement("label", { role: "button", id: id, tabIndex: 0, htmlFor: inputId, className: "attachmentButton", onDragOver: this.onFileDragOverHandler, onDrop: this.onFileDropHandler, onKeyPress: this.onKeyPress, onClick: onClick },
                react_1.default.createElement("div", { className: "attachmentButton__icon" },
                    react_1.default.createElement(UploadSvg_1.default, null)),
                react_1.default.createElement(ds_react_1.Label, { className: "attachmentButton__label" }, buttonLabel),
                react_1.default.createElement("input", { id: inputId, name: name, type: "file", accept: accept, onChange: (e) => this.onFileSelect(e), multiple: multiple === true }))));
    }
}
exports.default = FileInput;
