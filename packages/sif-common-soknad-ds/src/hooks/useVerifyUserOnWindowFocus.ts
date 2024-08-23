import { useEffect } from 'react';
import { ApplikasjonHendelse, useAmplitudeInstance } from '@navikt/sif-common-amplitude';

export const useVerifyUserOnWindowFocus = (userId: string, getUserId: () => Promise<string>) => {
    const { logHendelse } = useAmplitudeInstance();
    useEffect(() => {
        const handleFocus = async () => {
            const id = await getUserId();
            if (id !== userId) {
                await logHendelse(ApplikasjonHendelse.innloggetBrukerErEndret);
                window.location.reload();
            }
        };
        window.addEventListener('focus', handleFocus);
        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, []);
};
