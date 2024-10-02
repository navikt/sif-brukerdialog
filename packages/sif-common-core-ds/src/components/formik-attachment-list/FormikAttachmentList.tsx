import { useFormikContext } from 'formik';
import { Attachment } from '../../types';
import AttachmentList, { AttachmentListProps } from '../attachment-list/AttachmentList';
import { removeElementFromArray } from '../../utils/listUtils';

interface Props extends Omit<AttachmentListProps, 'onDelete'> {
    fieldName: string;
    onDelete?: (attachment: Attachment) => Promise<any>;
}

const FormikAttachmentList = ({ fieldName, attachments, emptyListText, showFileSize, onDelete }: Props) => {
    const { setFieldValue } = useFormikContext();

    return (
        <AttachmentList
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
