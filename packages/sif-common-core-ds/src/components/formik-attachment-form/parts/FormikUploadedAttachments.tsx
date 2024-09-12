import { Box } from '@navikt/ds-react';
import { AxiosResponse } from 'axios';
import { useFormikContext } from 'formik';
import { useCoreIntl } from '../../../i18n/common.messages';
import { Attachment } from '../../../types';
import { containsAnyUploadedAttachments, fileExtensionIsValid } from '../../../utils/attachmentUtils';
import { removeElementFromArray } from '../../../utils/listUtils';
import AttachmentListWithDeletion from '../../attachment-list-with-deletion/AttachmentListWithDeletion';
import AttachmentList from '../../attachment-list/AttachmentList';

interface Props {
    fieldName: string;
    includeDeletionFunctionality: boolean;
    attachments?: Attachment[];
    noAttachmentsText?: string;
    showFileSize?: boolean;
    fixAttachmentURL: (a: Attachment) => Attachment;
    deleteFile: (url: string) => Promise<AxiosResponse<any, any>>;
}

const FormikUploadedAttachments: React.FunctionComponent<Props> = ({
    fieldName,
    includeDeletionFunctionality,
    attachments: vedlegg = [],
    noAttachmentsText,
    showFileSize,
    fixAttachmentURL,
    deleteFile,
}) => {
    const { text } = useCoreIntl();
    const { setFieldValue } = useFormikContext();

    const validAttachments: Attachment[] = vedlegg
        .filter(({ file }: Attachment) => fileExtensionIsValid(file.name))
        .map(fixAttachmentURL);

    if (!containsAnyUploadedAttachments(validAttachments)) {
        return <Box marginBlock="4">{noAttachmentsText || text('@core.formikAttachmentsList.noFilesUploaded')}</Box>;
    }

    return includeDeletionFunctionality ? (
        <AttachmentListWithDeletion
            showFileSize={showFileSize}
            attachments={validAttachments}
            onRemoveAttachmentClick={(attachment: Attachment) => {
                attachment.pending = true;
                setFieldValue(fieldName, validAttachments);
                if (attachment.url) {
                    deleteFile(attachment.url).finally(() =>
                        setFieldValue(fieldName, removeElementFromArray(attachment, validAttachments)),
                    );
                }
            }}
        />
    ) : (
        <AttachmentList attachments={validAttachments} showFileSize={showFileSize} />
    );
};

export default FormikUploadedAttachments;
