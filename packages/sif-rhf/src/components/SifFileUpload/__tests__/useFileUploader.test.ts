import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { FileUploadErrorReason } from '../fileUploadErrorUtils';
import { useFileUploader } from '../useFileUploader';

const makeFile = (name = 'file.jpg') => new File(['content'], name, { type: 'image/jpeg' });

const uploadFile = vi.fn().mockResolvedValue({ id: 'id-1', url: 'http://example.com/id-1' });
const deleteFile = vi.fn().mockResolvedValue(undefined);

beforeEach(() => vi.clearAllMocks());

describe('useFileUploader', () => {
    it('laster opp valgt fil og markerer den som uploaded', async () => {
        const file = makeFile();
        const { result } = renderHook(() => useFileUploader({ uploadFile, deleteFile }));

        await act(() => result.current.onSelect([{ file, error: false }]));

        expect(uploadFile).toHaveBeenCalledWith(file);
        expect(result.current.acceptedFiles[0].uploaded).toBe(true);
        expect(result.current.acceptedFiles[0].info).toEqual({ id: 'id-1', url: 'http://example.com/id-1' });
    });

    it('legger filer avvist av dropzone (fileType) i rejectedFiles uten å laste opp', async () => {
        const file = makeFile();
        const { result } = renderHook(() => useFileUploader({ uploadFile, deleteFile }));

        await act(() => result.current.onSelect([{ file, error: true, reasons: ['fileType'] } as any]));

        expect(uploadFile).not.toHaveBeenCalled();
        expect(result.current.rejectedFiles[0].reasons).toEqual(['fileType']);
    });

    it('setter canRetry ved ECONNABORTED-feil', async () => {
        const failingUpload = vi.fn().mockRejectedValue(new Error('ECONNABORTED'));
        const { result } = renderHook(() => useFileUploader({ uploadFile: failingUpload, deleteFile }));

        await act(() => result.current.onSelect([{ file: makeFile(), error: false }]));

        expect(result.current.rejectedFiles[0].canRetry).toBe(true);
    });

    it('klassifiserer 400-feil som BAD_REQUEST', async () => {
        const failingUpload = vi.fn().mockRejectedValue({ response: { status: 400 } });
        const { result } = renderHook(() => useFileUploader({ uploadFile: failingUpload, deleteFile }));

        await act(() => result.current.onSelect([{ file: makeFile(), error: false }]));

        expect(result.current.rejectedFiles[0].reasons).toEqual([FileUploadErrorReason.BAD_REQUEST]);
        expect(result.current.rejectedFiles[0].canRetry).toBe(false);
    });

    it('onRemove kaller deleteFile og fjerner filen', async () => {
        const file = makeFile();
        const initial = [
            {
                file,
                pending: false,
                uploaded: true,
                error: false,
                reasons: [],
                canRetry: false,
                info: { id: 'rem-1', url: 'u' },
            },
        ];
        const { result } = renderHook(() => useFileUploader({ initialFiles: initial, uploadFile, deleteFile }));

        await act(() => result.current.onRemove(result.current.acceptedFiles[0]));

        expect(deleteFile).toHaveBeenCalledWith('rem-1');
        expect(result.current.acceptedFiles).toHaveLength(0);
    });

    it('onRetryUpload laster opp filen på nytt og flytter den til acceptedFiles', async () => {
        const file = makeFile();
        const initial = [
            { file, pending: false, uploaded: false, error: true, reasons: ['ECONNABORTED'], canRetry: true },
        ];
        const { result } = renderHook(() => useFileUploader({ initialFiles: initial, uploadFile, deleteFile }));

        await act(() => result.current.onRetryUpload(result.current.rejectedFiles[0]));

        expect(uploadFile).toHaveBeenCalledWith(file);
        expect(result.current.acceptedFiles[0].uploaded).toBe(true);
        expect(result.current.rejectedFiles).toHaveLength(0);
    });
});
