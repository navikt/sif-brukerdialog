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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var types_1 = require("../types");
var utils_1 = require("../utils");
var sanityClient_1 = require("../utils/sanityClient");
var usePrevious_1 = require("./usePrevious");
var getApplicationDocumentStatusQuery = function (key, team) {
    var teamQuery = team ? "team->.key == \"".concat(team, "\"") : '';
    return "*[_type == 'application' && key == \"".concat(key, "\"").concat(teamQuery, "]{\n        key,\n        applicationStatus,\n        message,\n        liveUpdate,\n        name,\n        team->{key}\n      }");
};
var defaultState = {
    status: types_1.Status.normal,
    message: undefined,
};
function useGetApplicationStatus(applicationKey, sanityConfig) {
    var _a = (0, react_1.useState)(defaultState), state = _a[0], setState = _a[1];
    var _b = (0, react_1.useState)(), application = _b[0], setApplication = _b[1];
    var _c = (0, react_1.useState)(), applicationTeam = _c[0], setApplicationTeam = _c[1];
    var _d = (0, react_1.useState)(), liveUpdate = _d[0], setLiveUpdate = _d[1];
    var _e = (0, react_1.useState)(true), isLoading = _e[0], setIsLoading = _e[1];
    var _f = (0, react_1.useState)(), error = _f[0], setError = _f[1];
    var subscription = (0, react_1.useRef)();
    function fetch(key, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var result, appResult, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        setIsLoading(true);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, 4, 5]);
                        return [4, (0, sanityClient_1.getAppSanityClient)(config).fetch(getApplicationDocumentStatusQuery(key))];
                    case 2:
                        result = _b.sent();
                        if (result.length === 1) {
                            appResult = result[0];
                            setApplication(appResult);
                            setApplicationTeam((_a = appResult.team) === null || _a === void 0 ? void 0 : _a.key);
                            setLiveUpdate(appResult.liveUpdate === true);
                        }
                        return [3, 5];
                    case 3:
                        error_1 = _b.sent();
                        setError(error_1);
                        setApplication(undefined);
                        setApplicationTeam(undefined);
                        setLiveUpdate(false);
                        return [3, 5];
                    case 4:
                        setIsLoading(false);
                        return [7];
                    case 5: return [2];
                }
            });
        });
    }
    var startSubscription = function (key, config) {
        subscription.current = (0, sanityClient_1.getAppSanityClient)(config)
            .listen(getApplicationDocumentStatusQuery(key))
            .subscribe(function (_a) {
            var result = _a.result;
            var appResult = result;
            setApplication(appResult);
        });
    };
    var prevApplicationKey = (0, usePrevious_1.usePrevious)(applicationKey);
    var prevLiveUpdate = (0, usePrevious_1.usePrevious)(liveUpdate);
    var stopSubscription = function () {
        if (subscription.current && subscription.current.unsubscribe) {
            subscription.current.unsubscribe();
        }
    };
    (0, react_1.useEffect)(function () {
        if (!(0, utils_1.sanityConfigIsValid)(sanityConfig)) {
            setIsLoading(false);
            return;
        }
        if (error) {
            setLiveUpdate(false);
            return;
        }
        if (applicationKey && applicationKey !== prevApplicationKey) {
            fetch(applicationKey, sanityConfig);
        }
        if (applicationKey === undefined) {
            setLiveUpdate(false);
        }
    }, [applicationKey, prevApplicationKey, error, sanityConfig]);
    (0, react_1.useEffect)(function () {
        if (applicationKey &&
            (prevLiveUpdate !== liveUpdate || (applicationKey && applicationKey !== prevApplicationKey))) {
            if (liveUpdate === true) {
                if (!subscription.current) {
                    startSubscription(applicationKey, sanityConfig);
                }
                else {
                    stopSubscription();
                    startSubscription(applicationKey, sanityConfig);
                }
            }
            else {
                stopSubscription();
            }
        }
    }, [liveUpdate, prevLiveUpdate, applicationKey, prevApplicationKey, sanityConfig]);
    (0, react_1.useEffect)(function () {
        if (application) {
            setState({
                status: application.applicationStatus.status,
                message: (0, utils_1.getMessage)(application.message),
            });
        }
    }, [application]);
    return __assign(__assign({}, state), { team: applicationTeam, isLoading: isLoading, error: error });
}
exports.default = useGetApplicationStatus;
