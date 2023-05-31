import { storageParser } from '@navikt/sif-common-core-ds/lib/utils/persistence/storageParser';
import axios, { AxiosResponse } from 'axios';
import { axiosConfigPsb, axiosConfigInnsyn } from '../config/axiosConfig';
import { AAregArbeidsgiverRemoteData } from './getArbeidsgivereRemoteData';
import { StepID } from '../søknad/søknadStepsConfig';
import { ResourceType, ResourceTypeInnsyn } from '../types/ResourceType';
import { SøknadApiData } from '../types/søknad-api-data/SøknadApiData';
import { SøknadFormValues } from '../types/SøknadFormValues';
import { MELLOMLAGRING_VERSION, SøknadTempStorageData } from '../types/SøknadTempStorageData';
import { axiosJsonConfig, sendMultipartPostRequest } from './utils/apiUtils';
import { ImportertSøknadMetadata } from '../types/ImportertSøknad';
import { Feature, isFeatureEnabled } from '../utils/featureToggleUtils';

export enum ApiEndpointInnsyn {
    'forrigeSøknad' = 'soknad/psb/siste',
}

export const getPersistUrl = (stepID?: StepID) =>
    stepID ? `${ResourceType.MELLOMLAGRING}?lastStepID=${encodeURI(stepID)}` : ResourceType.MELLOMLAGRING;

export const persist = ({
    formValues,
    lastStepID,
    importertSøknadMetadata,
}: {
    formValues?: SøknadFormValues;
    lastStepID?: StepID;
    importertSøknadMetadata?: ImportertSøknadMetadata;
}) => {
    const url = getPersistUrl(lastStepID);
    if (formValues) {
        const body: SøknadTempStorageData = {
            formValues,
            metadata: {
                lastStepID,
                version: MELLOMLAGRING_VERSION,
                updatedTimestemp: new Date().toISOString(),
                importertSøknadMetadata,
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

export const getForrigeSoknad = () => {
    if (isFeatureEnabled(Feature.PREUTFYLLING) == false) {
        return Promise.resolve(undefined);
    }
    return axios
        .get(ResourceTypeInnsyn.FORRIGE_SOKNAD, {
            ...axiosConfigInnsyn,
            transformResponse: storageParser,
        })
        .then((result) => Promise.resolve(result))
        .catch(() => Promise.resolve(undefined));
};
export const getBarn = () => axios.get(ResourceType.BARN, axiosJsonConfig);
export const getSøker = () => axios.get(ResourceType.SØKER, axiosJsonConfig);
export const getArbeidsgiver = (fom: string, tom: string): Promise<AxiosResponse<AAregArbeidsgiverRemoteData>> => {
    return axios.get(
        `${ResourceType.ARBEIDSGIVER}?fra_og_med=${fom}&til_og_med=${tom}&frilansoppdrag=true`,
        axiosJsonConfig
    );
};

export const sendApplication = (data: SøknadApiData) => axios.post(ResourceType.SEND_SØKNAD, data, axiosJsonConfig);

export const uploadFile = (file: File) => {
    const formData = new FormData();
    formData.append('vedlegg', file);
    return sendMultipartPostRequest(ResourceType.VEDLEGG, formData);
};
export const deleteFile = (url: string) => axios.delete(url, axiosConfigPsb);
