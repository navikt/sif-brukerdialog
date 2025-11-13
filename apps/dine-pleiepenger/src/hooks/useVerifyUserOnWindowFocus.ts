import { ApplikasjonHendelse, useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import * as apiUtils from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { isAxiosError } from 'axios';
import { useEffect } from 'react';

export const useVerifyUserOnWindowFocus = (
    userId: string,
    getUserId: () => Promise<string>,
    useDelay: boolean = false,
) => {
    const { logHendelse } = useAmplitudeInstance();
    useEffect(() => {
        let hiddenTimestamp: number | null = null;

        const handleFocus = async () => {
            // Sjekk kun hvis vinduet har vært skjult i minst 20 sekunder (hvis delay er aktivert)
            if (useDelay && hiddenTimestamp && Date.now() - hiddenTimestamp < 20000) {
                return;
            }

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

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                hiddenTimestamp = Date.now();
            } else if (document.visibilityState === 'visible') {
                handleFocus();
            }
        };

        window.addEventListener('focus', handleFocus);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('focus', handleFocus);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [getUserId, logHendelse, userId, useDelay]);
};
