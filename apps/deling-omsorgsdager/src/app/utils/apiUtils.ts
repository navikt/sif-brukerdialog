import { ApiEndpoint } from '../types/ApiEndpoint';
import { Søknadstype } from '../types/Soknadstype';

export const getApiEndpointForSøknadstype = (type: Søknadstype): ApiEndpoint => {
    switch (type) {
        case Søknadstype.overføring:
            return ApiEndpoint.sendMeldingOverføring;
        case Søknadstype.fordeling:
            return ApiEndpoint.sendMeldingFordeling;
        case Søknadstype.koronaoverføring:
            return ApiEndpoint.sendMeldingKoronaoverføring;
    }
};
