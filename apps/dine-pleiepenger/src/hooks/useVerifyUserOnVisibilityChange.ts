import { ApplikasjonHendelse, useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import * as apiUtils from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { isAxiosError } from 'axios';
import { useEffect } from 'react';

/**
 * Hook som verifiserer at innlogget bruker er den samme når vindu/tab får fokus.
 *
 * @param userId - Fødselsnummer til forventet innlogget bruker
 * @param getUserId - Funksjon som henter fødselsnummer til faktisk innlogget bruker
 * @param visibilityChangeDelaySeconds - Hvis tab har vært skjult lenger enn dette, reloades siden direkte (sikrere)
 */
export const useVerifyUserOnVisibilityChange = (
    userId: string,
    getUserId: () => Promise<string>,
    visibilityChangeDelaySeconds?: number,
) => {
    const { logHendelse } = useAmplitudeInstance();
    useEffect(() => {
        let hiddenTimestamp: number | null = null;

        const verifyUser = async () => {
            try {
                const id = await getUserId();
                if (id !== userId) {
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

        // Når vinduet får fokus (f.eks. bytter mellom vinduer) - kjør brukersjekk
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

        window.addEventListener('focus', handleFocus);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('focus', handleFocus);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [getUserId, logHendelse, userId, visibilityChangeDelaySeconds]);
};
