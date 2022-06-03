"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ds_react_1 = require("@navikt/ds-react");
const react_1 = __importDefault(require("react"));
const getBannerSizeClass = (size) => {
    switch (size) {
        case 'small':
            return 'min-h-[3.5rem]';
        case 'large':
            return 'min-h-[8rem]';
        case 'xlarge':
            return 'min-h-[12rem]';
    }
};
const PageBanner = (_a) => {
    var { level = '2', size = 'small' } = _a, rest = __rest(_a, ["level", "size"]);
    return (react_1.default.createElement("div", { className: `bg-purple-200 flex items-center justify-center text-center p-1 sm:p-2 md:p-4 ${getBannerSizeClass(size)}` },
        react_1.default.createElement(ds_react_1.Heading, Object.assign({ level: level }, rest, { size: "medium" }))));
};
exports.default = PageBanner;
