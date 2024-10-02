import { useFormikContext } from 'formik';
import { Attachment } from '../../types';
import AttachmentList, { AttachmentListProps } from '../attachment-list/AttachmentList';
import { removeElementFromArray } from '../../utils/listUtils';

interface Props extends Omit<AttachmentListProps, 'onDelete'> {
    fieldName: string;
    onDelete?: (attachment: Attachment) => Promise<any>;
}

const FormikAttachmentList = ({ fieldName, onDelete, ...props }: Props) => {
    const { setFieldValue } = useFormikContext();

    return (
        <AttachmentList
            {...props}
            onDelete={
                onDelete
                    ? async (attachment: Attachment) => {
                          attachment.pending = true;
                          setFieldValue(fieldName, props.attachments);
                          onDelete(attachment).finally(() => {
                              setFieldValue(fieldName, removeElementFromArray(attachment, props.attachments));
                          });
                      }
                    : undefined
            }
        />
    );
};

export default FormikAttachmentList;
