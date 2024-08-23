import { storageParser } from '@navikt/sif-common-core-ds/src/utils/persistence/storageParser';
import axios, { AxiosResponse } from 'axios';
import { axiosConfigPsb } from '../config/axiosConfig';
import { ResourceType } from '../types/ResourceType';
import { StepID } from '../types/StepID';
import { SøknadApiData } from '../types/søknad-api-data/SøknadApiData';
import { SøknadFormValues } from '../types/søknad-form-values/SøknadFormValues';
import { MELLOMLAGRING_VERSION, SøknadTempStorageData } from '../types/SøknadTempStorageData';
import { AAregArbeidsgiverRemoteData } from './getArbeidsgivereRemoteData';
import { axiosJsonConfig, sendMultipartPostRequest } from './utils/apiUtils';
import { Søker } from '../types';

export const getPersistUrl = (stepID?: StepID) =>
    stepID ? `${ResourceType.MELLOMLAGRING}?lastStepID=${encodeURI(stepID)}` : ResourceType.MELLOMLAGRING;

export const persist = ({ formValues, lastStepID }: { formValues?: SøknadFormValues; lastStepID?: StepID }) => {
    const url = getPersistUrl(lastStepID);
    if (formValues) {
        const body: SøknadTempStorageData = {
            formValues,
            metadata: {
                lastStepID,
                version: MELLOMLAGRING_VERSION,
                updatedTimestemp: new Date().toISOString(),
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

export const getBarn = () => axios.get(ResourceType.BARN, axiosJsonConfig);
export const getSøker = () => axios.get<Søker>(ResourceType.SØKER, axiosJsonConfig);
export const getSøkerId = async () => {
    const søker = await getSøker();
    return søker.data.fødselsnummer;
};
export const getArbeidsgiver = (fom: string, tom: string): Promise<AxiosResponse<AAregArbeidsgiverRemoteData>> => {
    return axios.get(
        `${ResourceType.ARBEIDSGIVER}?fra_og_med=${fom}&til_og_med=${tom}&frilansoppdrag=true`,
        axiosJsonConfig,
    );
};

export const sendApplication = (data: SøknadApiData) => axios.post(ResourceType.SEND_SØKNAD, data, axiosJsonConfig);

export const uploadFile = (file: File) => {
    const formData = new FormData();
    formData.append('vedlegg', file);
    return sendMultipartPostRequest(ResourceType.VEDLEGG, formData);
};
export const deleteFile = (url: string) => axios.delete(url, axiosConfigPsb);
