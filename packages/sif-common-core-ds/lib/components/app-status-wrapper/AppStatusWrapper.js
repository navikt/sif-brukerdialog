"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appstatus_react_ds_1 = require("@navikt/appstatus-react-ds");
const react_1 = __importDefault(require("react"));
const LoadingSpinner_1 = __importDefault(require("../atoms/loading-spinner/LoadingSpinner"));
const AppStatusWrapper = ({ applicationKey, contentRenderer, sanityConfig, unavailableContentRenderer }) => {
    const { status, message, isLoading } = (0, appstatus_react_ds_1.useAppStatus)(applicationKey, sanityConfig);
    const renderContent = () => {
        if (status === appstatus_react_ds_1.Status.unavailable && unavailableContentRenderer !== undefined) {
            return unavailableContentRenderer();
        }
        return contentRenderer();
    };
    return isLoading ? (react_1.default.createElement("div", { style: { display: 'flex', justifyContent: 'center', minHeight: '15rem', alignItems: 'center' } },
        react_1.default.createElement(LoadingSpinner_1.default, { type: "XXL" }))) : (react_1.default.createElement(react_1.default.Fragment, null,
        message !== undefined && (react_1.default.createElement("div", { style: { maxWidth: '704px', margin: '1rem auto' } },
            react_1.default.createElement(appstatus_react_ds_1.StatusMessage, { message: message }))),
        renderContent()));
};
exports.default = AppStatusWrapper;
