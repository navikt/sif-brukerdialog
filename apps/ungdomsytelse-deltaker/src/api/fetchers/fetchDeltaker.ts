import { cache } from 'react';
import { fetchSøker, Søker } from '@navikt/sif-common-api';
import { deltakerService } from '../services/deltakerService';
import { Deltakelse } from '../types';

export type Deltaker = {
    søker: Søker;
    deltakelser: Deltakelse[];
};

export const fetchDeltaker = cache(async (): Promise<Deltaker> => {
    const cacheKey = 'deltaker-data';

    if (fetchDeltaker[cacheKey]) {
        return fetchDeltaker[cacheKey];
    }

    const [søker, deltakelser] = await Promise.all([fetchSøker(), deltakerService.getDeltakelser()]);

    const result = { søker, deltakelser };

    fetchDeltaker[cacheKey] = result;

    return result;
});
