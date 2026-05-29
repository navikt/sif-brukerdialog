import { useEffectOnce } from '@navikt/sif-common-hooks';

export const useSkyraReloader = () => {
    useEffectOnce(() => {
        setTimeout(() => {
            const skyra = (globalThis as any).skyra;
            if (skyra?.reload) {
                skyra.reload();
            }
        }, 2000);
    });
};
