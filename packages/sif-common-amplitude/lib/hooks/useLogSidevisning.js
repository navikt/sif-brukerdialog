"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const amplitude_1 = require("../amplitude");
function useLogSidevisning(pageKey) {
    const { logSidevisning } = (0, amplitude_1.useAmplitudeInstance)();
    const logPage = (0, react_1.useCallback)((key) => {
        logSidevisning(key);
    }, [logSidevisning]);
    (0, react_1.useEffect)(() => {
        logPage(pageKey);
    }, [pageKey, logPage]);
}
exports.default = useLogSidevisning;
