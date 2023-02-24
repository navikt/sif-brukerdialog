import { getGitShaRequestHeader } from '@navikt/sif-common-core-ds/lib/utils/gitShaHeaderUtils';
import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import api from '../api';
import { ApiEndpointPsb } from './';

export const sendSøknadEndpoint = {
    send: (data: SøknadApiData) => api.psb.post(ApiEndpointPsb.sendEndringsmelding, data, getGitShaRequestHeader()),
};
