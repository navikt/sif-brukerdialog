"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.containsAnyUploadedAttachments = exports.attachmentHasBeenUploaded = exports.attachmentUploadHasFailed = exports.attachmentShouldBeUploaded = exports.attachmentShouldBeProcessed = exports.getPendingAttachmentFromFile = exports.getAttachmentFromFile = exports.mapFileToPersistedFile = exports.isFileObject = exports.fileSizeIsValid = exports.fileExtensionIsValid = exports.getTotalSizeOfAttachments = exports.MAX_TOTAL_ATTACHMENT_SIZE_BYTES = exports.MAX_TOTAL_ATTACHMENT_SIZE_IN_MB = exports.MAX_FILESIZE_FOR_UPLOAD = exports.VALID_EXTENSIONS = void 0;
exports.VALID_EXTENSIONS = ['.pdf', '.jpeg', '.jpg', '.png'];
exports.MAX_FILESIZE_FOR_UPLOAD = 9999999;
exports.MAX_TOTAL_ATTACHMENT_SIZE_IN_MB = 24;
exports.MAX_TOTAL_ATTACHMENT_SIZE_BYTES = 1000 * 1000 * exports.MAX_TOTAL_ATTACHMENT_SIZE_IN_MB;
const getTotalSizeOfAttachments = (attachments) => attachments
    .filter((attachment) => attachment.uploaded)
    .map((attachment) => attachment.file.size)
    .reduce((prev, curr) => prev + curr, 0);
exports.getTotalSizeOfAttachments = getTotalSizeOfAttachments;
const fileExtensionIsValid = (filename) => {
    const ext = filename.split('.').pop();
    return exports.VALID_EXTENSIONS.includes(`.${ext.toLowerCase()}`);
};
exports.fileExtensionIsValid = fileExtensionIsValid;
const fileSizeIsValid = (size) => {
    return exports.MAX_FILESIZE_FOR_UPLOAD >= size;
};
exports.fileSizeIsValid = fileSizeIsValid;
const isFileObject = (file) => file.isPersistedFile !== true;
exports.isFileObject = isFileObject;
const mapFileToPersistedFile = (_a) => {
    var { name, lastModified, type, size } = _a, rest = __rest(_a, ["name", "lastModified", "type", "size"]);
    return ({
        isPersistedFile: true,
        name,
        lastModified,
        type,
        size,
    });
};
exports.mapFileToPersistedFile = mapFileToPersistedFile;
const getAttachmentFromFile = (file) => ({
    file,
    pending: false,
    uploaded: false,
});
exports.getAttachmentFromFile = getAttachmentFromFile;
const getPendingAttachmentFromFile = (file) => {
    const newAttachment = (0, exports.getAttachmentFromFile)(file);
    newAttachment.pending = true;
    return newAttachment;
};
exports.getPendingAttachmentFromFile = getPendingAttachmentFromFile;
const attachmentShouldBeProcessed = ({ pending, uploaded }) => pending && !uploaded;
exports.attachmentShouldBeProcessed = attachmentShouldBeProcessed;
const attachmentShouldBeUploaded = (attachment) => (0, exports.attachmentShouldBeProcessed)(attachment) &&
    (0, exports.fileExtensionIsValid)(attachment.file.name) &&
    (0, exports.fileSizeIsValid)(attachment.file.size);
exports.attachmentShouldBeUploaded = attachmentShouldBeUploaded;
const attachmentUploadHasFailed = ({ pending, uploaded, file: { name } }) => (!pending && !uploaded) || !(0, exports.fileExtensionIsValid)(name);
exports.attachmentUploadHasFailed = attachmentUploadHasFailed;
const attachmentHasBeenUploaded = ({ pending, uploaded, file: { name } }) => !pending && uploaded && (0, exports.fileExtensionIsValid)(name);
exports.attachmentHasBeenUploaded = attachmentHasBeenUploaded;
const containsAnyUploadedAttachments = (attachmentList) => attachmentList &&
    attachmentList.length > 0 &&
    attachmentList.length !== attachmentList.filter(exports.attachmentUploadHasFailed).length;
exports.containsAnyUploadedAttachments = containsAnyUploadedAttachments;
