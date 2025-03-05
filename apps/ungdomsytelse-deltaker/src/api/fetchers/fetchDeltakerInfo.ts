import { cache } from 'react';
import { fetchBarn, fetchSøker, RegistrertBarn, Søker } from '@navikt/sif-common-api';
import { DeltakelsePeriode } from '@navikt/ung-common';
import { deltakerApiService } from '../deltakerApiService';

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
