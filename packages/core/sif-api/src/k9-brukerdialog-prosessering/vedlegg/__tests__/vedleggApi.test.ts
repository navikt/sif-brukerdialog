import { AxiosError, type AxiosResponse } from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { lagreVedleggMock, finnesVedleggMock } = vi.hoisted(() => ({
    lagreVedleggMock: vi.fn(),
    finnesVedleggMock: vi.fn(),
}));

vi.mock('@sif/k9-brukerdialog-prosessering-api', async (importOriginal) => {
    const original = await importOriginal<typeof import('@sif/k9-brukerdialog-prosessering-api')>();
    return {
        ...original,
        VedleggController: {
            ...original.VedleggController,
            lagreVedlegg: lagreVedleggMock,
            finnesVedlegg: finnesVedleggMock,
        },
    };
});

import { finnesVedlegg, getVedleggIdFromResponseHeaderLocation, lagreVedlegg } from '../vedleggApi';

const responseError = (status: number, code?: string) =>
    new AxiosError('Opplasting feilet', code, undefined, undefined, {
        status,
    } as AxiosResponse);

beforeEach(() => vi.clearAllMocks());

describe('getVedleggIdFromResponseHeaderLocation', () => {
    it('returnerer vedleggId fra location-header', () => {
        expect(getVedleggIdFromResponseHeaderLocation('/vedlegg/abc123')).toBe('abc123');
    });

    it('kaster tydelig feil når location-header mangler', () => {
        expect(() => getVedleggIdFromResponseHeaderLocation(undefined)).toThrow(
            'Kunne ikke hente vedleggId fordi response header Location mangler',
        );
    });

    it('kaster feil når location-header ikke inneholder vedleggId', () => {
        expect(() => getVedleggIdFromResponseHeaderLocation('/api/vedlegg/')).toThrow(
            'Kunne ikke hente vedleggId fra url',
        );
    });
});

describe('lagreVedlegg', () => {
    it('bevarer timeout-feilen slik at opplasting kan prøves på nytt', async () => {
        const error = responseError(408, 'ECONNABORTED');
        lagreVedleggMock.mockRejectedValueOnce(error);

        await expect(lagreVedlegg(new Blob(['innhold']))).rejects.toBe(error);
    });

    it('bevarer 400-responsen slik at opplastingen får riktig feilmelding', async () => {
        const error = responseError(400);
        lagreVedleggMock.mockRejectedValueOnce(error);

        await expect(lagreVedlegg(new Blob(['innhold']))).rejects.toBe(error);
    });
});

describe('finnesVedlegg', () => {
    it('sender vedleggIder og returnerer status per vedlegg', async () => {
        const data = [
            { vedleggId: 'a', finnes: true },
            { vedleggId: 'b', finnes: false },
        ];
        finnesVedleggMock.mockResolvedValueOnce({ data });

        await expect(finnesVedlegg(['a', 'b'])).resolves.toEqual(data);
        expect(finnesVedleggMock).toHaveBeenCalledWith({ body: { vedleggIder: ['a', 'b'] } });
    });

    it('kaster ApiError når kallet feiler', async () => {
        finnesVedleggMock.mockRejectedValueOnce(responseError(500));

        await expect(finnesVedlegg(['a'])).rejects.toMatchObject({ context: 'finnesVedlegg' });
    });
});
