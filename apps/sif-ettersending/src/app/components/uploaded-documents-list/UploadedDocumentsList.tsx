import * as React from 'react';
import { useFormikContext } from 'formik';
import AttachmentListWithDeletion from '@navikt/sif-common-core-ds/lib/components/attachment-list-with-deletion/AttachmentListWithDeletion';
import AttachmentList from '@navikt/sif-common-core-ds/lib/components/attachment-list/AttachmentList';
import { Attachment } from '@navikt/sif-common-core-ds/lib/types/Attachment';
import {
    containsAnyUploadedAttachments,
    fileExtensionIsValid,
} from '@navikt/sif-common-core-ds/lib/utils/attachmentUtils';
import { removeElementFromArray } from '@navikt/sif-common-core-ds/lib/utils/listUtils';
import { deleteFile } from '../../api/api';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';

interface Props {
    includeDeletionFunctionality: boolean;
    wrapNoAttachmentsInBox?: boolean;
}

const UploadedDocumentsList = ({ includeDeletionFunctionality }: Props) => {
    const { values, setFieldValue } = useFormikContext<SoknadFormData>();

    const dokumenter: Attachment[] = values.dokumenter.filter(({ file }: Attachment) =>
        fileExtensionIsValid(file.name)
    );

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
                        deleteFile(attachment.url).then(
                            () => {
                                setFieldValue(
                                    SoknadFormField.dokumenter,
                                    removeElementFromArray(attachment, dokumenter)
                                );
                            },
                            () => {
                                setFieldValue(
                                    SoknadFormField.dokumenter,
                                    removeElementFromArray(attachment, dokumenter)
                                );
                            }
                        );
                    }
                }}
            />
        );
    } else {
        return <AttachmentList attachments={dokumenter} />;
    }
};

export default UploadedDocumentsList;
