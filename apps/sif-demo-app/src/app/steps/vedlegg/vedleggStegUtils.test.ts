import { describe, expect, it } from 'vitest';

import { toVedleggFormValues, toVedleggSøknadsdata } from './vedleggStegUtils';

describe('vedleggStegUtils', () => {
    it('hydrerer lagrede vedlegg til UploadedFile-format', () => {
        const result = toVedleggFormValues({
            vedlegg: [
                {
                    id: 'vedlegg-1',
                    url: '/vedlegg/vedlegg-1',
                    name: 'test.pdf',
                    size: 1234,
                    type: 'application/pdf',
                    lastModified: 1000,
                },
            ],
        });

        expect(result.vedlegg).toHaveLength(1);
        expect(result.vedlegg[0]).toMatchObject({
            uploaded: true,
            pending: false,
            error: false,
            info: { id: 'vedlegg-1', url: '/vedlegg/vedlegg-1' },
        });
        expect(result.vedlegg[0].file.name).toBe('test.pdf');
    });

    it('mapper bare opplastede filer til søknadsdata', () => {
        const uploadedFile = {
            file: new File(['innhold'], 'ok.pdf', { type: 'application/pdf', lastModified: 2000 }),
            uploaded: true,
            pending: false,
            error: false,
            reasons: [],
            canRetry: false,
            info: { id: 'vedlegg-2', url: '/vedlegg/vedlegg-2' },
        };
        const pendingFile = {
            file: new File(['innhold'], 'venter.pdf', { type: 'application/pdf', lastModified: 3000 }),
            uploaded: false,
            pending: true,
            error: false,
            reasons: [],
            canRetry: false,
        };

        const result = toVedleggSøknadsdata({
            vedlegg: [uploadedFile, pendingFile],
        });

        expect(result.vedlegg).toEqual([
            {
                id: 'vedlegg-2',
                url: '/vedlegg/vedlegg-2',
                name: 'ok.pdf',
                size: uploadedFile.file.size,
                type: 'application/pdf',
                lastModified: 2000,
            },
        ]);
    });
});