"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const sif_common_formik_ds_1 = require("@navikt/sif-common-formik-ds");
const apiUtils_1 = require("../../utils/apiUtils");
const fileUploaderUtils_1 = require("./fileUploaderUtils");
const FileUploader = ({ name, buttonLabel, value = [], uploadFile, onFileInputClick, onApiError, onErrorUploadingAttachments, onUnauthorizedOrForbiddenUpload, }) => {
    function findAttachmentsToProcess(attachments) {
        return attachments.filter(fileUploaderUtils_1.attachmentShouldBeProcessed);
    }
    function findAttachmentsToUpload(attachments) {
        return attachments.filter(fileUploaderUtils_1.attachmentShouldBeUploaded);
    }
    function updateAttachmentListElement(attachments, attachment, replaceFn) {
        replaceFn(attachments.indexOf(attachment), attachment);
    }
    function setAttachmentPendingToFalse(attachment) {
        attachment.pending = false;
        return attachment;
    }
    function addPendingAttachmentToFieldArray(file, pushFn) {
        const attachment = (0, fileUploaderUtils_1.getPendingAttachmentFromFile)(file);
        pushFn(attachment);
        return attachment;
    }
    function updateFailedAttachments(allAttachments, failedAttachments, replaceFn) {
        failedAttachments.forEach((attachment) => {
            attachment = setAttachmentPendingToFalse(attachment);
            updateAttachmentListElement(allAttachments, attachment, replaceFn);
        });
        const failedFiles = failedAttachments
            .map(({ file }) => file)
            .filter((f) => (0, fileUploaderUtils_1.isFileObject)(f));
        onErrorUploadingAttachments(failedFiles);
    }
    function uploadAttachment(attachment) {
        return __awaiter(this, void 0, void 0, function* () {
            const { file } = attachment;
            if ((0, fileUploaderUtils_1.isFileObject)(file)) {
                try {
                    const response = yield uploadFile(file);
                    attachment = setAttachmentPendingToFalse(attachment);
                    attachment.url = response.headers.location;
                    attachment.uploaded = true;
                }
                catch (error) {
                    if ((0, apiUtils_1.isForbidden)(error) || (0, apiUtils_1.isUnauthorized)(error)) {
                        onUnauthorizedOrForbiddenUpload();
                    }
                    else {
                        onApiError(error);
                    }
                    setAttachmentPendingToFalse(attachment);
                }
            }
        });
    }
    function uploadAttachments(allAttachments, replaceFn) {
        return __awaiter(this, void 0, void 0, function* () {
            const attachmentsToProcess = findAttachmentsToProcess(allAttachments);
            const attachmentsToUpload = findAttachmentsToUpload(attachmentsToProcess);
            const attachmentsNotToUpload = attachmentsToProcess.filter((el) => !attachmentsToUpload.includes(el));
            for (const attachment of attachmentsToUpload) {
                yield uploadAttachment(attachment);
                updateAttachmentListElement(allAttachments, attachment, replaceFn);
            }
            const failedAttachments = [...attachmentsNotToUpload, ...attachmentsToUpload.filter(fileUploaderUtils_1.attachmentUploadHasFailed)];
            updateFailedAttachments(allAttachments, failedAttachments, replaceFn);
        });
    }
    return (React.createElement(sif_common_formik_ds_1.FormikFileInput, { name: name, buttonLabel: buttonLabel, legend: "Dokumenter", accept: fileUploaderUtils_1.VALID_EXTENSIONS.join(', '), onFilesSelect: (files, { push, replace }) => __awaiter(void 0, void 0, void 0, function* () {
            const selectedFiles = files.map((file) => addPendingAttachmentToFieldArray(file, push));
            yield uploadAttachments([...value, ...selectedFiles], replace);
        }), onClick: onFileInputClick }));
};
exports.default = FileUploader;
