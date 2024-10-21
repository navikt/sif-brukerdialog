import { vi } from 'vitest';
import { Attachment } from '../../types/Attachment';
import {
    attachmentShouldBeProcessed,
    attachmentShouldBeUploaded,
    attachmentUploadHasFailed,
    containsAnyUploadedAttachments,
    fileExtensionIsValid,
    getAttachmentFromFile,
    getPendingAttachmentFromFile,
    VALID_EXTENSIONS,
} from '../attachmentUtils';

const fileMock = new File([''], 'filename.png', { type: 'text/png' });
const invalidFileMock = new File([''], 'filename.docx', { type: 'text/png' });

vi.mock('@navikt/sif-common-env', () => ({
    getCommonEnv: () => ({}),
}));

describe('attachmentUtils', () => {
    describe('fileExtensionIsValid', () => {
        it('should only accept file extensions specified by VALID_EXTENSIONS', () => {
            for (const ext of VALID_EXTENSIONS) {
                expect(fileExtensionIsValid(ext)).toBe(true);
                expect(fileExtensionIsValid(ext.toUpperCase())).toBe(true);
            }
            expect(fileExtensionIsValid('asdf')).toBe(false);
        });
    });

    describe('getAttachmentFromFile', () => {
        it('should return a pending Attachment-object containing specified File and Attachment-specific properties', () => {
            const { pending, file, uploaded, url } = getAttachmentFromFile(fileMock);
            expect(file).toEqual(fileMock);
            expect(pending).toBe(false);
            expect(uploaded).toBe(false);
            expect(url).toBeUndefined();
        });
    });

    describe('getPendingAttachmentFromFile', () => {
        it('should return a pending Attachment-object containing specified File and Attachment-specific properties', () => {
            const { pending, file, uploaded, url } = getPendingAttachmentFromFile(fileMock);
            expect(file).toEqual(fileMock);
            expect(pending).toBe(true);
            expect(uploaded).toBe(false);
            expect(url).toBeUndefined();
        });
    });

    describe('attachmentShouldBeProcessed', () => {
        it('should return true if attachment is pending but has not been uploaded', () => {
            const attachment: Attachment = { file: fileMock, pending: true, uploaded: false };
            expect(attachmentShouldBeProcessed(attachment)).toBe(true);
        });

        it('should return false if attachment is not pending upload', () => {
            const attachment: Attachment = { file: fileMock, pending: false, uploaded: false };
            expect(attachmentShouldBeProcessed(attachment)).toBe(false);
        });

        it('should return false if attachment has been uploaded', () => {
            const attachment: Attachment = { file: fileMock, pending: false, uploaded: true };
            expect(attachmentShouldBeProcessed(attachment)).toBe(false);
        });
    });

    describe('attachmentShouldBeUploaded', () => {
        it('should return false if file extension is invalid', () => {
            const attachment: Attachment = { file: invalidFileMock, pending: true, uploaded: false };
            expect(attachmentShouldBeUploaded(attachment)).toBe(false);
        });

        it('should return false if file is not pending', () => {
            const attachment: Attachment = { file: fileMock, pending: false, uploaded: false };
            expect(attachmentShouldBeUploaded(attachment)).toBe(false);
        });

        it('should return true if file is pending and file extension is valid', () => {
            const attachment: Attachment = { file: fileMock, pending: true, uploaded: false };
            expect(attachmentShouldBeUploaded(attachment)).toBe(true);
        });
    });

    describe('attachmentUploadHasFailed', () => {
        let attachment: Attachment;

        beforeEach(() => {
            attachment = getAttachmentFromFile(fileMock);
        });

        it('should return true if attachment with valid extension is neither pending nor uploaded', () => {
            attachment.pending = false;
            expect(attachmentUploadHasFailed(attachment)).toBe(true);
        });

        it('should return false if attachment has valid extension and pending is true', () => {
            attachment.pending = true;
            expect(attachmentUploadHasFailed(attachment)).toBe(false);
        });

        it('should return true if attachment file extension is invalid', () => {
            const invalidAttachment = getAttachmentFromFile(invalidFileMock);
            expect(attachmentUploadHasFailed(invalidAttachment)).toBe(true);
        });
    });

    describe('containsAnyUploadedAttachments', () => {
        let uploadedAttachment: Attachment;
        let failedAttachment: Attachment;

        beforeEach(() => {
            uploadedAttachment = getAttachmentFromFile(fileMock);
            uploadedAttachment.uploaded = true;
            failedAttachment = getAttachmentFromFile(fileMock);
            failedAttachment.uploaded = false;
            failedAttachment.pending = false;
        });

        it('should return true if the provided list contains any successfully uploaded attachments', () => {
            expect(containsAnyUploadedAttachments([uploadedAttachment, failedAttachment])).toBe(true);
        });

        it('should return false if the provided list contains no successfully uploaded attachments', () => {
            expect(containsAnyUploadedAttachments([failedAttachment])).toBe(false);
        });

        it('should return false if the provided list is empty', () => {
            expect(containsAnyUploadedAttachments([])).toBe(false);
        });
    });
});
