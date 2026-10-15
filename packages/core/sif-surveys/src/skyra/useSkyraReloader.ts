import { useEffectOnce } from '@sif/hooks';

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
