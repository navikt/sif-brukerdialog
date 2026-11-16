import type { NextApiRequest, NextApiResponse } from 'next';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { fetchDocumentStream } from '../../../server/fetchers/fetchDocumentStream';
import { handler as dokumentHandler } from '../dokument/[...info].api';
import { handler as arbeidsgivermeldingHandler } from '../soknad/[id]/arbeidsgivermelding.api';

vi.mock('../../../auth/withAuthentication', () => ({
    withAuthenticatedApi: (handler: unknown) => handler,
}));

vi.mock('../../../server/fetchers/fetchDocumentStream', () => ({
    fetchDocumentStream: vi.fn(),
}));

const lagRes = () => {
    const res = { status: vi.fn(), json: vi.fn() };
    res.status.mockReturnValue(res);
    return res;
};

const kall = async (handler: typeof dokumentHandler, query: NextApiRequest['query']) => {
    const res = lagRes();
    await handler({ query } as NextApiRequest, res as unknown as NextApiResponse);
    return res;
};

describe('API-ruter med ugyldig input', () => {
    beforeEach(() => {
        vi.mocked(fetchDocumentStream).mockReset();
    });

    describe('arbeidsgivermelding', () => {
        it.each([
            ['søknadId mangler', { organisasjonsnummer: '123456789' }],
            ['søknadId har ugyldige tegn', { id: '../x', organisasjonsnummer: '123456789' }],
            ['organisasjonsnummer mangler', { id: 'abc' }],
            ['organisasjonsnummer har ugyldig format', { id: 'abc', organisasjonsnummer: '12ab' }],
        ])('svarer 400 når %s', async (_, query) => {
            const res = await kall(arbeidsgivermeldingHandler, query);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Ugyldig forespørsel' });
            expect(fetchDocumentStream).not.toHaveBeenCalled();
        });
    });

    describe('dokument', () => {
        it.each([
            ['stien har for få segmenter', { info: ['a', 'b'], dokumentTittel: 'Tittel' }],
            ['et segment har ugyldige tegn', { info: ['a', '..', 'c'], dokumentTittel: 'Tittel' }],
            ['dokumentTittel mangler', { info: ['a', 'b', 'c'] }],
            ['dokumentTittel har ugyldige tegn', { info: ['a', 'b', 'c'], dokumentTittel: '<script>' }],
        ])('svarer 400 når %s', async (_, query) => {
            const res = await kall(dokumentHandler, query);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Ugyldig forespørsel' });
            expect(fetchDocumentStream).not.toHaveBeenCalled();
        });
    });
});
