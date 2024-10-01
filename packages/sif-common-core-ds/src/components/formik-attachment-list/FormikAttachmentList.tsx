import { useFormikContext } from 'formik';
import { Attachment } from '../../types';
import AttachmentListV2, { AttachmentListV2Props } from '../attachment-list-v2/AttachmentListV2';
import { removeElementFromArray } from '../../utils/listUtils';

interface Props extends Omit<AttachmentListV2Props, 'onDelete'> {
    fieldName: string;
    onDelete?: (attachment: Attachment) => Promise<any>;
}

const FormikAttachmentList = ({ fieldName, attachments, emptyListText, showFileSize, onDelete }: Props) => {
    const { setFieldValue } = useFormikContext();

    return (
        <AttachmentListV2
            attachments={attachments}
            emptyListText={emptyListText}
            showFileSize={showFileSize}
            onDelete={
                onDelete
                    ? async (attachment: Attachment) => {
                          attachment.pending = true;
                          setFieldValue(fieldName, attachments);
                          onDelete(attachment).finally(() => {
                              setFieldValue(fieldName, removeElementFromArray(attachment, attachments));
                          });
                      }
                    : undefined
            }
        />
    );
};

export default FormikAttachmentList;
