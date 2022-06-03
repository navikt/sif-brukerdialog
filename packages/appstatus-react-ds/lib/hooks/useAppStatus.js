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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var types_1 = require("../types");
var useGetApplicationStatus_1 = __importDefault(require("./useGetApplicationStatus"));
var useGetTeamStatus_1 = __importDefault(require("./useGetTeamStatus"));
var utils_1 = require("../utils");
var defaultState = {
    status: types_1.Status.normal,
    message: undefined,
};
var getStateForApplication = function (appStatus, appMessage, teamStatus, teamMessage) {
    if (appStatus !== types_1.ApplicationInheritTeamStatus.team) {
        return {
            status: appStatus,
            message: appMessage || teamMessage,
        };
    }
    if (appStatus === types_1.ApplicationInheritTeamStatus.team && teamStatus !== undefined) {
        return {
            status: teamStatus,
            message: appMessage || teamMessage,
        };
    }
    return defaultState;
};
function useAppStatus(applicationKey, sanityConfig) {
    var _a = (0, react_1.useState)(defaultState), state = _a[0], setState = _a[1];
    var config = (0, react_1.useState)(sanityConfig)[0];
    var _b = (0, useGetApplicationStatus_1.default)(applicationKey, config), appStatus = _b.status, appMessage = _b.message, appTeam = _b.team, appIsLoading = _b.isLoading, appError = _b.error;
    var _c = (0, useGetTeamStatus_1.default)(appTeam, config), teamStatus = _c.status, teamMessage = _c.message, teamIsLoading = _c.isLoading, teamError = _c.error;
    var _d = (0, react_1.useState)(appIsLoading || teamIsLoading), isLoading = _d[0], setIsLoading = _d[1];
    var _e = (0, react_1.useState)(appError || teamError), error = _e[0], setError = _e[1];
    (0, react_1.useEffect)(function () {
        if (!(0, utils_1.sanityConfigIsValid)(config)) {
            setIsLoading(false);
            return;
        }
        setIsLoading(appIsLoading || teamIsLoading);
        setState(getStateForApplication(appStatus, appMessage, teamStatus, teamMessage));
    }, [appStatus, appMessage, appTeam, teamMessage, teamStatus, appIsLoading, teamIsLoading, config]);
    (0, react_1.useEffect)(function () {
        setError(appError || teamError);
    }, [appError, teamError]);
    return __assign(__assign({}, state), { isLoading: isLoading, error: error });
}
exports.default = useAppStatus;
