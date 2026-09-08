import { K9Format, K9FormatError } from '@app/types';
import { AxiosError } from 'axios';

vi.mock('@sif/apm', () => ({
    appLogger: { logInfo: vi.fn(), logException: vi.fn(), logApiError: vi.fn() },
}));

vi.mock('../../api', () => ({
    default: { innsyn: { get: vi.fn() } },
}));

vi.mock('@app/utils', () => ({
    getEndringsdato: vi.fn(() => new Date()),
    getTillattEndringsperiode: vi.fn(() => ({ from: new Date(), to: new Date() })),
    isK9SakErInnenforGyldigEndringsperiode: vi.fn(),
    parseK9Format: vi.fn((sak) => sak),
}));

vi.mock('../../../utils/verifyk9Format', () => ({
    verifyK9Format: vi.fn(),
}));

import { isK9SakErInnenforGyldigEndringsperiode } from '@app/utils';
import { appLogger } from '@sif/apm';

import { verifyK9Format } from '../../../utils/verifyk9Format';
import api from '../../api';
import sakerEndpoint from '../sakerEndpoint';

const k9format = (id: string) => ({ id }) as unknown as K9Format;

const k9FormatError = (ugyldigeFelt?: string[]): K9FormatError => ({
    type: 'k9formatError',
    error: new Error('ugyldig format', { cause: ugyldigeFelt ? { ugyldigeFelt } : undefined }),
});

describe('sakerEndpoint.fetch', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('splitter saker i k9Saker og eldreSaker basert på endringsperiode', async () => {
        vi.mocked(api.innsyn.get).mockResolvedValue({ data: [k9format('ny'), k9format('gammel')] } as any);
        vi.mocked(verifyK9Format).mockReturnValue(true as any);
        vi.mocked(isK9SakErInnenforGyldigEndringsperiode).mockReturnValueOnce(true).mockReturnValueOnce(false);

        const result = await sakerEndpoint.fetch();

        expect(result.k9Saker).toEqual([k9format('ny')]);
        expect(result.eldreSaker).toEqual([k9format('gammel')]);
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
