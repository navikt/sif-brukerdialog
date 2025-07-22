import { Søker } from '@navikt/sif-common-api';
import persistence, { PersistenceInterface } from '@navikt/sif-common-core-ds/src/utils/persistence/persistence';
import { jsonSort } from '@navikt/sif-common-utils';
import { AxiosResponse } from 'axios';
import hash from 'object-hash';
import { axiosJsonConfig } from '../api/api';
import { ApiEndpoint } from '../types/ApiEndpoint';
import { SoknadFormData } from '../types/SoknadFormData';
import { SoknadTempStorageData } from '../types/SoknadTempStorageData';
import { Søknadstype } from '../types/Søknadstype';
import { StepID } from './soknadStepsConfig';
import { MELLOMLAGRING_VERSJON } from '../constants/MELLOMLAGRING_VERSJON';

interface UserHashInfo {
    søker: Søker;
}

const createHashString = (info: UserHashInfo) => {
    return hash(JSON.stringify(jsonSort(info)));
};

interface SoknadTemporaryStorage
    extends Omit<PersistenceInterface<SoknadTempStorageData>, 'update' | 'create' | 'purge' | 'rehydrate'> {
    update: (
        soknadId: string,
        formData: Partial<SoknadFormData>,
        lastStepID: StepID,
        søkerInfo: UserHashInfo,
        søknadstype: Søknadstype,
    ) => Promise<AxiosResponse>;
    create: (søknadstype: Søknadstype) => Promise<AxiosResponse>;
    purge: (søknadstype: Søknadstype) => Promise<AxiosResponse>;
    rehydrate: (søknadstype: Søknadstype) => Promise<AxiosResponse>;
}

const getMellomlagringApiEndpoint = (søknadstype: Søknadstype): string => {
    switch (søknadstype) {
        case Søknadstype.pleiepengerSyktBarn:
            return ApiEndpoint.MELLOMLAGRING_PLEIEPENGER_SYKT_BARN;
        case Søknadstype.pleiepengerLivetsSluttfase:
            return ApiEndpoint.MELLOMLAGRING_PLEIEPENGER_LIVETS_SLUTTFASE;
        case Søknadstype.opplaringspenger:
            return ApiEndpoint.MELLOMLAGRING_OPPLARINGSPENGER;
        case Søknadstype.ekstraomsorgsdager:
        case Søknadstype.omsorgspenger:
        case Søknadstype.regnetsomalene:
        case Søknadstype.utbetaling:
        case Søknadstype.utbetalingarbeidstaker:
            return ApiEndpoint.MELLOMLAGRING_OMP;
    }
};

const persistSetup = (søknadstype: Søknadstype) =>
    persistence<SoknadTempStorageData>({
        url: getMellomlagringApiEndpoint(søknadstype),
        requestConfig: { ...axiosJsonConfig },
    });

export const isStorageDataValid = (
    data: SoknadTempStorageData,
    userHashInfo: UserHashInfo,
): SoknadTempStorageData | undefined => {
    if (
        data?.metadata?.version === MELLOMLAGRING_VERSJON &&
        data?.metadata.lastStepID !== undefined &&
        data.formData !== undefined &&
        data.metadata.soknadId !== undefined &&
        JSON.stringify(data.formData) !== JSON.stringify({}) &&
        createHashString(userHashInfo) === data.metadata.userHash
    ) {
        return data;
    }
    return undefined;
};

const SøknadTempStorage: SoknadTemporaryStorage = {
    update: (
        soknadId: string,
        formData: SoknadFormData,
        lastStepID: StepID,
        userHashInfo: UserHashInfo,
        søknadstype: Søknadstype,
    ) => {
        return persistSetup(søknadstype).update({
            formData,
            metadata: {
                soknadId,
                lastStepID,
                version: MELLOMLAGRING_VERSJON,
                userHash: createHashString(userHashInfo),
            },
        });
    },
    create: (søknadstype: Søknadstype) => persistSetup(søknadstype).create(),
    purge: (søknadstype: Søknadstype) => persistSetup(søknadstype).purge(),
    rehydrate: (søknadstype: Søknadstype) => persistSetup(søknadstype).rehydrate(),
};

export default SøknadTempStorage;
