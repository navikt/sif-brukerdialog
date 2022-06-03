"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTextFieldWidthClassName = void 0;
const getTextFieldWidthClassName = (width, otherClassName) => {
    const allClassNames = [];
    if (width) {
        allClassNames.push(`formikTextField--${width}`);
    }
    if (otherClassName) {
        allClassNames.push(otherClassName);
    }
    return allClassNames.length > 0 ? allClassNames.join(' ') : undefined;
};
exports.getTextFieldWidthClassName = getTextFieldWidthClassName;
