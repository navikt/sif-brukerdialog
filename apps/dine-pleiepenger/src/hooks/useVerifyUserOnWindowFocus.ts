import { useEffect } from 'react';
import { ApplikasjonHendelse, useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import * as apiUtils from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { isAxiosError } from 'axios';

export const useVerifyUserOnWindowFocus = (userId: string, getUserId: () => Promise<string>) => {
    const { logHendelse } = useAmplitudeInstance();
    useEffect(() => {
        const handleFocus = async () => {
            try {
                const id = await getUserId();
                if (id !== userId) {
                    await logHendelse(ApplikasjonHendelse.innloggetBrukerErEndret);
                    window.location.reload();
                }
            } catch (error) {
                if (error && isAxiosError(error) && apiUtils.isUnauthorized(error)) {
                    window.location.reload();
                }
            }
        };
        window.addEventListener('focus', handleFocus);
        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, []);
};
