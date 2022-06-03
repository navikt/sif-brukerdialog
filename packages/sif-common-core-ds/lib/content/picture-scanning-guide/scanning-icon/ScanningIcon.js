"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const GoodScanning = ({ title, height }) => {
    return (react_1.default.createElement("svg", { role: "presentation", focusable: "false", viewBox: "0 0 83 121", height: height },
        title && react_1.default.createElement("title", null, title),
        react_1.default.createElement("defs", null,
            react_1.default.createElement("filter", { x: "-10.6%", y: "-5.4%", width: "121.2%", height: "115.1%", filterUnits: "objectBoundingBox", id: "good_1__a" },
                react_1.default.createElement("feOffset", { dy: 2, in: "SourceAlpha", result: "shadowOffsetOuter1" }),
                react_1.default.createElement("feGaussianBlur", { stdDeviation: 2, in: "shadowOffsetOuter1", result: "shadowBlurOuter1" }),
                react_1.default.createElement("feColorMatrix", { values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0", in: "shadowBlurOuter1" })),
            react_1.default.createElement("path", { id: "good_1__b", d: "M8 11h66v93H8z" })),
        react_1.default.createElement("g", { fill: "none", fillRule: "evenodd" },
            react_1.default.createElement("path", { d: "M1 1h81v119H1z", fill: "#BABABA", stroke: "#000", strokeOpacity: 0.85, strokeWidth: 2 }),
            react_1.default.createElement("use", { fill: "#000", filter: "url(#good_1__a)", xlinkHref: "#good_1__b" }),
            react_1.default.createElement("use", { fill: "#FFF", xlinkHref: "#good_1__b" }),
            react_1.default.createElement("g", { stroke: "#B7B4B4", strokeLinecap: "square", strokeWidth: 2 },
                react_1.default.createElement("path", { d: "M15.5 30.5h53M15.5 44.5h50M15.5 23.5h45M15.5 37.5h43" })),
            react_1.default.createElement("g", { stroke: "#B7B4B4", strokeLinecap: "square", strokeWidth: 2 },
                react_1.default.createElement("path", { d: "M15.5 77.5h41M15.5 63.5h50M15.5 84.5h45M15.5 70.5h43" })))));
};
const KeystoneScanning = ({ title, height }) => {
    return (react_1.default.createElement("svg", { role: "presentation", focusable: "false", viewBox: "0 0 83 121", height: height },
        title && react_1.default.createElement("title", null, title),
        react_1.default.createElement("desc", null, "Bildet er ikke tatt ovenfra"),
        react_1.default.createElement("defs", null,
            react_1.default.createElement("filter", { x: "-9.7%", y: "-7.2%", width: "119.4%", height: "120.3%", filterUnits: "objectBoundingBox", id: "keystone_2__a" },
                react_1.default.createElement("feOffset", { dy: 2, in: "SourceAlpha", result: "shadowOffsetOuter1" }),
                react_1.default.createElement("feGaussianBlur", { stdDeviation: 2, in: "shadowOffsetOuter1", result: "shadowBlurOuter1" }),
                react_1.default.createElement("feColorMatrix", { values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0", in: "shadowBlurOuter1" })),
            react_1.default.createElement("path", { id: "keystone_2__b", d: "M16.528 20h49.06L78 89H6z" })),
        react_1.default.createElement("g", { fill: "none", fillRule: "evenodd" },
            react_1.default.createElement("path", { d: "M1 1h81v119H1z", fill: "#BABABA", stroke: "#000", strokeOpacity: 0.85, strokeWidth: 2 }),
            react_1.default.createElement("use", { fill: "#000", filter: "url(#keystone_2__a)", xlinkHref: "#keystone_2__b" }),
            react_1.default.createElement("use", { fill: "#FFF", xlinkHref: "#keystone_2__b" }),
            react_1.default.createElement("g", { stroke: "#B7B4B4", strokeLinecap: "square", strokeWidth: 2 },
                react_1.default.createElement("path", { d: "M20 41.5h37M21 35.5h39M22 29.5h36M19 47.5h43" })),
            react_1.default.createElement("g", { stroke: "#B7B4B4", strokeLinecap: "square", strokeWidth: 2 },
                react_1.default.createElement("path", { d: "M15 70.5h48M16 64.5h45M17 58.5h38M14 76.5h45" })))));
};
const HorizontalScanning = ({ title, height }) => {
    return (react_1.default.createElement("svg", { role: "presentation", focusable: "false", viewBox: "0 0 83 121", height: height },
        title && react_1.default.createElement("title", null, title),
        react_1.default.createElement("desc", null, "Bildet har ikke riktig retning"),
        react_1.default.createElement("defs", null,
            react_1.default.createElement("filter", { x: "-10.6%", y: "-11.1%", width: "121.2%", height: "131.1%", filterUnits: "objectBoundingBox", id: "horizontal_3__a" },
                react_1.default.createElement("feOffset", { dy: 2, in: "SourceAlpha", result: "shadowOffsetOuter1" }),
                react_1.default.createElement("feGaussianBlur", { stdDeviation: 2, in: "shadowOffsetOuter1", result: "shadowBlurOuter1" }),
                react_1.default.createElement("feColorMatrix", { values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0", in: "shadowBlurOuter1" })),
            react_1.default.createElement("path", { id: "horizontal_3__b", d: "M8 36h66v45H8z" })),
        react_1.default.createElement("g", { fill: "none", fillRule: "evenodd" },
            react_1.default.createElement("path", { d: "M1 1h81v119H1z", fill: "#BABABA", stroke: "#000", strokeOpacity: 0.85, strokeWidth: 2 }),
            react_1.default.createElement("use", { fill: "#000", filter: "url(#horizontal_3__a)", xlinkHref: "#horizontal_3__b" }),
            react_1.default.createElement("use", { fill: "#FFF", xlinkHref: "#horizontal_3__b" }),
            react_1.default.createElement("path", { stroke: "#B7B4B4", strokeWidth: 2, strokeLinecap: "square", d: "M35 44v28M30 44v22M25 44v19M20 44v24M52 44v24M57 44v30M47 44v27M62 44v26" }))));
};
const ShadowScanning = ({ title, height }) => {
    return (react_1.default.createElement("svg", { role: "presentation", focusable: "false", viewBox: "0 0 83 121", height: height },
        title && react_1.default.createElement("title", null, title),
        react_1.default.createElement("desc", null, "Bildet har har skygge opp\u00E5 legeerkl\u00E6ring"),
        react_1.default.createElement("defs", null,
            react_1.default.createElement("filter", { x: "-10%", y: "-5.2%", width: "120%", height: "114.6%", filterUnits: "objectBoundingBox", id: "shadow_4__a" },
                react_1.default.createElement("feOffset", { dy: 2, in: "SourceAlpha", result: "shadowOffsetOuter1" }),
                react_1.default.createElement("feGaussianBlur", { stdDeviation: 2, in: "shadowOffsetOuter1", result: "shadowBlurOuter1" }),
                react_1.default.createElement("feColorMatrix", { values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0", in: "shadowBlurOuter1" })),
            react_1.default.createElement("path", { id: "shadow_4__b", d: "M6 12h70v96H6z" })),
        react_1.default.createElement("g", { fill: "none", fillRule: "evenodd" },
            react_1.default.createElement("path", { strokeOpacity: 0.85, stroke: "#000", strokeWidth: 2, fill: "#BABABA", d: "M1 1h81v119H1z" }),
            react_1.default.createElement("g", { transform: "translate(1 1)" },
                react_1.default.createElement("use", { fill: "#000", filter: "url(#shadow_4__a)", xlinkHref: "#shadow_4__b" }),
                react_1.default.createElement("use", { fill: "#FFF", xlinkHref: "#shadow_4__b" })),
            react_1.default.createElement("g", { stroke: "#B7B4B4", strokeLinecap: "square", strokeWidth: 2 },
                react_1.default.createElement("path", { d: "M15.5 30.5h53M15.5 44.5h50M15.5 23.5h45M15.5 37.5h43" })),
            react_1.default.createElement("g", { stroke: "#B7B4B4", strokeLinecap: "square", strokeWidth: 2 },
                react_1.default.createElement("path", { d: "M15.5 77.5h41M15.5 63.5h50M15.5 84.5h45M15.5 70.5h43" })),
            react_1.default.createElement("path", { d: "M53.57 120C65.186 86.185 63.996 65.163 50 56.935 29.004 44.593 1 69.565 1 90v30h52.57z", fillOpacity: 0.3, fill: "#7C7C7C" }))));
};
const ScanningIkon = (props) => {
    const { height = 100, title } = props;
    switch (props.status) {
        case 'good':
            return react_1.default.createElement(GoodScanning, { title: title, height: height });
        case 'keystone':
            return react_1.default.createElement(KeystoneScanning, { title: title, height: height });
        case 'horizontal':
            return react_1.default.createElement(HorizontalScanning, { title: title, height: height });
        case 'shadow':
            return react_1.default.createElement(ShadowScanning, { title: title, height: height });
        default:
            return react_1.default.createElement(GoodScanning, { title: title, height: height });
    }
};
exports.default = ScanningIkon;
