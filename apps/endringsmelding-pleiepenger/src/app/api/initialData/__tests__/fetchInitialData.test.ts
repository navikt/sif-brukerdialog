import { IngenTilgangÅrsak, K9Sak, RequestStatus } from '@app/types';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { AxiosError } from 'axios';

const { featureToggles } = vi.hoisted(() => {
    const appSettings = new Proxy({}, { get: () => 'test' });
    (globalThis as any).appSettings = appSettings;
    if (typeof window !== 'undefined') {
        (window as any).appSettings = appSettings;
    }
    return { featureToggles: {} as Record<string, boolean> };
});

vi.mock('@navikt/sif-common-api', () => ({
    fetchSøker: vi.fn(),
}));

vi.mock('@sif/apm', () => ({
    appLogger: { logInfo: vi.fn(), logError: vi.fn(), logException: vi.fn(), logApiError: vi.fn() },
}));

vi.mock('../../endpoints/sakerEndpoint', () => ({
    sakerEndpoint: { fetch: vi.fn() },
}));

vi.mock('../../endpoints/arbeidsgivereEndpoint', () => ({
    arbeidsgivereEndpoint: { fetch: vi.fn() },
}));

vi.mock('../../endpoints/søknadStateEndpoint', () => ({
    søknadStateEndpoint: { fetch: vi.fn(), purge: vi.fn() },
    isPersistedSøknadStateValid: vi.fn(() => true),
}));

/**
 * Reglene er mocket her — suiten tester fetchInitialData sin feilhåndtering.
 * Paritet mellom v1 og v2 bevises i __tests__/tilgangKontroll.test.ts.
 */
vi.mock('../../../utils/tilgangskontroll', () => ({
    tilgangskontroll: vi.fn(() => ({ kanBrukeSøknad: true })),
}));

vi.mock('../../../utils/featureToggleUtils', async (importOriginal) => ({
    ...(await importOriginal<typeof import('../../../utils/featureToggleUtils')>()),
    isFeatureEnabled: (feature: string) => featureToggles[feature] === true,
}));

import { fetchSøker } from '@navikt/sif-common-api';

import { Feature } from '../../../utils/featureToggleUtils';
import { arbeidsgivereEndpoint } from '../../endpoints/arbeidsgivereEndpoint';
import { sakerEndpoint } from '../../endpoints/sakerEndpoint';
import { søknadStateEndpoint } from '../../endpoints/søknadStateEndpoint';
import { fetchInitialData } from '../fetchInitialData';

const tillattEndringsperiode = {
    from: ISODateToDate('2024-01-01'),
    to: ISODateToDate('2024-12-31'),
};

const søker = { fornavn: 'Ola', etternavn: 'Nordmann', fødselsnummer: '12345678901' } as any;

const gyldigSak = {
    ytelse: {
        søknadsperioder: [{ from: ISODateToDate('2024-02-01'), to: ISODateToDate('2024-03-01') }],
        arbeidstid: {},
    },
} as unknown as K9Sak;

const httpError = (status: number) =>
    new AxiosError('feil', 'ERR_BAD_RESPONSE', {} as any, {}, { status, data: {} } as any);

const settOppLykkeligSti = (nyTilgangskontroll: boolean): void => {
    featureToggles[Feature.SIF_PUBLIC_NY_TILGANGSKONTROLL] = nyTilgangskontroll;
    vi.mocked(fetchSøker).mockResolvedValue(søker);
    vi.mocked(sakerEndpoint.fetch).mockResolvedValue({ k9Saker: [gyldigSak], eldreSaker: [] });
    vi.mocked(arbeidsgivereEndpoint.fetch).mockResolvedValue([]);
    vi.mocked(søknadStateEndpoint.fetch).mockResolvedValue(undefined);
};

afterEach(() => {
    vi.clearAllMocks();
});

/**
 * Feilene oppstår i selve kallene, før noen tilgangsregel er kjørt. Utfallet er
 * derfor uavhengig av hvilken tilgangskontroll som er aktiv, og suiten kjøres
 * kun mot den nye.
 */
describe('fetchInitialData feilhåndtering', () => {
    beforeEach(() => {
        settOppLykkeligSti(true);
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
});

/**
 * Disse går gjennom tilgangskontrollen, og kjøres derfor mot begge
 * implementasjonene så lenge toggelen lever.
 */
describe.each([
    ['v1', false],
    ['v2', true],
])('fetchInitialData tilgangskontroll %s', (_navn, nyTilgangskontroll) => {
    beforeEach(() => {
        settOppLykkeligSti(nyTilgangskontroll);
    });

    it('beholder årsak og beriker med søker når bruker ikke har sak', async () => {
        vi.mocked(sakerEndpoint.fetch).mockResolvedValue({ k9Saker: [], eldreSaker: [] });
        await expect(fetchInitialData(tillattEndringsperiode)).rejects.toMatchObject({
            status: RequestStatus.success,
            kanBrukeSøknad: false,
            årsak: [IngenTilgangÅrsak.harIngenSak],
            søker,
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
