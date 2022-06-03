"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ds_react_1 = require("@navikt/ds-react");
const react_1 = __importDefault(require("react"));
const uuid_1 = require("uuid");
const bemUtils_1 = __importDefault(require("../../../utils/bemUtils"));
const SkjemagruppeQuestion_1 = __importDefault(require("../../helpers/skjemagruppe-question/SkjemagruppeQuestion"));
require("./modalFormAndList.scss");
const bem = (0, bemUtils_1.default)('formikModalForm').child('modal');
function ModalFormAndList({ items = [], listRenderer, formRenderer, labels, error, dialogWidth = 'narrow', maxItems, shouldCloseOnOverlayClick = false, onChange, }) {
    const [modalState, setModalState] = react_1.default.useState({
        isVisible: false,
    });
    const handleOnSubmit = (values) => {
        if (values.id) {
            onChange([...items.filter((item) => item.id !== values.id), values]);
        }
        else {
            onChange([...items, Object.assign({ id: (0, uuid_1.v4)() }, values)]);
        }
        setModalState({ isVisible: false });
    };
    const handleEdit = (item) => {
        setModalState({ isVisible: true, selectedItem: item });
    };
    const handleDelete = (item) => {
        onChange([...items.filter((i) => i.id !== item.id)]);
    };
    const resetModal = () => {
        setModalState({ isVisible: false, selectedItem: undefined });
    };
    const showListTitle = items.length > 0;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ds_react_1.Modal, { open: modalState.isVisible, onClose: resetModal, className: bem.classNames(bem.block, bem.modifier(dialogWidth)), shouldCloseOnOverlayClick: shouldCloseOnOverlayClick },
            react_1.default.createElement(ds_react_1.Modal.Content, { title: labels.modalTitle },
                labels.modalTitle && (react_1.default.createElement(ds_react_1.Heading, { spacing: true, size: "large", level: "1" }, labels.modalTitle)),
                formRenderer({
                    onSubmit: handleOnSubmit,
                    onCancel: resetModal,
                    item: modalState.selectedItem,
                    allItems: items,
                }))),
        react_1.default.createElement(SkjemagruppeQuestion_1.default, { legend: showListTitle ? labels.listTitle : undefined, error: error },
            items.length > 0 && (react_1.default.createElement("div", { className: "modalFormAndList__listWrapper" }, listRenderer({ items, onEdit: handleEdit, onDelete: handleDelete }))),
            items.length === 0 && labels.emptyListText && (react_1.default.createElement("div", { style: { paddingBottom: '2rem' } },
                react_1.default.createElement(ds_react_1.Alert, { variant: "info" }, labels.emptyListText))),
            (maxItems === undefined || maxItems > items.length) && (react_1.default.createElement("div", { style: showListTitle ? { marginTop: '1rem' } : undefined, className: 'modalFormAndList__addButton' },
                react_1.default.createElement(ds_react_1.Button, { type: "button", onClick: () => setModalState({ isVisible: true }), size: "small", variant: "secondary" }, labels.addLabel))))));
}
exports.default = ModalFormAndList;
