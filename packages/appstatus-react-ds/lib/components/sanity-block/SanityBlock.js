"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var ds_react_1 = require("@navikt/ds-react");
var react_1 = require("@portabletext/react");
var SanityBlock = function (_a) {
    var content = _a.content;
    return ((0, jsx_runtime_1.jsx)(react_1.PortableText, { value: content, components: {
            marks: {
                link: function (_a) {
                    var children = _a.children, value = _a.value;
                    return (0, jsx_runtime_1.jsx)(ds_react_1.Link, __assign({ href: value.href }, { children: children }));
                },
            },
            block: {
                title: function (_a) {
                    var children = _a.children;
                    return ((0, jsx_runtime_1.jsx)(ds_react_1.Heading, __assign({ level: "3", size: "medium", spacing: true }, { children: children })));
                },
                ingress: function (_a) {
                    var children = _a.children;
                    return (0, jsx_runtime_1.jsx)(ds_react_1.Ingress, { children: children });
                },
            },
        } }));
};
exports.default = SanityBlock;
