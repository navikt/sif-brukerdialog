import { useRouter } from 'next/router';

import { PleietrengendeMedSak } from '../server/api-models/PleietrengendeMedSakSchema';
import { useInnsynsdataContext } from './useInnsynsdataContext';

/**
 * Hjelpefunksjon for å hente sak basert på saksnummer
 */
const getSakFromSaksnr = (
    saker: PleietrengendeMedSak[],
    saksnr?: string | string[],
): PleietrengendeMedSak | undefined => {
    if (!saksnr || typeof saksnr !== 'string' || saker.length === 0) {
        return undefined;
    }
    return saker.find((sak) => sak.sak.saksnummer === saksnr);
};

/**
 * Tilpasset hook for å hente sak fra route
 */
export const usePleietrengendeMedSakFromRoute = (): {
    pleietrengendeMedSak: PleietrengendeMedSak | undefined;
    saksnr: string | undefined;
} => {
    const {
        innsynsdata: { saker },
    } = useInnsynsdataContext();
    const router = useRouter();
    const { saksnr } = router.query;
    return {
        pleietrengendeMedSak: getSakFromSaksnr(saker, saksnr),
        saksnr: typeof saksnr === 'string' ? saksnr : undefined,
    };
};
