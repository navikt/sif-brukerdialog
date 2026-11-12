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

vi.mock('../../endpoints/sakerEndpoint', () => ({
    sakerEndpoint: { fetch: vi.fn() },
}));

vi.mock('../../endpoints/arbeidsgivereEndpoint', () => ({
    arbeidsgivereEndpoint: { fetch: vi.fn() },
}));

vi.mock('../../endpoints/tilgangEndpoint', () => ({
    tilgangEndpoint: { fetch: vi.fn() },
}));

vi.mock('../../endpoints/søknadStateEndpoint', () => ({
    søknadStateEndpoint: { fetch: vi.fn(), purge: vi.fn() },
    isPersistedSøknadStateValid: vi.fn(() => true),
}));

import { fetchSøker } from '@navikt/sif-common-api';
import { appLogger } from '@sif/apm';

import { arbeidsgivereEndpoint } from '../../endpoints/arbeidsgivereEndpoint';
import { sakerEndpoint } from '../../endpoints/sakerEndpoint';
import { søknadStateEndpoint } from '../../endpoints/søknadStateEndpoint';
import { tilgangEndpoint } from '../../endpoints/tilgangEndpoint';
import { fetchInitialData } from '../fetchInitialData';

const tillattEndringsperiode = {
    from: ISODateToDate('2024-01-01'),
    to: ISODateToDate('2024-12-31'),
};

const søker = { fornavn: 'Ola', etternavn: 'Nordmann', fødselsnummer: '12345678901' } as any;

const lagSak = (from: string, to: string) =>
    ({
        ytelse: {
            søknadsperioder: [{ from: ISODateToDate(from), to: ISODateToDate(to) }],
            arbeidstid: {},
        },
    }) as unknown as K9Sak;

const gyldigSak = lagSak('2024-02-01', '2024-03-01');
const eldreSak = lagSak('2022-01-01', '2022-03-01');

const httpError = (status: number) =>
    new AxiosError('feil', 'ERR_BAD_RESPONSE', {} as any, {}, { status, data: {} } as any);

const settOppLykkeligSti = (): void => {
    vi.mocked(fetchSøker).mockResolvedValue(søker);
    vi.mocked(tilgangEndpoint.fetch).mockResolvedValue({ kanBruke: true, tillattEndringsperiode });
    vi.mocked(sakerEndpoint.fetch).mockResolvedValue({ saker: [gyldigSak], antallUgyldige: 0 });
    vi.mocked(arbeidsgivereEndpoint.fetch).mockResolvedValue([]);
    vi.mocked(søknadStateEndpoint.fetch).mockResolvedValue(undefined);
};

afterEach(() => {
    vi.clearAllMocks();
});

describe('fetchInitialData feilhåndtering', () => {
    beforeEach(() => {
        settOppLykkeligSti();
    });

    describe('feil fra oppstartskallene', () => {
        it('mapper 451 fra søker til forbidden', async () => {
            vi.mocked(fetchSøker).mockRejectedValue(httpError(451));
            await expect(fetchInitialData()).rejects.toEqual({
                status: RequestStatus.forbidden,
            });
        });

        it('mapper 403 fra søker til forbidden', async () => {
            vi.mocked(fetchSøker).mockRejectedValue(httpError(403));
            await expect(fetchInitialData()).rejects.toEqual({
                status: RequestStatus.forbidden,
            });
        });

        it('mapper 401 fra søker til redirectingToLogin', async () => {
            vi.mocked(fetchSøker).mockRejectedValue(httpError(401));
            await expect(fetchInitialData()).rejects.toEqual({
                status: RequestStatus.redirectingToLogin,
            });
        });

        it('mapper ukjent http-feil fra søker til error', async () => {
            vi.mocked(fetchSøker).mockRejectedValue(httpError(500));
            await expect(fetchInitialData()).rejects.toMatchObject({
                status: RequestStatus.error,
            });
        });
    });

    describe('feil fra kall senere i kjeden', () => {
        it('mapper 500 fra tilgang til error', async () => {
            vi.mocked(tilgangEndpoint.fetch).mockRejectedValue(httpError(500));
            await expect(fetchInitialData()).rejects.toMatchObject({
                status: RequestStatus.error,
            });
        });

        it('mapper 451 fra arbeidsgivere til forbidden', async () => {
            vi.mocked(arbeidsgivereEndpoint.fetch).mockRejectedValue(httpError(451));
            await expect(fetchInitialData()).rejects.toEqual({
                status: RequestStatus.forbidden,
            });
        });

        it('mapper 401 fra arbeidsgivere til redirectingToLogin', async () => {
            vi.mocked(arbeidsgivereEndpoint.fetch).mockRejectedValue(httpError(401));
            await expect(fetchInitialData()).rejects.toEqual({
                status: RequestStatus.redirectingToLogin,
            });
        });

        /** Regresjon: http-status på AxiosError ble tidligere tolket som en RequestStatus,
         *  slik at appen rendret uten data i stedet for å vise feilsiden. */
        it('mapper 500 fra arbeidsgivere til error, ikke til http-statuskoden', async () => {
            vi.mocked(arbeidsgivereEndpoint.fetch).mockRejectedValue(httpError(500));
            await expect(fetchInitialData()).rejects.toMatchObject({
                status: RequestStatus.error,
            });
        });

        it('mapper 500 fra mellomlagring til error', async () => {
            vi.mocked(søknadStateEndpoint.fetch).mockRejectedValue(httpError(500));
            await expect(fetchInitialData()).rejects.toMatchObject({
                status: RequestStatus.error,
            });
        });

        it('mapper feil som ikke er http-feil til error', async () => {
            vi.mocked(arbeidsgivereEndpoint.fetch).mockRejectedValue(new TypeError('uventet'));
            await expect(fetchInitialData()).rejects.toMatchObject({
                status: RequestStatus.error,
            });
        });
    });
});

