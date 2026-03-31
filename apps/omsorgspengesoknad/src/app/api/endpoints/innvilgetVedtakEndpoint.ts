import { AxiosResponse } from 'axios';

import { OmsorgsdagerKronsinskSyktBarnRequestDto } from '../../types/innvilgetVedtakApiData/HentSisteGyldigeVedtakRequestDto';
import { HentSisteGyldigeVedtakResponseDto } from '../../types/innvilgetVedtakApiData/HentSisteGyldigeVedtakResponseDto';
import api, { ApiEndpoint } from '../api';

const innvilgetVedtakEndpoint: {
    send: (
        apiData: OmsorgsdagerKronsinskSyktBarnRequestDto,
    ) => Promise<AxiosResponse<HentSisteGyldigeVedtakResponseDto>>;
} = {
    send: (apiData: OmsorgsdagerKronsinskSyktBarnRequestDto) =>
        api.post<OmsorgsdagerKronsinskSyktBarnRequestDto>(ApiEndpoint.innvilget_vedtak, apiData),
};

export default innvilgetVedtakEndpoint;
