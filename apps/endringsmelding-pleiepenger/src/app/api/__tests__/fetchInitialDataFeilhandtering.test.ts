import { IngenTilgangÅrsak, K9Sak, RequestStatus } from '@app/types';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { AxiosError } from 'axios';

vi.hoisted(() => {
    const appSettings = new Proxy({}, { get: () => 'test' });
    (globalThis as any).appSettings = appSettings;
    if (typeof window !== 'undefined') {
        (window as any).appSettings = appSettings;
    }
});

vi.mock('@navikt/sif-common-api', () => ({
    fetchSøker: vi.fn(),
}));

vi.mock('@sif/apm', () => ({
    appLogger: { logInfo: vi.fn(), logError: vi.fn(), logException: vi.fn(), logApiError: vi.fn() },
}));

vi.mock('../endpoints/sakerEndpoint', () => ({
    default: { fetch: vi.fn() },
}));

vi.mock('../endpoints/arbeidsgivereEndpoint', () => ({
    arbeidsgivereEndpoint: { fetch: vi.fn() },
}));

vi.mock('../endpoints/søknadStateEndpoint', () => ({
    default: { fetch: vi.fn(), purge: vi.fn() },
    isPersistedSøknadStateValid: vi.fn(() => true),
}));

/** Har egne tester i utils/__tests__/tilgangskontroll.test.ts */
vi.mock('../../utils/tilgangskontroll', () => ({
    tilgangskontroll: vi.fn(() => ({ kanBrukeSøknad: true })),
}));

import { fetchSøker } from '@navikt/sif-common-api';

import { arbeidsgivereEndpoint } from '../endpoints/arbeidsgivereEndpoint';
import sakerEndpoint from '../endpoints/sakerEndpoint';
import søknadStateEndpoint from '../endpoints/søknadStateEndpoint';
import { fetchInitialData } from '../fetchInitialData';

const tillattEndringsperiode = {
    from: ISODateToDate('2024-01-01'),
    to: ISODateToDate('2024-12-31'),
};

const søker = { fornavn: 'Ola', etternavn: 'Nordmann', fødselsnummer: '12345678901' } as any;

const gyldigSak = {
    ytelse: {
        søknadsperioder: [{ from: ISODateToDate('2024-02-01'), to: ISODateToDate('2024-03-01') }],
    },
} as unknown as K9Sak;

const httpError = (status: number) =>
    new AxiosError('feil', 'ERR_BAD_RESPONSE', {} as any, {}, { status, data: {} } as any);

describe('fetchInitialData feilhåndtering', () => {
    beforeEach(() => {
        vi.mocked(fetchSøker).mockResolvedValue(søker);
        vi.mocked(sakerEndpoint.fetch).mockResolvedValue({ k9Saker: [gyldigSak], eldreSaker: [] });
        vi.mocked(arbeidsgivereEndpoint.fetch).mockResolvedValue([]);
        vi.mocked(søknadStateEndpoint.fetch).mockResolvedValue(undefined);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('feil fra oppstartskallene', () => {
        it('mapper 451 fra søker til forbidden', async () => {
            vi.mocked(fetchSøker).mockRejectedValue(httpError(451));
            await expect(fetchInitialData(tillattEndringsperiode)).rejects.toEqual({
                status: RequestStatus.forbidden,
            });
        });

        it('mapper 403 fra søker til forbidden', async () => {
            vi.mocked(fetchSøker).mockRejectedValue(httpError(403));
            await expect(fetchInitialData(tillattEndringsperiode)).rejects.toEqual({
                status: RequestStatus.forbidden,
            });
        });

        it('mapper 401 fra søker til redirectingToLogin', async () => {
            vi.mocked(fetchSøker).mockRejectedValue(httpError(401));
            await expect(fetchInitialData(tillattEndringsperiode)).rejects.toEqual({
                status: RequestStatus.redirectingToLogin,
            });
        });

        it('mapper ukjent http-feil fra søker til error', async () => {
            vi.mocked(fetchSøker).mockRejectedValue(httpError(500));
            await expect(fetchInitialData(tillattEndringsperiode)).rejects.toMatchObject({
                status: RequestStatus.error,
            });
        });
    });

    describe('feil fra kall senere i kjeden', () => {
        it('mapper 451 fra arbeidsgivere til forbidden', async () => {
            vi.mocked(arbeidsgivereEndpoint.fetch).mockRejectedValue(httpError(451));
            await expect(fetchInitialData(tillattEndringsperiode)).rejects.toEqual({
                status: RequestStatus.forbidden,
            });
        });

        it('mapper 401 fra arbeidsgivere til redirectingToLogin', async () => {
            vi.mocked(arbeidsgivereEndpoint.fetch).mockRejectedValue(httpError(401));
            await expect(fetchInitialData(tillattEndringsperiode)).rejects.toEqual({
                status: RequestStatus.redirectingToLogin,
            });
        });

        /** Regresjon: http-status på AxiosError ble tidligere tolket som en RequestStatus,
         *  slik at appen rendret uten data i stedet for å vise feilsiden. */
        it('mapper 500 fra arbeidsgivere til error, ikke til http-statuskoden', async () => {
            vi.mocked(arbeidsgivereEndpoint.fetch).mockRejectedValue(httpError(500));
            await expect(fetchInitialData(tillattEndringsperiode)).rejects.toMatchObject({
                status: RequestStatus.error,
            });
        });

        it('mapper 500 fra mellomlagring til error', async () => {
            vi.mocked(søknadStateEndpoint.fetch).mockRejectedValue(httpError(500));
            await expect(fetchInitialData(tillattEndringsperiode)).rejects.toMatchObject({
                status: RequestStatus.error,
            });
        });

        it('mapper feil som ikke er http-feil til error', async () => {
            vi.mocked(arbeidsgivereEndpoint.fetch).mockRejectedValue(new TypeError('uventet'));
            await expect(fetchInitialData(tillattEndringsperiode)).rejects.toMatchObject({
                status: RequestStatus.error,
            });
        });
    });

    describe('domenefeil', () => {
        it('beholder årsak og beriker med søker når bruker ikke har sak', async () => {
            vi.mocked(sakerEndpoint.fetch).mockResolvedValue({ k9Saker: [], eldreSaker: [] });
            await expect(fetchInitialData(tillattEndringsperiode)).rejects.toMatchObject({
                status: RequestStatus.success,
                kanBrukeSøknad: false,
                årsak: [IngenTilgangÅrsak.harIngenSak],
                søker,
            });
        });
    });

    it('returnerer data når alt går bra', async () => {
        await expect(fetchInitialData(tillattEndringsperiode)).resolves.toMatchObject({
            søker,
            k9saker: [gyldigSak],
            arbeidsgivere: [],
            antallSakerFørEndringsperiode: 0,
        });
    });
});
