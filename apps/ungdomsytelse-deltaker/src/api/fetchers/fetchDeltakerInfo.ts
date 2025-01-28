import { cache } from 'react';
import { fetchSøker, Søker } from '@navikt/sif-common-api';
import { deltakerService } from '../services/deltakerService';
import { Deltakelse } from '../types';

export type DeltakerInfo = {
    søker: Søker;
    deltakelser: Deltakelse[];
};

export const fetchDeltakerInfo = cache(async (): Promise<DeltakerInfo> => {
    const cacheKey = 'deltaker-data';

    if (fetchDeltakerInfo[cacheKey]) {
        return fetchDeltakerInfo[cacheKey];
    }

    const [søker, deltakelser] = await Promise.all([fetchSøker(), deltakerService.getDeltakelser()]);

    const result = { søker, deltakelser };

    fetchDeltakerInfo[cacheKey] = result;

    return result;
});
