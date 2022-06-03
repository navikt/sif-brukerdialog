"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateYesOrNoError = void 0;
const types_1 = require("../types");
var ValidateYesOrNoError;
(function (ValidateYesOrNoError) {
    ValidateYesOrNoError["yesOrNoIsUnanswered"] = "yesOrNoIsUnanswered";
})(ValidateYesOrNoError = exports.ValidateYesOrNoError || (exports.ValidateYesOrNoError = {}));
const getYesOrNoValidator = () => (value) => {
    const isAnswered = value === types_1.YesOrNo.YES || value === types_1.YesOrNo.NO;
    return isAnswered ? undefined : ValidateYesOrNoError.yesOrNoIsUnanswered;
};
exports.default = getYesOrNoValidator;