describe('fetchInitialData tilgang', () => {
    beforeEach(() => {
        settOppLykkeligSti();
    });

    it('returnerer data med endringsperioden fra backend', async () => {
        await expect(fetchInitialData()).resolves.toMatchObject({
            søker,
            k9saker: [gyldigSak],
            arbeidsgivere: [],
            tillattEndringsperiode,
        });
    });

    it('velger saken i endringsperioden når bruker også har en eldre sak', async () => {
        vi.mocked(sakerEndpoint.fetch).mockResolvedValue({ saker: [eldreSak, gyldigSak], antallUgyldige: 0 });
        await expect(fetchInitialData()).resolves.toMatchObject({ k9saker: [gyldigSak] });
    });

    it('gir årsakene fra backend og henter ikke saker når bruker ikke har tilgang', async () => {
        vi.mocked(tilgangEndpoint.fetch).mockResolvedValue({
            kanBruke: false,
            årsaker: [IngenTilgangÅrsak.harMerEnnEnSak],
        });
        await expect(fetchInitialData()).rejects.toEqual({
            status: RequestStatus.success,
            kanBrukeSøknad: false,
            årsak: [IngenTilgangÅrsak.harMerEnnEnSak],
            søker,
        });
        expect(sakerEndpoint.fetch).not.toHaveBeenCalled();
    });

    it.each([
        { beskrivelse: 'ingen aktuelle saker', saker: [eldreSak], antallAktuelle: 0 },
        { beskrivelse: 'flere aktuelle saker', saker: [gyldigSak, gyldigSak], antallAktuelle: 2 },
    ])('gir feilside og logger når frontend finner $beskrivelse etter tilgang', async ({ saker, antallAktuelle }) => {
        vi.mocked(sakerEndpoint.fetch).mockResolvedValue({ saker, antallUgyldige: 0 });
        await expect(fetchInitialData()).rejects.toMatchObject({ status: RequestStatus.error });
        expect(appLogger.logInfo).toHaveBeenCalledWith(
            `fetchInitialData.fantIkkeSak antallGyldigeSaker=${saker.length} antallAktuelleSaker=${antallAktuelle} antallUgyldigeSaker=0`,
        );
        expect(arbeidsgivereEndpoint.fetch).not.toHaveBeenCalled();
    });

    it('gir melding om ugyldig format når eneste aktuelle sak ikke kan leses', async () => {
        vi.mocked(sakerEndpoint.fetch).mockResolvedValue({ saker: [eldreSak], antallUgyldige: 1 });
        await expect(fetchInitialData()).rejects.toEqual({
            status: RequestStatus.success,
            kanBrukeSøknad: false,
            årsak: [IngenTilgangÅrsak.harUgyldigK9FormatSak],
            søker,
        });
    });
});
