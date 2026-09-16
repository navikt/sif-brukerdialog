import { K9Sak } from '@app/types';
import { Søker } from '@navikt/sif-common-api';
import { ISODateRangeToDateRange } from '@navikt/sif-common-utils';

vi.mock('../../endpoints/søknadStateEndpoint', () => ({
    søknadStateEndpoint: { fetch: vi.fn(), purge: vi.fn() },
    isPersistedSøknadStateValid: vi.fn(),
}));

import { isPersistedSøknadStateValid, søknadStateEndpoint } from '../../endpoints/søknadStateEndpoint';
import { hentGyldigLagretSøknadState } from '../hentGyldigLagretSøknadState';

const søker = { fornavn: 'Ola' } as unknown as Søker;
const k9saker: K9Sak[] = [];
const params = {
    søker,
    k9saker,
    arbeidsgivere: [],
    tillattEndringsperiode: ISODateRangeToDateRange('2024-01-01/2024-12-31'),
};

const lagretState = { barnAktørId: '123', versjon: '9' } as any;

describe('hentGyldigLagretSøknadState', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('returnerer undefined uten å slette når det ikke finnes mellomlagring', async () => {
        vi.mocked(søknadStateEndpoint.fetch).mockResolvedValue(undefined);

        await expect(hentGyldigLagretSøknadState(params)).resolves.toBeUndefined();
        expect(søknadStateEndpoint.purge).not.toHaveBeenCalled();
        expect(isPersistedSøknadStateValid).not.toHaveBeenCalled();
    });

    it('returnerer mellomlagringen når den er gyldig', async () => {
        vi.mocked(søknadStateEndpoint.fetch).mockResolvedValue(lagretState);
        vi.mocked(isPersistedSøknadStateValid).mockReturnValue(true);

        await expect(hentGyldigLagretSøknadState(params)).resolves.toBe(lagretState);
        expect(søknadStateEndpoint.purge).not.toHaveBeenCalled();
    });

    it('validerer mot søker og barnAktørId fra mellomlagringen', async () => {
        vi.mocked(søknadStateEndpoint.fetch).mockResolvedValue(lagretState);
        vi.mocked(isPersistedSøknadStateValid).mockReturnValue(true);

        await hentGyldigLagretSøknadState(params);

        expect(isPersistedSøknadStateValid).toHaveBeenCalledWith(
            lagretState,
            { søker, barnAktørId: '123' },
            k9saker,
            params.arbeidsgivere,
            params.tillattEndringsperiode,
        );
    });

    it('sletter mellomlagringen og returnerer undefined når den er ugyldig', async () => {
        vi.mocked(søknadStateEndpoint.fetch).mockResolvedValue(lagretState);
        vi.mocked(isPersistedSøknadStateValid).mockReturnValue(false);

        await expect(hentGyldigLagretSøknadState(params)).resolves.toBeUndefined();
        expect(søknadStateEndpoint.purge).toHaveBeenCalledTimes(1);
    });
});
