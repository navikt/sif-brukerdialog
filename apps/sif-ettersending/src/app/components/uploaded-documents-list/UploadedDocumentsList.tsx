import { useFormikContext } from 'formik';
import AttachmentListWithDeletion from '@navikt/sif-common-core-ds/src/components/attachment-list-with-deletion/AttachmentListWithDeletion';
import AttachmentList from '@navikt/sif-common-core-ds/src/components/attachment-list/AttachmentList';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import {
    containsAnyUploadedAttachments,
    fileExtensionIsValid,
} from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { removeElementFromArray } from '@navikt/sif-common-core-ds/src/utils/listUtils';
import api from '../../api/api';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import { attachmentUtils } from '@navikt/sif-common-soknad-ds/src';

interface Props {
    includeDeletionFunctionality: boolean;
    wrapNoAttachmentsInBox?: boolean;
    onFileDeleted?: () => void;
}

const UploadedDocumentsList = ({ includeDeletionFunctionality, onFileDeleted }: Props) => {
    const { values, setFieldValue } = useFormikContext<SoknadFormData>();

    const dokumenter: Attachment[] = values.dokumenter
        .filter(({ file }: Attachment) => fileExtensionIsValid(file.name))
        .map((a) => ({ ...a, url: a.url ? attachmentUtils.fixMissingApiInFrontendURL(a.url) : undefined }));

    if (!containsAnyUploadedAttachments(dokumenter)) {
        return null;
    }

    if (includeDeletionFunctionality) {
        return (
            <AttachmentListWithDeletion
                attachments={dokumenter}
                onRemoveAttachmentClick={(attachment: Attachment) => {
                    attachment.pending = true;
                    setFieldValue(SoknadFormField.dokumenter, dokumenter);
                    if (attachment.url) {
                        api.deleteFile(attachment.url).then(
                            () => {
                                setFieldValue(
                                    SoknadFormField.dokumenter,
                                    removeElementFromArray(attachment, dokumenter),
                                );
                            },
                            () => {
                                setFieldValue(
                                    SoknadFormField.dokumenter,
                                    removeElementFromArray(attachment, dokumenter),
                                );
                            },
                        );
                        if (onFileDeleted) {
                            onFileDeleted();
                        }
                    }
                }}
            />
        );
    } else {
        return <AttachmentList attachments={dokumenter} />;
    }
};

export default UploadedDocumentsList;
