import persistence, { PersistenceInterface } from '@navikt/sif-common-core-ds/lib/utils/persistence/persistence';
import { jsonSort } from '@navikt/sif-common-utils/lib';
import { AxiosResponse } from 'axios';
import hash from 'object-hash';
import { StepID } from '../../søknad/søknadStepsConfig';
import { RegistrertBarn } from '../../types/RegistrertBarn';
import { Søker } from '../../types/Søker';
import { SøknadFormValues } from '../../types/SøknadFormValues';
import { MELLOMLAGRING_VERSION, SøknadMellomlagring } from '../../types/SøknadMellomlagring';
import { ApiEndpointPsb, axiosConfigPsb } from '../api';

export interface UserHashInfo {
    søker: Søker;
    barn: RegistrertBarn[];
}

interface MellomlagringEndpoint extends Omit<PersistenceInterface<SøknadMellomlagring>, 'update' | 'rehydrate'> {
    update: (formValues: SøknadFormValues, lastStepID: StepID, søkerInfo: UserHashInfo) => Promise<AxiosResponse>;
    fetch: () => Promise<SøknadMellomlagring>;
}

const persistSetup = persistence<SøknadMellomlagring>({
    url: ApiEndpointPsb.mellomlagring,
    requestConfig: { ...axiosConfigPsb },
});

export const createUserHashInfoString = (info: UserHashInfo) => {
    const trimmedInfo: any = { ...info };
    delete trimmedInfo.sak.mottattDato;
    return hash(JSON.stringify(jsonSort(trimmedInfo)));
};

const isMellomlagringValid = (mellomlagring: SøknadMellomlagring): boolean => {
    return (
        mellomlagring.metadata?.versjon === MELLOMLAGRING_VERSION &&
        mellomlagring.formValues?.harForståttRettigheterOgPlikter === true
    );
};

const mellomlagringEndpoint: MellomlagringEndpoint = {
    create: () => {
        return persistSetup.create();
    },
    update: (formValues: SøknadFormValues, lastStepID: StepID, userHashInfo: UserHashInfo) => {
        return persistSetup.update({
            formValues,
            metadata: {
                lastStepID,
                versjon: MELLOMLAGRING_VERSION,
                userHash: createUserHashInfoString(userHashInfo),
                updatedTimestemp: new Date().toISOString(),
            },
        });
    },
    purge: persistSetup.purge,
    fetch: async () => {
        const { data } = await persistSetup.rehydrate();
        if (data) {
            if (isMellomlagringValid(data)) {
                return data;
            } else if (Object.keys(data).length > 0) {
                /** Mellomlagring inneholder data, men er ikke gyldig - slettes */
                await mellomlagringEndpoint.purge();
            }
        }
        return Promise.resolve(data);
    },
};

export default mellomlagringEndpoint;
