import { Attachment, PersistedFile } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { getAttachmentsApiDataFromSøknadsdata } from '../getAttachmentsApiDataFromSøknadsdata';

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
        (window as any).appSettings = { FRONTEND_VEDLEGG_URL: 'http://localhost:8080/api' };
        const result = getAttachmentsApiDataFromSøknadsdata([uploadedAttachment]);
        expect(result.length).toBe(1);
        expect(result[0]).toEqual(uploadedAttachmentUrl);
    });
    it('does not include not uploaded attachments', () => {
        (window as any).appSettings = { FRONTEND_VEDLEGG_URL: 'http://localhost:8080/api' };
        const result = getAttachmentsApiDataFromSøknadsdata([uploadedAttachment, failedAttachment]);
        expect(result.length).toBe(1);
        expect(result[0]).toEqual(uploadedAttachmentUrl);
    });
    it('does not include attachments with no url', () => {
        (window as any).appSettings = { FRONTEND_VEDLEGG_URL: 'http://localhost:8080/api' };
        const result = getAttachmentsApiDataFromSøknadsdata([
            missingUrlAttachment,
            uploadedAttachment,
            failedAttachment,
        ]);
        expect(result.length).toBe(1);
        expect(result[0]).toEqual(uploadedAttachmentUrl);
    });
});
