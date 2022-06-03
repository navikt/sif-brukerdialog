"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAmplitudeInstance = exports.AmplitudeProvider = exports.ApiError = exports.ApplikasjonHendelse = exports.AmplitudeEvents = exports.SIFCommonPageKey = void 0;
const react_1 = require("react");
const amplitude_js_1 = __importDefault(require("amplitude-js"));
const constate_1 = __importDefault(require("constate"));
const MAX_AWAIT_TIME = 500;
var SIFCommonPageKey;
(function (SIFCommonPageKey) {
    SIFCommonPageKey["velkommen"] = "velkommen";
    SIFCommonPageKey["kvittering"] = "kvittering";
    SIFCommonPageKey["feilside"] = "feilside";
    SIFCommonPageKey["intro"] = "intro";
    SIFCommonPageKey["ikkeMyndig"] = "ikkeMyndig";
    SIFCommonPageKey["ikkeTilgang"] = "ikkeTilgang";
    SIFCommonPageKey["ikkeTilgjengelig"] = "ikkeTilgjengelig";
})(SIFCommonPageKey = exports.SIFCommonPageKey || (exports.SIFCommonPageKey = {}));
var AmplitudeEvents;
(function (AmplitudeEvents) {
    AmplitudeEvents["sidevisning"] = "sidevisning";
    AmplitudeEvents["applikasjonStartet"] = "applikasjon-startet";
    AmplitudeEvents["s\u00F8knadStartet"] = "skjema startet";
    AmplitudeEvents["s\u00F8knadSendt"] = "skjema fullf\u00F8rt";
    AmplitudeEvents["s\u00F8knadFeilet"] = "skjemainnsending feilet";
    AmplitudeEvents["applikasjonInfo"] = "applikasjon-info";
    AmplitudeEvents["applikasjonHendelse"] = "applikasjon-hendelse";
    AmplitudeEvents["apiError"] = "api-error";
})(AmplitudeEvents = exports.AmplitudeEvents || (exports.AmplitudeEvents = {}));
var ApplikasjonHendelse;
(function (ApplikasjonHendelse) {
    ApplikasjonHendelse["brukerSendesTilLoggInn"] = "brukerSendesTilLoggInn";
    ApplikasjonHendelse["vedleggOpplastingFeilet"] = "vedleggOpplastingFeilet";
    ApplikasjonHendelse["starterMedMellomlagring"] = "starterMedMellomlagring";
    ApplikasjonHendelse["ugyldigMellomlagring"] = "ugyldigMellomlagring";
    ApplikasjonHendelse["avbryt"] = "avbryt";
    ApplikasjonHendelse["fortsettSenere"] = "fortsettSenere";
})(ApplikasjonHendelse = exports.ApplikasjonHendelse || (exports.ApplikasjonHendelse = {}));
var ApiError;
(function (ApiError) {
    ApiError["oppstartsinfo"] = "oppstartsinfo";
    ApiError["s\u00F8kerinfo"] = "s\u00F8kerinfo";
    ApiError["arbeidsgiver"] = "arbeidsgiver";
    ApiError["barn"] = "barn";
    ApiError["vedlegg"] = "vedlegg";
    ApiError["mellomlagring"] = "mellomlagring";
})(ApiError = exports.ApiError || (exports.ApiError = {}));
_a = (0, constate_1.default)((props) => {
    const { applicationKey, isActive = true, maxAwaitTime = MAX_AWAIT_TIME, logToConsoleOnly } = props;
    (0, react_1.useEffect)(() => {
        const instance = amplitude_js_1.default.getInstance();
        if (isActive && instance) {
            instance.init('default', '', {
                apiEndpoint: 'amplitude.nav.no/collect-auto',
                saveEvents: false,
                includeUtm: true,
                includeReferrer: true,
                platform: window.location.toString(),
            });
        }
    }, [isActive]);
    function logEvent(eventName, eventProperties) {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = amplitude_js_1.default.getInstance();
            if (isActive && instance) {
                const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(null), maxAwaitTime));
                const logPromise = new Promise((resolve) => {
                    const eventProps = Object.assign(Object.assign({}, eventProperties), { app: applicationKey, applikasjon: applicationKey });
                    if (logToConsoleOnly) {
                        console.log({ eventName, eventProperties: eventProps });
                        resolve(true);
                    }
                    instance.logEvent(eventName, eventProps, (response) => {
                        resolve(response);
                    });
                });
                return Promise.race([timeoutPromise, logPromise]);
            }
        });
    }
    function setUserProperties(properties) {
        const instance = amplitude_js_1.default.getInstance();
        if (isActive && instance) {
            instance.setUserProperties(properties);
        }
    }
    function logSidevisning(pageKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return logEvent(AmplitudeEvents.sidevisning, {
                pageKey,
            });
        });
    }
    function logSoknadStartet(skjemanavn) {
        return __awaiter(this, void 0, void 0, function* () {
            return logEvent(AmplitudeEvents.søknadStartet, {
                skjemanavn,
                skjemaId: applicationKey,
            });
        });
    }
    function logSoknadSent(skjemanavn) {
        return __awaiter(this, void 0, void 0, function* () {
            return logEvent(AmplitudeEvents.søknadSendt, {
                skjemanavn,
                skjemaId: applicationKey,
            });
        });
    }
    function logSoknadFailed(skjemanavn) {
        return __awaiter(this, void 0, void 0, function* () {
            return logEvent(AmplitudeEvents.søknadFeilet, {
                skjemanavn,
                skjemaId: applicationKey,
            });
        });
    }
    function logHendelse(hendelse, details) {
        return __awaiter(this, void 0, void 0, function* () {
            return logEvent(AmplitudeEvents.applikasjonHendelse, {
                hendelse,
                details,
            });
        });
    }
    function logApiError(error, details) {
        return __awaiter(this, void 0, void 0, function* () {
            return logEvent(AmplitudeEvents.apiError, {
                error,
                details,
            });
        });
    }
    function logInfo(details) {
        return __awaiter(this, void 0, void 0, function* () {
            return logEvent(AmplitudeEvents.applikasjonInfo, details);
        });
    }
    function logUserLoggedOut(info) {
        return __awaiter(this, void 0, void 0, function* () {
            return logEvent(AmplitudeEvents.applikasjonHendelse, {
                hendelse: ApplikasjonHendelse.brukerSendesTilLoggInn,
                info,
            });
        });
    }
    return {
        logEvent,
        logSidevisning,
        setUserProperties,
        logSoknadStartet,
        logSoknadSent,
        logSoknadFailed,
        logHendelse,
        logInfo,
        logApiError,
        logUserLoggedOut,
    };
}), exports.AmplitudeProvider = _a[0], exports.useAmplitudeInstance = _a[1];
