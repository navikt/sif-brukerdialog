import { useEffect, useState } from 'react';
import { Faro, initializeFaro } from '@grafana/faro-web-sdk';
import constate from 'constate';

interface Props {
    applicationKey: string;
    telemetryCollectorURL?: string;
    appVersion: string;
    isActive?: boolean;
    children: React.ReactNode;
}

const initFaro = (appKey: string, telemetryCollectorURL: string, appVersion?: string) => {
    return initializeFaro({
        url: telemetryCollectorURL,
        app: {
            name: appKey,
            version: appVersion,
        },
    });
};

export const [FaroProvider, useFaroInstance] = constate((props: Props) => {
    const { applicationKey, isActive = true, appVersion, telemetryCollectorURL } = props;

    const [faro, setFaro] = useState<Faro>();

    useEffect(() => {
        if (isActive && telemetryCollectorURL) {
            const _faro = initFaro(applicationKey, telemetryCollectorURL, appVersion);
            setFaro(_faro);
        }
    }, [isActive]);

    const logError = (error: Error) => {
        if (faro) {
            faro.api.pushError(error);
        }
    };

    const logInfo = (info: unknown[]) => {
        if (faro) {
            faro.api.pushLog(info);
        }
    };

    return { logError, logInfo, faro };
});
