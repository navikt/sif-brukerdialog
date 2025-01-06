import { cache } from 'react';
import { fetchSøker, Søker } from '@navikt/sif-common-api';
import { deltakerService } from '../../src/api/services/deltakerService';
import { Deltakelse } from '../../src/api/types';

export const fetchInitialData = cache(
    async (): Promise<{
        søker: Søker;
        deltakelser: Deltakelse[];
        deltakelse?: Deltakelse;
    }> => {
        const cacheKey = 'initial-data';

        if (fetchInitialData[cacheKey]) {
            return fetchInitialData[cacheKey];
        }

        const [søker, deltakelser] = await Promise.all([fetchSøker(), deltakerService.getDeltakelser()]);

        const result = { søker, deltakelser };
        fetchInitialData[cacheKey] = result;

        return result;
    },
);
