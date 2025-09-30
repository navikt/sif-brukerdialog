import { useEffectOnce } from '@navikt/sif-common-hooks';

export const useSkyraReloader = () => {
    useEffectOnce(() => {
        // Sjekk om Skyra eksisterer og kall reload
        const skyra = (window as any).skyra;
        if (skyra?.reload) {
            skyra.reload();
        }
    });
};
