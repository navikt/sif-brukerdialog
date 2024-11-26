import { useState } from 'react';
import { veilederService } from '../api/services/veilederService';
import { DeltakerOgDeltakelser } from '../api/types';

export const useHentDeltakerOgDeltakelser = () => {
    const [pending, setIsPending] = useState(false);
    const [deltaker, setDeltaker] = useState<DeltakerOgDeltakelser | undefined>();

    const hentDeltaker = async (deltakerFnr: string): Promise<DeltakerOgDeltakelser | undefined> => {
        setIsPending(true);
        setDeltaker(undefined);
        const d = await veilederService.getDeltakerOgDeltakelser({ fnr: deltakerFnr });
        setDeltaker(d);
        setIsPending(false);
        return deltaker;
    };

    return {
        hentDeltakerPending: pending,
        deltaker,
        hentDeltaker,
    };
};
