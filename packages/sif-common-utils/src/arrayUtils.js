"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nthItemFilter = void 0;
const nthItemFilter = (index, nth) => nth === 1 || index === 0 || index % nth === 0;
exports.nthItemFilter = nthItemFilter;
