import { describe, expect, it, vi } from 'vitest';

vi.mock('@sif/api/k9-prosessering', () => ({
    getVedleggApiUrl: (id: string) => `https://api.example.com/vedlegg/${id}`,
}));

import { toLegeerklæringFormValues, toSøknadsdata } from './legeerklæringStegUtils';
import { LegeerklæringFormFields } from './types';

describe('legeerklæringStegUtils', () => {
    it('mapper bare opplastede vedlegg til søknadsdata', () => {
        const uploadedFile = new File(['innhold'], 'legeerklaering.pdf', {
            type: 'application/pdf',
            lastModified: 123,
        });
        const pendingFile = new File(['innhold'], 'venter.pdf', {
            type: 'application/pdf',
            lastModified: 456,
        });

        const søknadsdata = toSøknadsdata({
            [LegeerklæringFormFields.vedlegg]: [
                {
                    file: uploadedFile,
                    pending: false,
                    uploaded: true,
                    error: false,
                    reasons: [],
                    canRetry: false,
                    info: { id: 'vedlegg-1', url: '/vedlegg/vedlegg-1' },
                },
                {
                    file: pendingFile,
                    pending: true,
                    uploaded: false,
                    error: false,
                    reasons: [],
                    canRetry: false,
                },
            ],
        });

        expect(søknadsdata).toEqual({
            vedlegg: [
                {
                    id: 'vedlegg-1',
                    url: '/vedlegg/vedlegg-1',
                    backendUrl: 'https://api.example.com/vedlegg/vedlegg-1',
                    name: 'legeerklaering.pdf',
                    size: uploadedFile.size,
                    type: 'application/pdf',
                    lastModified: 123,
                },
            ],
        });
    });

    it('ekskluderer filer med feil fra søknadsdata', () => {
        const errorFile = new File([], 'feil.pdf', { type: 'application/pdf' });

        const søknadsdata = toSøknadsdata({
            [LegeerklæringFormFields.vedlegg]: [
                {
                    file: errorFile,
                    pending: false,
                    uploaded: false,
                    error: true,
                    reasons: ['fileSize'],
                    canRetry: false,
                },
            ],
        });

        expect(søknadsdata.vedlegg).toHaveLength(0);
    });

    it('lager opplastede filer fra lagrede vedlegg', () => {
        const formValues = toLegeerklæringFormValues({
            vedlegg: [
                {
                    id: 'vedlegg-2',
                    url: '/vedlegg/vedlegg-2',
                    backendUrl: 'https://api.example.com/vedlegg/vedlegg-2',
                    name: 'dokument.jpg',
                    size: 2048,
                    type: 'image/jpeg',
                    lastModified: 789,
                },
            ],
        });

        expect(formValues[LegeerklæringFormFields.vedlegg]).toHaveLength(1);
        expect(formValues[LegeerklæringFormFields.vedlegg][0]).toMatchObject({
            pending: false,
            uploaded: true,
            error: false,
            info: { id: 'vedlegg-2', url: '/vedlegg/vedlegg-2' },
        });
        expect(formValues[LegeerklæringFormFields.vedlegg][0].file.name).toBe('dokument.jpg');
    });
});
