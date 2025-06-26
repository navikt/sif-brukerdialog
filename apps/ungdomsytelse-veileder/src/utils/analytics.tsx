import { Helmet } from 'react-helmet';
import { ApiError } from '@navikt/ung-common';
import constate from 'constate';

const MAX_AWAIT_TIME = 500;

export enum AnalyticsEvents {
    'apiError' = 'api-error',
}

interface Props {
    applicationKey: string;
    logToConsoleOnly?: boolean;
    isActive?: boolean;
    children: React.ReactNode;
    maxAwaitTime?: number;
}

type EventProperties = {
    [key: string]: any;
};

export const registerAnalytics = () => {
    return (
        <Helmet>
            <script
                defer
                src="https://cdn.nav.no/team-researchops/sporing/sporing.js"
                data-host-url="https://umami.nav.no"
                data-auto-track="true"
                data-website-id="a9f8b8e4-a401-47ad-93c4-df596c00bed6"></script>

            <script
                defer
                src="https://cdn.nav.no/team-researchops/sporing/sporing.js"
                data-host-url="https://umami.nav.no"
                data-domains="localhost"
                data-auto-track="false"
                data-website-id="a9f8b8e4-a401-47ad-93c4-df596c00bed6"></script>
        </Helmet>
    );
};

export const [AnalyticsProvider, useAnalyticsInstance] = constate((props: Props) => {
    const { applicationKey, isActive = true, maxAwaitTime = MAX_AWAIT_TIME, logToConsoleOnly } = props;

    async function logEvent(eventName: string, eventProperties?: EventProperties) {
        const umamiTracker = (window as any).umami;
        if (isActive && umamiTracker) {
            const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(null), maxAwaitTime));
            const logPromise = new Promise((resolve) => {
                const eventProps = { ...eventProperties, applikasjon: applicationKey };
                if (logToConsoleOnly) {
                    // eslint-disable-next-line no-console
                    console.log({ eventName, eventProperties: eventProps });
                    resolve(true);
                } else {
                    umamiTracker.track(eventName, eventProps);
                    resolve(true);
                }
            });
            return Promise.race([timeoutPromise, logPromise]);
        }
        return Promise.resolve();
    }

    async function logApiError(error: ApiError, details?: EventProperties) {
        return logEvent(AnalyticsEvents.apiError, {
            error,
            details,
        });
    }

    return {
        logEvent,
        logApiError,
    };
});
