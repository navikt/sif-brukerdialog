import { useEffectOnce } from '@navikt/sif-common-hooks';

export const useSkyraReloader = () => {
    useEffectOnce(() => {
        // Sjekk om Skyra eksisterer og kall reload
        setTimeout(() => {
            const skyra = (globalThis as any).skyra;
            if (skyra?.reload) {
                skyra.reload();
            }
        }, 2000);
    });
};
