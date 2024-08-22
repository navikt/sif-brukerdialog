import * as React from 'react';
import AttachmentListWithDeletion from '@navikt/sif-common-core-ds/src/components/attachment-list-with-deletion/AttachmentListWithDeletion';
import AttachmentList from '@navikt/sif-common-core-ds/src/components/attachment-list/AttachmentList';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import {
    containsAnyUploadedAttachments,
    fileExtensionIsValid,
} from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { removeElementFromArray } from '@navikt/sif-common-core-ds/src/utils/listUtils';
import { useFormikContext } from 'formik';
import { deleteFile } from '../../api/api';
import { SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { fixAttachmentURL } from '../../utils/appAttachmentUtils';

interface Props {
    includeDeletionFunctionality: boolean;
    wrapNoAttachmentsInBox?: boolean;
}

const UploadedDocumentsList: React.FC<Props> = ({ includeDeletionFunctionality }) => {
    const { values, setFieldValue } = useFormikContext<SøknadFormValues>();

    const dokumenter: Attachment[] = values.fødselsattest
        .filter(({ file }: Attachment) => {
            return file && file.name ? fileExtensionIsValid(file.name) : false;
        })
        .map(fixAttachmentURL);

    if (dokumenter && !containsAnyUploadedAttachments(dokumenter)) {
        return null;
    }

    if (includeDeletionFunctionality) {
        return (
            <AttachmentListWithDeletion
                attachments={dokumenter}
                onRemoveAttachmentClick={(attachment: Attachment) => {
                    attachment.pending = true;
                    setFieldValue(SøknadFormField.fødselsattest, dokumenter);
                    if (attachment.url) {
                        deleteFile(attachment.url).then(
                            () => {
                                setFieldValue(
                                    SøknadFormField.fødselsattest,
                                    removeElementFromArray(attachment, dokumenter),
                                );
                            },
                            () => {
                                setFieldValue(
                                    SøknadFormField.fødselsattest,
                                    removeElementFromArray(attachment, dokumenter),
                                );
                            },
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
