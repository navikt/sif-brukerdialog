import { ApplikasjonHendelse, useAnalyticsInstance } from '@navikt/sif-common-analytics';
import * as apiUtils from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { isAxiosError } from 'axios';
import { useEffect } from 'react';

interface Options {
    /** Innstillinger for window focus event */
    focus?: {
        /** Hvis false, kjøres ingen sjekk når vindu får fokus. Default: true */
        enabled?: boolean;
        /** Minimum antall sekunder mellom hver brukersjekk (throttling). Default: 30 */
        throttleSeconds?: number;
    };
    /** Innstillinger for tab visibility change event */
    visibilityChange?: {
        /** Hvis false, kjøres ingen sjekk når tab blir synlig. Default: true */
        enabled?: boolean;
        /** Antall sekunder tab må ha vært skjult før siden reloades direkte (istedenfor brukersjekk) */
        reloadAfterHiddenSeconds?: number;
        /** Minimum antall sekunder mellom hver brukersjekk (throttling). Default: 30 */
        throttleSeconds?: number;
    };
}

/**
 * Hook som verifiserer at innlogget bruker er den samme når vindu/tab får fokus.
 *
 * @param userId - Fødselsnummer til forventet innlogget bruker
 * @param getUserId - Funksjon som henter fødselsnummer til faktisk innlogget bruker
 * @param options - Valgfrie innstillinger
 */
export const useVerifyCurrentUser = (userId: string, getUserId: () => Promise<string>, options?: Options) => {
    const { logHendelse } = useAnalyticsInstance();
    const focusConfig = { enabled: true, throttleSeconds: 30, ...options?.focus };
    const visibilityConfig = { enabled: true, throttleSeconds: 30, ...options?.visibilityChange };

    useEffect(() => {
        let mounted = true;

        let hiddenTimestamp: number | undefined;
        let lastUserCheckTimestamp = Date.now();

        const isThrottled = (throttleSeconds: number): boolean => {
            return Date.now() - lastUserCheckTimestamp < throttleSeconds * 1000;
        };

        const verifyUser = async () => {
            lastUserCheckTimestamp = Date.now();
            try {
                const id = await getUserId();
                if (!mounted) return;
                if (id !== userId) {
                    if (logHendelse) {
                        await logHendelse(ApplikasjonHendelse.innloggetBrukerErEndret);
                    }
                    window.location.reload();
                }
            } catch (error) {
                if (!mounted) return;
                if (isAxiosError(error) && apiUtils.isUnauthorized(error)) {
                    window.location.reload();
                }
            }
        };

        const handleFocus = async () => {
            if (isThrottled(focusConfig.throttleSeconds)) {
                return;
            }
            await verifyUser();
        };

        const handleVisibilityChange = async () => {
            if (document.visibilityState === 'hidden') {
                hiddenTimestamp = Date.now();
            } else if (document.visibilityState === 'visible') {
                if (visibilityConfig.reloadAfterHiddenSeconds && hiddenTimestamp) {
                    const hiddenTime = Date.now() - hiddenTimestamp;
                    const threshold = Math.max(5, visibilityConfig.reloadAfterHiddenSeconds);
                    if (hiddenTime > threshold * 1000) {
                        window.location.reload();
                        return;
                    }
                }
                if (isThrottled(visibilityConfig.throttleSeconds)) {
                    return;
                }
                await verifyUser();
            }
        };

        if (focusConfig.enabled) {
            window.addEventListener('focus', handleFocus);
        }

        if (visibilityConfig.enabled) {
            document.addEventListener('visibilitychange', handleVisibilityChange);
        }

        return () => {
            mounted = false;
            if (focusConfig.enabled) {
                window.removeEventListener('focus', handleFocus);
            }
            if (visibilityConfig.enabled) {
                document.removeEventListener('visibilitychange', handleVisibilityChange);
            }
        };
    }, [
        getUserId,
        logHendelse,
        userId,
        focusConfig.enabled,
        focusConfig.throttleSeconds,
        visibilityConfig.enabled,
        visibilityConfig.throttleSeconds,
        visibilityConfig.reloadAfterHiddenSeconds,
    ]);
};
