import { ApiEndpoint } from '../../types/ApiEndpoint';
import { Søknadstype } from '../../types/Soknadstype';
import { getApiEndpointForSøknadstype } from '../apiUtils';

describe('sendSoknad', () => {
    describe('etApiEndpointForSøknadstype', () => {
        it('returns correnct endpoint for søkndastype overføring', () => {
            expect(getApiEndpointForSøknadstype(Søknadstype.overføring)).toEqual(ApiEndpoint.sendMeldingOverføring);
        });
        it('returns correnct endpoint for søkndastype overføring', () => {
            expect(getApiEndpointForSøknadstype(Søknadstype.fordeling)).toEqual(ApiEndpoint.sendMeldingFordeling);
        });
        it('returns correnct endpoint for søkndastype overføring', () => {
            expect(getApiEndpointForSøknadstype(Søknadstype.koronaoverføring)).toEqual(
                ApiEndpoint.sendMeldingKoronaoverføring
            );
        });
    });
});
