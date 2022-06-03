"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ds_react_1 = require("@navikt/ds-react");
const react_1 = __importDefault(require("react"));
const react_intl_1 = require("react-intl");
const ds_icons_1 = require("@navikt/ds-icons");
const ExpandableInfo_1 = __importDefault(require("../../components/layout/expandable-info/ExpandableInfo"));
const bemUtils_1 = __importDefault(require("../../utils/bemUtils"));
const intlUtils_1 = __importDefault(require("../../utils/intlUtils"));
const PictureScanningExample_1 = __importDefault(require("./PictureScanningExample"));
const ScanningIcon_1 = __importDefault(require("./scanning-icon/ScanningIcon"));
require("./pictureScanningGuide.less");
const bem = (0, bemUtils_1.default)('pictureScanningGuide');
const PictureScanningGuide = () => {
    const intl = (0, react_intl_1.useIntl)();
    const svgIconHeight = 100;
    return (react_1.default.createElement(ExpandableInfo_1.default, { title: (0, intlUtils_1.default)(intl, 'psg.expandable.tittel') },
        react_1.default.createElement("div", { className: bem.block },
            react_1.default.createElement(ds_react_1.Heading, { level: "2", size: "small", spacing: true },
                react_1.default.createElement(react_intl_1.FormattedMessage, { id: "psg.section1.tittel" })),
            react_1.default.createElement(ds_react_1.BodyLong, { as: "div" },
                react_1.default.createElement("ul", null,
                    react_1.default.createElement("li", null,
                        react_1.default.createElement(react_intl_1.FormattedMessage, { id: "psg.section1.liste.1" })),
                    react_1.default.createElement("li", null,
                        react_1.default.createElement(react_intl_1.FormattedMessage, { id: "psg.section1.liste.2" })),
                    react_1.default.createElement("li", null,
                        react_1.default.createElement(react_intl_1.FormattedMessage, { id: "psg.section1.liste.3" })))),
            react_1.default.createElement("div", { className: "mt-8" },
                react_1.default.createElement(ds_react_1.Heading, { level: "3", size: "xsmall", spacing: true },
                    react_1.default.createElement(react_intl_1.FormattedMessage, { id: "psg.section2.tittel" })),
                react_1.default.createElement("ul", null,
                    react_1.default.createElement("li", null,
                        react_1.default.createElement(react_intl_1.FormattedMessage, { id: "psg.section2.liste.1" })),
                    react_1.default.createElement("li", null,
                        react_1.default.createElement(react_intl_1.FormattedMessage, { id: "psg.section2.liste.2" })),
                    react_1.default.createElement("li", null,
                        react_1.default.createElement(react_intl_1.FormattedMessage, { id: "psg.section2.liste.3" })))),
            react_1.default.createElement("div", { className: "mt-8" },
                react_1.default.createElement(ds_react_1.Heading, { level: "3", size: "xsmall", spacing: true },
                    react_1.default.createElement(react_intl_1.FormattedMessage, { id: "psg.icon.heading" })),
                react_1.default.createElement("div", { className: bem.element('body') },
                    react_1.default.createElement("div", { className: bem.element('cell') },
                        react_1.default.createElement(PictureScanningExample_1.default, { image: react_1.default.createElement(ScanningIcon_1.default, { status: "good", height: svgIconHeight }), status: "suksess", statusText: (0, intlUtils_1.default)(intl, 'psg.good'), description: (0, intlUtils_1.default)(intl, 'psg.icon.label.good') })),
                    react_1.default.createElement("div", { className: bem.element('cell') },
                        react_1.default.createElement(PictureScanningExample_1.default, { image: react_1.default.createElement(ScanningIcon_1.default, { status: "keystone", height: svgIconHeight }), status: "feil", statusText: (0, intlUtils_1.default)(intl, 'psg.bad'), description: (0, intlUtils_1.default)(intl, 'psg.icon.label.keystone') })),
                    react_1.default.createElement("div", { className: bem.element('cell') },
                        react_1.default.createElement(PictureScanningExample_1.default, { image: react_1.default.createElement(ScanningIcon_1.default, { status: "horizontal", height: svgIconHeight }), status: "feil", statusText: (0, intlUtils_1.default)(intl, 'psg.bad'), description: (0, intlUtils_1.default)(intl, 'psg.icon.label.horizontal') })),
                    react_1.default.createElement("div", { className: bem.element('cell') },
                        react_1.default.createElement(PictureScanningExample_1.default, { image: react_1.default.createElement(ScanningIcon_1.default, { status: "shadow", height: svgIconHeight }), status: "feil", statusText: (0, intlUtils_1.default)(intl, 'psg.bad'), description: (0, intlUtils_1.default)(intl, 'psg.icon.label.shadow') }))),
                react_1.default.createElement(ds_react_1.Link, { target: "_blank", href: (0, intlUtils_1.default)(intl, 'psg.lenkepanel.url') },
                    react_1.default.createElement(react_intl_1.FormattedMessage, { id: "psg.lenkepanel.text" }),
                    react_1.default.createElement(ds_icons_1.ExternalLink, null))))));
};
exports.default = PictureScanningGuide;
