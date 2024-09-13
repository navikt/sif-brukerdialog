import DeleteButton from '../../atoms/delete-button/DeleteButton';
import LoadingSpinner from '../../atoms/loading-spinner/LoadingSpinner';
import { CoreText, useCoreIntl } from '../../i18n/common.messages';
import { Attachment } from '../../types/Attachment';
import AttachmentListElement from '../attachment-list-element/AttachmentListElement';
import UnstyledList from '../lists/unstyled-list/UnstyledList';

interface Props {
    attachments: Attachment[];
    showFileSize?: boolean;
    onRemoveAttachmentClick: (attachment: Attachment) => void;
}

const AttachmentListWithDeletion = ({ attachments, showFileSize, onRemoveAttachmentClick }: Props) => {
    const { text } = useCoreIntl();
    return (
        <UnstyledList>
            {attachments
                .filter(({ pending, uploaded }) => uploaded || pending)
                .map((attachment, index) => (
                    <AttachmentListElement
                        attachment={attachment}
                        showFileSize={showFileSize}
                        key={attachment.file.name + index}
                        renderRightAlignedContent={() =>
                            attachment.pending ? (
                                <LoadingSpinner type="XS" />
                            ) : (
                                <DeleteButton
                                    useTrashcan={false}
                                    ariaLabel={text('@core.formikAttachmentsList.delete')}
                                    onClick={() => onRemoveAttachmentClick(attachment)}>
                                    <CoreText id="@core.formikAttachmentsList.delete" />
                                </DeleteButton>
                            )
                        }
                    />
                ))}
        </UnstyledList>
    );
};

export default AttachmentListWithDeletion;
