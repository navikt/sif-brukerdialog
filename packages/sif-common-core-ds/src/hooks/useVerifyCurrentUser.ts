import { ApplikasjonHendelse, useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import * as apiUtils from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { isAxiosError } from 'axios';
import { useEffect } from 'react';

interface Options {
    /** Hvis tab har vært skjult lenger enn dette, reloades siden direkte (sikrere) */
    visibilityChangeDelaySeconds?: number;
    /** Hvis false, kjøres ingen sjekk når tab blir synlig (kun ved window focus). Default: true */
    visibilityChangeEnabled?: boolean;
    /** Hvis false, kjøres ingen sjekk når vindu får fokus. Default: true */
    focusEnabled?: boolean;
}

/**
 * Hook som verifiserer at innlogget bruker er den samme når vindu/tab får fokus.
 *
 * @param userId - Fødselsnummer til forventet innlogget bruker
 * @param getUserId - Funksjon som henter fødselsnummer til faktisk innlogget bruker
 * @param options - Valgfrie innstillinger
 */
export const useVerifyCurrentUser = (userId: string, getUserId: () => Promise<string>, options?: Options) => {
    const { visibilityChangeDelaySeconds, visibilityChangeEnabled = true, focusEnabled = true } = options || {};
    const { logHendelse } = useAmplitudeInstance();
    useEffect(() => {
        let hiddenTimestamp: number | null = null;

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

        // Når vinduet får fokus - kjør brukersjekk
        const handleFocus = async () => {
            await verifyUser();
        };

        // Når tab-en blir synlig/skjult (f.eks. bytter mellom tabs)
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                // Tab ble skjult - lagre tidspunkt
                hiddenTimestamp = Date.now();
            } else if (document.visibilityState === 'visible') {
                // Tab ble synlig - sjekk om den har vært skjult lenge
                if (visibilityChangeDelaySeconds && hiddenTimestamp) {
                    const hiddenTime = Date.now() - hiddenTimestamp;
                    if (hiddenTime > visibilityChangeDelaySeconds * 1000) {
                        // Tab var skjult lenge - reload direkte (forhindrer at feil brukers data vises)
                        window.location.reload();
                        return;
                    }
                }
                // Tab var skjult kort tid eller ingen delay satt - kjør brukersjekk
                verifyUser();
            }
        };

        // Kun lytt på focus hvis aktivert
        if (focusEnabled) {
            window.addEventListener('focus', handleFocus);
        }

        // Kun lytt på visibilitychange hvis aktivert
        if (visibilityChangeEnabled) {
            document.addEventListener('visibilitychange', handleVisibilityChange);
        }

        return () => {
            if (focusEnabled) {
                window.removeEventListener('focus', handleFocus);
            }
            if (visibilityChangeEnabled) {
                document.removeEventListener('visibilitychange', handleVisibilityChange);
            }
        };
    }, [getUserId, logHendelse, userId, visibilityChangeDelaySeconds, visibilityChangeEnabled]);
};
