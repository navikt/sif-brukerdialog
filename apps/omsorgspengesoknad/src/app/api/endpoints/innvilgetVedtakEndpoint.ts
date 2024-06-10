import api, { ApiEndpoint } from '../api';
import { OmsorgsdagerKronsinskSyktBarnRequestDto } from '../../types/innvilgetVedtakApiData/HentSisteGyldigeVedtakRequestDto';
import { AxiosResponse } from 'axios';
import { HentSisteGyldigeVedtakResponseDto } from '../../types/innvilgetVedtakApiData/HentSisteGyldigeVedtakResponseDto';

const innvilgetVedtakEndpoint: {
    send: (apiData: OmsorgsdagerKronsinskSyktBarnRequestDto) => Promise<AxiosResponse<HentSisteGyldigeVedtakResponseDto>>;
} = {
    send: async (apiData: OmsorgsdagerKronsinskSyktBarnRequestDto) =>
        await api.post<OmsorgsdagerKronsinskSyktBarnRequestDto>(ApiEndpoint.innvilget_vedtak, apiData),
};

export default innvilgetVedtakEndpoint;
