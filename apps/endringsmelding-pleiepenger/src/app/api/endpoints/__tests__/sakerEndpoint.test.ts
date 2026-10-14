import { K9Format, K9FormatError } from '@app/types';
import { AxiosError } from 'axios';

vi.mock('@sif/apm', () => ({
    appLogger: { logInfo: vi.fn(), logException: vi.fn(), logApiError: vi.fn() },
}));

vi.mock('../../api', () => ({
    default: { innsyn: { get: vi.fn() } },
}));

vi.mock('@app/utils', () => ({
    getEndringsdato: vi.fn(() => new Date(2024, 5, 15)),
    getTillattEndringsperiode: vi.fn(() => ({ from: new Date(2024, 0, 1), to: new Date(2024, 11, 31) })),
    parseK9Format: vi.fn((sak) => sak),
}));

vi.mock('../../../utils/verifyk9Format', () => ({
    verifyK9Format: vi.fn(),
}));

import { appLogger } from '@sif/apm';

import { verifyK9Format } from '../../../utils/verifyk9Format';
import api from '../../api';
import { sakerEndpoint } from '../sakerEndpoint';

const k9format = (id: string) => ({ id }) as unknown as K9Format;

/** Parset sak - parseK9Format er mocket som identitet, så denne formen når bøttefordelingen. */
const parsetSak = (id: string, from: Date, to: Date) =>
    ({ id, ytelse: { søknadsperioder: [{ from, to }] } }) as unknown as K9Format;

/** Rå sak slik den kommer fra innsyn, med lesbare søknadsperioder. */
const råSak = (id: string, isoDateRange: string) =>
    ({ id, søknad: { ytelse: { søknadsperiode: [isoDateRange] } } }) as unknown as K9Format;

const k9FormatError = (ugyldigeFelt?: string[]): K9FormatError => ({
    type: 'k9formatError',
    error: new Error('ugyldig format', { cause: ugyldigeFelt ? { ugyldigeFelt } : undefined }),
});

describe('sakerEndpoint.fetch', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('splitter saker i k9Saker og eldreSaker basert på endringsperiode', async () => {
        const ny = parsetSak('ny', new Date(2024, 2, 1), new Date(2024, 2, 31));
        const gammel = parsetSak('gammel', new Date(2023, 0, 1), new Date(2023, 0, 31));
        vi.mocked(api.innsyn.get).mockResolvedValue({ data: [ny, gammel] } as any);
        vi.mocked(verifyK9Format).mockReturnValue(true as any);

        const result = await sakerEndpoint.fetch();

        expect(result.k9Saker).toEqual([ny]);
        expect(result.eldreSaker).toEqual([gammel]);
    });

    it('regner en sak uten søknadsperioder som aktuell, ikke som eldre', async () => {
        const utenPerioder = { id: 'tom', ytelse: { søknadsperioder: [] } } as unknown as K9Format;
        vi.mocked(api.innsyn.get).mockResolvedValue({ data: [utenPerioder] } as any);
        vi.mocked(verifyK9Format).mockReturnValue(true as any);

        const result = await sakerEndpoint.fetch();

        expect(result.k9Saker).toEqual([utenPerioder]);
        expect(result.eldreSaker).toEqual([]);
    });

    it('markerer en sak med ugyldig k9-format og logger info, ikke exception', async () => {
        vi.mocked(api.innsyn.get).mockResolvedValue({ data: [k9format('ugyldig')] } as any);
        vi.mocked(verifyK9Format).mockImplementation(() => {
            throw k9FormatError(['fornavn']);
        });

        const result = await sakerEndpoint.fetch();

        expect(result.k9Saker).toEqual([{ erUgyldigK9SakFormat: true, detaljer: { ugyldigeFelt: ['fornavn'] } }]);
        expect(appLogger.logInfo).toHaveBeenCalledWith(expect.stringContaining('fornavn'));
        expect(appLogger.logException).not.toHaveBeenCalled();
    });

    it('legger en gammel sak med ugyldig format i eldreSaker slik at den ikke blokkerer', async () => {
        vi.mocked(api.innsyn.get).mockResolvedValue({ data: [råSak('gammel', '2023-01-01/2023-01-31')] } as any);
        vi.mocked(verifyK9Format).mockImplementation(() => {
            throw k9FormatError(['fornavn']);
        });

        const result = await sakerEndpoint.fetch();

        expect(result.k9Saker).toEqual([]);
        expect(result.eldreSaker).toEqual([{ erUgyldigK9SakFormat: true, detaljer: { ugyldigeFelt: ['fornavn'] } }]);
    });

    it('lar en aktuell sak med ugyldig format blokkere', async () => {
        vi.mocked(api.innsyn.get).mockResolvedValue({ data: [råSak('aktuell', '2024-03-01/2024-03-31')] } as any);
        vi.mocked(verifyK9Format).mockImplementation(() => {
            throw k9FormatError(['fornavn']);
        });

        const result = await sakerEndpoint.fetch();

        expect(result.k9Saker).toEqual([{ erUgyldigK9SakFormat: true, detaljer: { ugyldigeFelt: ['fornavn'] } }]);
        expect(result.eldreSaker).toEqual([]);
    });

    it('logger og forkaster hele kallet ved uventet feil under parsing av en sak', async () => {
        vi.mocked(api.innsyn.get).mockResolvedValue({ data: [k9format('feiler')] } as any);
        vi.mocked(verifyK9Format).mockImplementation(() => {
            throw new TypeError('uventet');
        });

        await expect(sakerEndpoint.fetch()).rejects.toThrow('uventet');
        expect(appLogger.logException).toHaveBeenCalledWith(
            expect.any(TypeError),
            expect.objectContaining({ context: 'sakerEndpoint.parseK9Format' }),
        );
    });

    it('logger apifeil og forkaster ved feilende http-kall', async () => {
        const httpError = new AxiosError('feil', 'ERR_BAD_RESPONSE', {} as any, {}, { status: 500 } as any);
        vi.mocked(api.innsyn.get).mockRejectedValue(httpError);

        await expect(sakerEndpoint.fetch()).rejects.toBe(httpError);
        expect(appLogger.logApiError).toHaveBeenCalledWith(httpError, 'sakerEndpoint.fetch');
    });
});
