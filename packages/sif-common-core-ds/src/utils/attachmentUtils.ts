import { Attachment, PersistedFile } from '../types/Attachment';

export const VALID_EXTENSIONS = ['.pdf', '.jpeg', '.jpg', '.png'];

export const MAX_FILESIZE_FOR_UPLOAD = 9999999;
export const MAX_TOTAL_ATTACHMENT_SIZE_IN_MB = 24;
export const MAX_TOTAL_ATTACHMENT_SIZE_BYTES = 1000 * 1000 * MAX_TOTAL_ATTACHMENT_SIZE_IN_MB;

export const getTotalSizeOfAttachments = (attachments: Attachment[]): number =>
    attachments
        .filter((attachment: Attachment) => attachment.uploaded)
        .map((attachment: Attachment) => attachment.file.size)
        .reduce((prev, curr) => prev + curr, 0);

export const fileExtensionIsValid = (filename: string): boolean => {
    const ext = filename.split('.').pop();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return VALID_EXTENSIONS.includes(`.${ext!.toLowerCase()}`);
};

export const fileSizeIsValid = (size: number): boolean => {
    return MAX_FILESIZE_FOR_UPLOAD >= size;
};

export const isFileObject = (file: File | PersistedFile): file is File => (file as any).isPersistedFile !== true;

export const mapFileToPersistedFile = ({ name, lastModified, type, size }: File | PersistedFile): PersistedFile => ({
    isPersistedFile: true,
    name,
    lastModified,
    type,
    size,
});

export const getAttachmentFromFile = (file: File): Attachment => ({
    file,
    pending: false,
    uploaded: false,
});

export const getPendingAttachmentFromFile = (file: File): Attachment => {
    const newAttachment = getAttachmentFromFile(file);
    newAttachment.pending = true;
    return newAttachment;
};

export const attachmentShouldBeProcessed = ({ pending, uploaded }: Attachment): boolean => pending && !uploaded;

export const attachmentShouldBeUploaded = (attachment: Attachment): boolean =>
    attachmentShouldBeProcessed(attachment) &&
    fileExtensionIsValid(attachment.file.name) &&
    fileSizeIsValid(attachment.file.size);

export const attachmentUploadHasFailed = ({ pending, uploaded, file: { name } }: Attachment): boolean =>
    (!pending && !uploaded) || !fileExtensionIsValid(name);

export const attachmentHasBeenUploaded = ({ pending, uploaded, file: { name } }: Attachment): boolean =>
    !pending && uploaded && fileExtensionIsValid(name);

export const containsAnyUploadedAttachments = (attachmentList: Attachment[]) =>
    attachmentList &&
    attachmentList.length > 0 &&
    attachmentList.length !== attachmentList.filter(attachmentUploadHasFailed).length;
