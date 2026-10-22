import { fetchManglendeVedleggIder } from '@navikt/sif-common-api';
import { useEffect, useState } from 'react';

import { Vedlegg } from '../types/Vedlegg';

export const getVedleggIder = (vedlegg: Vedlegg[] = []): string[] =>
    vedlegg.flatMap((v) => (v.info ? [v.info.id] : []));

/**
 * Henter ID-ene til vedlegg som ikke lenger finnes i backend.
 * Sjekker på nytt bare når listen med ID-er endres.
 * Feiler sjekken, regnes ingen vedlegg som manglende, slik at bruker ikke blokkeres.
 */
export const useManglendeVedlegg = (vedleggIder: string[]) => {
    const key = vedleggIder.join(',');
    const [resultat, setResultat] = useState<{ key: string; manglendeVedleggIder: string[] }>();

    useEffect(() => {
        if (key === '') {
            return;
        }
        let avbrutt = false;
        fetchManglendeVedleggIder(key.split(','))
            .catch(() => [])
            .then((manglendeVedleggIder) => {
                if (!avbrutt) {
                    setResultat({ key, manglendeVedleggIder });
                }
            });
        return () => {
            avbrutt = true;
        };
    }, [key]);

    const harResultat = resultat?.key === key;
    return {
        manglendeVedleggIder: harResultat ? resultat.manglendeVedleggIder : [],
        sjekkerVedlegg: key !== '' && !harResultat,
    };
};
