import { StepId } from '@app/søknad/config/StepId';
import { Arbeidsgiver, K9Sak, Søknadsdata, ValgteEndringer } from '@app/types';
import { Søker } from '@navikt/sif-common-api';
import persistence, { PersistenceInterface } from '@navikt/sif-common-core-ds/src/utils/persistence/persistence';
import { DateRange, jsonSort } from '@navikt/sif-common-utils';
import { appLogger } from '@sif/apm';
import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import hash from 'object-hash';

import { MELLOMLAGRING_VERSJON } from '../../constants/MELLOMLAGRING_VERSJON';
import { getSøknadStepRoute, SøknadRoutes } from '../../søknad/config/SøknadRoutes';
import { getUgyldigeArbeidstidPerioder } from '../../utils/arbeidstidPeriodeValidering';
import { getSakFromK9Sak } from '../../utils/getSakFromK9Sak';
import { ApiEndpointPsb, axiosConfigPsb } from '../api';

dayjs.extend(utc);

export type SøknadStatePersistence = {
    versjon: string;
    barnAktørId: string;
    søknadsdata: Søknadsdata;
    søknadRoute?: SøknadRoutes;
    søknadHashString: string;
    harArbeidsgivereIkkeISak: boolean;
    valgteEndringer: ValgteEndringer;
    søknadSteps: StepId[];
    metadata: {
        updatedTimestamp: string;
    };
};

interface SøknadStateHashInfo {
    søker: Søker;
    barnAktørId: string;
}

interface SøknadStatePersistenceEndpoint extends Omit<
    PersistenceInterface<SøknadStatePersistence>,
    'update' | 'rehydrate'
> {
    update: (state: Omit<SøknadStatePersistence, 'søknadHashString'>, søker: Søker) => Promise<AxiosResponse>;
    fetch: () => Promise<SøknadStatePersistence | undefined>;
}

const persistSetup = persistence<SøknadStatePersistence>({
    url: ApiEndpointPsb.mellomlagring,
    requestConfig: { ...axiosConfigPsb, transformRequest: undefined },
});

const createHashString = (info: SøknadStateHashInfo) => {
    return hash(JSON.stringify(jsonSort(info)));
};

const persistedSøknadRouteIsAvailable = (søknadState: SøknadStatePersistence): boolean => {
    return (søknadState.søknadSteps || []).some((step) => getSøknadStepRoute(step) === søknadState.søknadRoute);
};

const isHashValid = (søknadState: SøknadStatePersistence, info: SøknadStateHashInfo): boolean => {
    if (søknadState.søknadHashString === createHashString(info)) {
        return true;
    }

    // Migrasjonsshim: gammel mellomlagring brukte Date-objekt for fødselsdato
    const legacyInfo = {
        ...info,
        søker: { ...info.søker, fødselsdato: dayjs.utc(info.søker.fødselsdato, 'YYYY-MM-DD').toDate() },
    };
    const legacyHash = hash(JSON.stringify(jsonSort(legacyInfo)));
    return søknadState.søknadHashString === legacyHash;
};

const harGyldigeArbeidstidsendringer = (
    søknadState: SøknadStatePersistence,
    k9sak: K9Sak,
    arbeidsgivere: Arbeidsgiver[],
    tillattEndringsperiode: DateRange,
): boolean => {
    const arbeidstid = søknadState.søknadsdata[StepId.ARBEIDSTID];
    if (!arbeidstid) {
        return true;
    }

    const sak = getSakFromK9Sak(k9sak, arbeidsgivere, tillattEndringsperiode);

    return getUgyldigeArbeidstidPerioder(arbeidstid, sak).length === 0;
};

export const isPersistedSøknadStateValid = (
    søknadState: SøknadStatePersistence,
    info: SøknadStateHashInfo,
    k9saker: K9Sak[],
    arbeidsgivere: Arbeidsgiver[],
    tillattEndringsperiode: DateRange,
): boolean => {
    const k9sak = k9saker.find((sak) => sak.barn.aktørId === søknadState.barnAktørId);
    const arbeidstidErGyldig =
        k9sak !== undefined &&
        harGyldigeArbeidstidsendringer(søknadState, k9sak, arbeidsgivere, tillattEndringsperiode);

    if (k9sak === undefined) {
        appLogger.logError('Persisted søknad state: k9sak ikke funnet for barnAktørId');
    } else if (!arbeidstidErGyldig) {
        appLogger.logError('Persisted søknad state: arbeidstidsendringer er ugyldige');
    }

    return (
        søknadState.versjon === MELLOMLAGRING_VERSJON &&
        isHashValid(søknadState, info) &&
        k9sak !== undefined &&
        persistedSøknadRouteIsAvailable(søknadState) &&
        arbeidstidErGyldig
    );
};

export const isPersistedSøknadStateEmpty = (søknadState: SøknadStatePersistence) => {
    return Object.keys(søknadState || {}).length === 0;
};

const søknadStateEndpoint: SøknadStatePersistenceEndpoint = {
    create: persistSetup.create,
    purge: persistSetup.purge,
    update: (
        { søknadsdata, søknadRoute, barnAktørId, valgteEndringer, harArbeidsgivereIkkeISak, søknadSteps },
        søker,
    ) => {
        return persistSetup.update({
            versjon: MELLOMLAGRING_VERSJON,
            søknadHashString: createHashString({ søker, barnAktørId }),
            barnAktørId,
            søknadsdata,
            søknadRoute,
            valgteEndringer,
            harArbeidsgivereIkkeISak,
            søknadSteps,
            metadata: {
                updatedTimestamp: new Date().toISOString(),
            },
        });
    },
    fetch: async () => {
        const { data } = await persistSetup.rehydrate();
        if (isPersistedSøknadStateEmpty(data)) {
            return Promise.resolve(undefined);
        }
        return Promise.resolve(data);
    },
};

export default søknadStateEndpoint;
