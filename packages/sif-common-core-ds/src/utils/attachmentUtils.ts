import { Attachment, PersistedFile } from '../types/Attachment';
import imageCompression from 'browser-image-compression';

export const VALID_EXTENSIONS = ['.pdf', '.jpeg', '.jpg', '.png'];
export const MAX_FILESIZE_FOR_UPLOAD = 7999999;
export const MAX_TOTAL_ATTACHMENT_SIZE_IN_MB = 24;
export const MAX_TOTAL_ATTACHMENT_SIZE_BYTES = 1000 * 1000 * MAX_TOTAL_ATTACHMENT_SIZE_IN_MB;

const VEDLEGG_ID_SPLIT_KEY = 'vedlegg/';

export const getAttachmentsInIdArray = ({
    ids,
    attachments,
}: {
    ids: string[] | undefined;
    attachments: Attachment[] | undefined;
}) => {
    if (!attachments || !ids) {
        return [];
    }
    return (attachments || []).filter((a) => a.info && ids.includes(a.info.location));
};

export const getAttachmentsApiData = (attachments: Attachment[]): string[] => {
    const apiData: string[] = [];
    attachments.forEach(({ info }) => {
        if (info) {
            apiData.push(info.location);
        }
    });
    return apiData;
};

export const getUploadedAttachments = (attachments: Attachment[]): Attachment[] =>
    attachments.filter((attachment) => attachmentHasBeenUploaded(attachment));

export const getTotalSizeOfAttachments = (attachments: Attachment[]): number =>
    attachments
        .filter((attachment: Attachment) => attachment.uploaded)
        .map((attachment: Attachment) => attachment.file.size)
        .reduce((prev, curr) => prev + curr, 0);

export const fileExtensionIsValid = (filename: string): boolean => {
    const ext = filename.split('.').pop();
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

export const attachmentIsUploadedAndIsValidFileFormat = (attachment: Attachment): boolean =>
    attachmentHasBeenUploaded(attachment) && fileExtensionIsValid(attachment.file.name);

export const containsAnyUploadedAttachments = (attachmentList: Attachment[]) =>
    attachmentList.length > 0 && attachmentList.length !== attachmentList.filter(attachmentUploadHasFailed).length;

export type CompressOptions = {
    maxSizeMB: number;
    maxWidthOrHeight?: number;
};

export async function compressImageFile(imageFile: File, { maxSizeMB, maxWidthOrHeight }: CompressOptions) {
    if (imageFile.size / 1024 / 1024 < maxSizeMB) {
        return imageFile;
    }

    if (imageFile.type.toLowerCase() === 'image/jpeg') {
        const options = {
            maxSizeMB,
            maxWidthOrHeight,
            useWebWorker: true,
        };

        const compressedFile = await imageCompression(imageFile, options);
        return compressedFile;
    } else return imageFile;
}

export const hasPendingAttachments = (attachments: Attachment[]): boolean =>
    (attachments || []).find((a: any) => a.pending === true) !== undefined;

export const hasExceededMaxTotalSizeOfAttachments = (attachments: Attachment[]): boolean =>
    getTotalSizeOfAttachments(attachments) > MAX_TOTAL_ATTACHMENT_SIZE_BYTES;

export const getAttachmentId = (url: string = ''): string => {
    const id = url.split(VEDLEGG_ID_SPLIT_KEY)[1];
    if (!id || id.length === 0) {
        throw new Error('Kunne ikke hente vedleggId fra url');
    }
    return id;
};
