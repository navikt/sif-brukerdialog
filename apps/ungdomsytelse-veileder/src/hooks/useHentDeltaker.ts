import { useState } from 'react';
import { veilederService } from '../api/services/veilederService';
import { Deltaker } from '../versjoner/versjon-1/types/Deltaker';

export const useHentDeltaker = () => {
    const [pending, setIsPending] = useState(false);
    const [deltaker, setDeltaker] = useState<Deltaker | undefined>();

    const hentDeltaker = async (deltakerFnr: string): Promise<Deltaker | undefined> => {
        setIsPending(true);
        setDeltaker(undefined);
        const d = await veilederService.getDeltaker(deltakerFnr);
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
