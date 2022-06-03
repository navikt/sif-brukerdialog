"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ds_react_1 = require("@navikt/ds-react");
const react_1 = __importDefault(require("react"));
const bemUtils_1 = __importDefault(require("../../../utils/bemUtils"));
const SkjemagruppeQuestion_1 = __importDefault(require("../../helpers/skjemagruppe-question/SkjemagruppeQuestion"));
require("./modalFormAndInfo.scss");
const bem = (0, bemUtils_1.default)('formikModalForm').child('modal');
function ModalFormAndInfo({ data, labels, error, dialogWidth, renderEditButtons = false, renderDeleteButton = true, dialogClassName, wrapInfoInPanel = true, shouldCloseOnOverlayClick = false, wrapInfoInFieldset = true, infoRenderer, formRenderer, onDelete, onChange, }) {
    const [modalState, setModalState] = react_1.default.useState({
        isVisible: false,
    });
    const handleOnSubmit = (values) => {
        onChange(values);
        setModalState({ isVisible: false });
    };
    const handleEdit = (data) => {
        setModalState({ isVisible: true, data });
    };
    const handleDelete = () => {
        onDelete();
    };
    const resetModal = () => {
        setModalState({ isVisible: false, data: undefined });
    };
    const content = data === undefined ? (react_1.default.createElement(ds_react_1.Button, { type: "button", onClick: () => setModalState({ isVisible: true, data }), size: "small", variant: "secondary" }, labels.addLabel)) : (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "modalFormAndInfo__infoWrapper" }, wrapInfoInPanel ? (react_1.default.createElement(ds_react_1.Panel, { border: true, className: 'modalFormAndInfo__infoWrapper__panel' }, infoRenderer({ data, onEdit: handleEdit, onDelete: handleDelete }))) : (infoRenderer({ data, onEdit: handleEdit, onDelete: handleDelete }))),
        renderEditButtons && (react_1.default.createElement("div", { className: 'modalFormAndInfo__buttons' },
            react_1.default.createElement(ds_react_1.Button, { type: "button", onClick: () => setModalState({ isVisible: true, data }), size: "small", variant: "secondary" }, data ? labels.editLabel : labels.addLabel),
            renderDeleteButton && (react_1.default.createElement(ds_react_1.Button, { type: "button", onClick: onDelete, size: "small", variant: "secondary" }, labels.deleteLabel))))));
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ds_react_1.Modal, { open: modalState.isVisible, shouldCloseOnOverlayClick: shouldCloseOnOverlayClick, className: bem.classNames(bem.block, bem.modifier(dialogWidth), dialogClassName), onClose: resetModal }, formRenderer({
            onSubmit: handleOnSubmit,
            onCancel: resetModal,
            data: modalState.data,
        })),
        wrapInfoInFieldset === true ? (react_1.default.createElement(SkjemagruppeQuestion_1.default, { error: error, legend: labels.infoTitle }, content)) : (content)));
}
exports.default = ModalFormAndInfo;
