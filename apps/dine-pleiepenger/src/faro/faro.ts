import { Faro, getWebInstrumentations, initializeFaro, LogLevel } from '@grafana/faro-web-sdk';
import nais from '../../nais.js';
import { browserEnv } from '../utils/env';

let faro: Faro | null = null;

export function initInstrumentation(): void {
    if (typeof window === 'undefined' || faro !== null) return;

    getFaro();
}

export function getFaro(): Faro {
    if (faro != null) return faro;
    faro = initializeFaro({
        url: browserEnv.NEXT_PUBLIC_TELEMETRY_URL,
        app: nais.app,
        instrumentations: [
            ...getWebInstrumentations({
                captureConsole: false,
            }),
        ],
    });
    return faro;
}

export function pinoLevelToFaroLevel(pinoLevel: string): LogLevel {
    switch (pinoLevel) {
        case 'trace':
            return LogLevel.TRACE;
        case 'debug':
            return LogLevel.DEBUG;
        case 'info':
            return LogLevel.INFO;
        case 'warn':
            return LogLevel.WARN;
        case 'error':
            return LogLevel.ERROR;
        default:
            throw new Error(`Unknown level: ${pinoLevel}`);
    }
}
