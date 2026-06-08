import { storageParser } from '@navikt/sif-common-core-ds/src/utils/persistence/storageParser';
import axios, { AxiosResponse } from 'axios';

import { axiosConfigPsb } from '../config/axiosConfig';
import { MELLOMLAGRING_VERSJON } from '../constants/MELLOMLAGRING_VERSJON';
import { ResourceType } from '../types/ResourceType';
import { SøknadApiData } from '../types/søknad-api-data/SøknadApiData';
import { SøknadFormValues } from '../types/søknad-form-values/SøknadFormValues';
import { SøknadTempStorageData } from '../types/SøknadTempStorageData';
import { StepID } from '../types/StepID';
import { getFeatureToggles } from '../utils/featureToggleUtils';
import { AAregArbeidsgiverRemoteData } from './getArbeidsgivereRemoteData';
import { axiosJsonConfig } from './utils/apiUtils';

export const getPersistUrl = (stepID?: StepID) =>
    stepID ? `${ResourceType.MELLOMLAGRING}?lastStepID=${encodeURI(stepID)}` : ResourceType.MELLOMLAGRING;

export const persist = ({ formValues, lastStepID }: { formValues?: SøknadFormValues; lastStepID?: StepID }) => {
    const url = getPersistUrl(lastStepID);
    if (formValues) {
        const body: SøknadTempStorageData = {
            formValues,
            metadata: {
                lastStepID,
                version: MELLOMLAGRING_VERSJON,
                updatedTimestemp: new Date().toISOString(),
                featureToggles: getFeatureToggles(),
            },
        };
        return axios.put(url, { ...body }, axiosJsonConfig);
    } else {
        return axios.post(url, {}, axiosJsonConfig);
    }
};
export const rehydrate = () =>
    axios.get(ResourceType.MELLOMLAGRING, {
        ...axiosJsonConfig,
        transformResponse: storageParser,
    });
export const purge = () => axios.delete(ResourceType.MELLOMLAGRING, { ...axiosConfigPsb, data: {} });

export const getArbeidsgiver = (fom: string, tom: string): Promise<AxiosResponse<AAregArbeidsgiverRemoteData>> => {
    return axios.get(
        `${ResourceType.ARBEIDSGIVER}?fra_og_med=${fom}&til_og_med=${tom}&frilansoppdrag=true`,
        axiosJsonConfig,
    );
};

export const sendApplication = (data: SøknadApiData) => axios.post(ResourceType.SEND_SØKNAD, data, axiosJsonConfig);
