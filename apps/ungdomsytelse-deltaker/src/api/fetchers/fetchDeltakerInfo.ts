import { cache } from 'react';
import { fetchBarn, fetchSøker, RegistrertBarn, Søker } from '@navikt/sif-common-api';
import { deltakerApiService } from '@navikt/ung-common';
import { DeltakelsePeriode } from '@navikt/ung-common/src/types/DeltakelsePeriode';

export type DeltakerInfo = {
    søker: Søker;
    deltakelser: DeltakelsePeriode[];
    barn: RegistrertBarn[];
};

export const fetchDeltakerInfo = cache(async (): Promise<DeltakerInfo> => {
    const cacheKey = 'deltaker-data';

    if (fetchDeltakerInfo[cacheKey]) {
        return fetchDeltakerInfo[cacheKey];
    }

    const [søker, deltakelser, barn] = await Promise.all([
        fetchSøker(),
        deltakerApiService.getAlleMineDeltakelser(),
        fetchBarn(),
    ]);

    const result: DeltakerInfo = { søker, deltakelser, barn };

    fetchDeltakerInfo[cacheKey] = result;

    return result;
});
