import { getGitShaRequestHeader } from '@navikt/sif-common-core-ds/src/utils/gitShaHeaderUtils';
import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import api, { ApiEndpoint } from '../api';

const søknadEndpoint = {
    send: async (apiData: SøknadApiData) =>
        await api.post<any>(ApiEndpoint.send_søknad, apiData, getGitShaRequestHeader()),
};

export default søknadEndpoint;
