import { cache } from 'react';
import { fetchBarn, fetchSøker, RegistrertBarn, Søker } from '@navikt/sif-common-api';
import { Deltakelse, deltakerService } from '@navikt/ung-common';

export type DeltakerInfo = {
    søker: Søker;
    deltakelser: Deltakelse[];
    barn: RegistrertBarn[];
};

export const fetchDeltakerInfo = cache(async (): Promise<DeltakerInfo> => {
    const cacheKey = 'deltaker-data';

    if (fetchDeltakerInfo[cacheKey]) {
        return fetchDeltakerInfo[cacheKey];
    }

    const [søker, deltakelser, barn] = await Promise.all([
        fetchSøker(),
        deltakerService.fetchDeltakelser(),
        fetchBarn(),
    ]);

    const result: DeltakerInfo = { søker, deltakelser, barn };

    fetchDeltakerInfo[cacheKey] = result;

    return result;
});
