import { getGitShaRequestHeader } from '@navikt/sif-common-core-ds/src/utils/gitShaHeaderUtils';
import { SøknadApiData } from '@types';
import api from '../api';
import { ApiEndpointPsb } from './';

export const sendSøknadEndpoint = {
    send: (data: SøknadApiData) => api.psb.post(ApiEndpointPsb.sendEndringsmelding, data, getGitShaRequestHeader()),
};
