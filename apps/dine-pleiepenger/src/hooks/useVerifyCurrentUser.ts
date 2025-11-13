import { ApplikasjonHendelse, useAmplitudeInstance } from '@navikt/sif-common-amplitude';
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
    const { logHendelse } = useAmplitudeInstance();

    useEffect(() => {
        const focusConfig = { enabled: true, throttleSeconds: 30, ...options?.focus };
        const visibilityConfig = { enabled: true, throttleSeconds: 30, ...options?.visibilityChange };

        const now = Date.now();
        let hiddenTimestamp: number | undefined;
        let lastFocusCheckTimestamp = now;
        let lastVisibilityCheckTimestamp = now;

        // Hjelpefunksjon for å sjekke om throttle-perioden har gått
        const shouldThrottle = (lastCheck: number, throttleSeconds: number): boolean => {
            return Date.now() - lastCheck < throttleSeconds * 1000;
        };

        // Sjekker at innlogget bruker fortsatt er samme bruker. Hvis ikke reloades siden.
        const verifyUser = async () => {
            try {
                const id = await getUserId();
                if (id !== userId) {
                    // Denne er ikke i bruk i alle miljøer, og er dermed ikke alltid tilgjengelig
                    if (logHendelse) {
                        await logHendelse(ApplikasjonHendelse.innloggetBrukerErEndret);
                    }
                    window.location.reload();
                }
            } catch (error) {
                if (error && isAxiosError(error) && apiUtils.isUnauthorized(error)) {
                    window.location.reload();
                }
            }
        };

        // Når vinduet får fokus - kjør brukersjekk (med throttling)
        const handleFocus = async () => {
            if (shouldThrottle(lastFocusCheckTimestamp, focusConfig.throttleSeconds)) {
                return; // Skip - for tidlig siden sist sjekk
            }

            lastFocusCheckTimestamp = Date.now();
            await verifyUser();
        };

        // Når document endrer visibilityState (f.eks. bytter mellom tabs)
        const handleVisibilityChange = async () => {
            if (document.visibilityState === 'hidden') {
                // Tab ble skjult - lagre tidspunkt
                hiddenTimestamp = Date.now();
            } else if (document.visibilityState === 'visible') {
                // Tab ble synlig - sjekk om den har vært skjult lenge
                if (visibilityConfig.reloadAfterHiddenSeconds && hiddenTimestamp) {
                    const hiddenTime = Date.now() - hiddenTimestamp;
                    if (hiddenTime > visibilityConfig.reloadAfterHiddenSeconds * 1000) {
                        // Tab var skjult lenge - reload direkte (forhindrer at feil brukers data vises)
                        window.location.reload();
                        return;
                    }
                }

                // Throttling: Sjekk om det har gått nok tid siden sist sjekk
                if (shouldThrottle(lastVisibilityCheckTimestamp, visibilityConfig.throttleSeconds)) {
                    return; // Skip - for tidlig siden sist sjekk
                }

                lastVisibilityCheckTimestamp = Date.now();
                await verifyUser();
            }
        };

        // Kun lytt på focus hvis aktivert
        if (focusConfig.enabled) {
            window.addEventListener('focus', handleFocus);
        }

        // Kun lytt på visibilitychange hvis aktivert
        if (visibilityConfig.enabled) {
            document.addEventListener('visibilitychange', handleVisibilityChange);
        }

        return () => {
            if (focusConfig.enabled) {
                window.removeEventListener('focus', handleFocus);
            }
            if (visibilityConfig.enabled) {
                document.removeEventListener('visibilitychange', handleVisibilityChange);
            }
        };
    }, [getUserId, logHendelse, userId, options]);
};
