"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidLocaleStringObject = exports.isValidLocaleObject = exports.sanityDefaultLocale = exports.SanityMessageType = exports.ApplicationInheritTeamStatus = exports.Status = void 0;
var Status;
(function (Status) {
    Status["normal"] = "normal";
    Status["unavailable"] = "unavailable";
})(Status = exports.Status || (exports.Status = {}));
var ApplicationInheritTeamStatus;
(function (ApplicationInheritTeamStatus) {
    ApplicationInheritTeamStatus["team"] = "team";
})(ApplicationInheritTeamStatus = exports.ApplicationInheritTeamStatus || (exports.ApplicationInheritTeamStatus = {}));
var SanityMessageType;
(function (SanityMessageType) {
    SanityMessageType["info"] = "info";
    SanityMessageType["warning"] = "warning";
    SanityMessageType["error"] = "error";
})(SanityMessageType = exports.SanityMessageType || (exports.SanityMessageType = {}));
exports.sanityDefaultLocale = 'nb';
var isValidLocaleObject = function (obj) {
    return obj !== undefined && obj[exports.sanityDefaultLocale] !== undefined;
};
exports.isValidLocaleObject = isValidLocaleObject;
var isValidLocaleStringObject = function (obj) {
    return obj !== undefined && obj[exports.sanityDefaultLocale] !== undefined && typeof obj[exports.sanityDefaultLocale] === 'string';
};
exports.isValidLocaleStringObject = isValidLocaleStringObject;
