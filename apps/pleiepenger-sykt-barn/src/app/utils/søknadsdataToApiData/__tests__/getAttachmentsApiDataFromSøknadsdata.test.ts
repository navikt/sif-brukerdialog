import { Attachment, PersistedFile } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { getAttachmentsApiDataFromSøknadsdata } from '../getAttachmentsApiDataFromSøknadsdata';
import { vi } from 'vitest';

vi.mock('@navikt/sif-common/src/env/commonEnv', () => {
    return {
        getEnvironmentVariable: () => 'http://localhost:8089',
        getMaybeEnvironmentVariable: () => 'http://localhost:8089',
        getApiEnv: () => () => 'http://localhost:8089',
        API_ENV: {
            K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: 'K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH',
            K9_BRUKERDIALOG_PROSESSERING_API_URL: 'K9_BRUKERDIALOG_PROSESSERING_API_URL',
        },
    };
});

describe('getAttachmentsApiDataFromSøknadsdata', () => {
    const persistedFile: PersistedFile = {
        isPersistedFile: true,
        lastModified: 123,
        name: 'abc.pdf',
        size: 100,
        type: 'file/pdf',
    };

    const uploadedAttachmentUrl = 'abc';
    const uploadedAttachment: Attachment = {
        file: persistedFile,
        pending: false,
        uploaded: true,
        url: uploadedAttachmentUrl,
    };

    const failedAttachmentUrl = 'fail';
    const failedAttachment: Attachment = {
        file: persistedFile,
        pending: false,
        uploaded: false,
        url: failedAttachmentUrl,
    };

    const missingUrlAttachment: Attachment = {
        file: persistedFile,
        pending: false,
        uploaded: true,
        url: undefined,
    };

    it('returns an array with strings when all attachments has url', () => {
        (window as any).appSettings = {
            K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: 'http://localhost:8080/api',
            K9_BRUKERDIALOG_PROSESSERING_API_URL: 'http://localhost:8089',
        };
        const result = getAttachmentsApiDataFromSøknadsdata([uploadedAttachment]);
        expect(result.length).toBe(1);
        expect(result[0]).toEqual(uploadedAttachmentUrl);
    });
    it('does not include not uploaded attachments', () => {
        (window as any).appSettings = {
            K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: 'http://localhost:8080/api',
            K9_BRUKERDIALOG_PROSESSERING_API_URL: 'http://localhost:8089',
        };
        const result = getAttachmentsApiDataFromSøknadsdata([uploadedAttachment, failedAttachment]);
        expect(result.length).toBe(1);
        expect(result[0]).toEqual(uploadedAttachmentUrl);
    });
    it('does not include attachments with no url', () => {
        (window as any).appSettings = {
            K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: 'http://localhost:8080/api',
            K9_BRUKERDIALOG_PROSESSERING_API_URL: 'http://localhost:8089',
        };
        const result = getAttachmentsApiDataFromSøknadsdata([
            missingUrlAttachment,
            uploadedAttachment,
            failedAttachment,
        ]);
        expect(result.length).toBe(1);
        expect(result[0]).toEqual(uploadedAttachmentUrl);
    });
});
