import { Attachment } from '../../types/Attachment';

import AttachmentListElement from '../attachment-list-element/AttachmentListElement';
import DeleteButton from '../../atoms/delete-button/DeleteButton';
import LoadingSpinner from '../../atoms/loading-spinner/LoadingSpinner';
import UnstyledList from '../lists/unstyled-list/UnstyledList';
import { CoreText, useCoreIntl } from '../../i18n/common.messages';

interface Props {
    attachments: Attachment[];
    onRemoveAttachmentClick: (attachment: Attachment) => void;
}

const AttachmentListWithDeletion = ({ attachments, onRemoveAttachmentClick }: Props) => {
    const { text } = useCoreIntl();
    return (
        <UnstyledList>
            {attachments
                .filter(({ pending, uploaded }) => uploaded || pending)
                .map((attachment, index) => (
                    <AttachmentListElement
                        attachment={attachment}
                        key={attachment.file.name + index}
                        renderRightAlignedContent={() =>
                            attachment.pending ? (
                                <LoadingSpinner type="XS" />
                            ) : (
                                <DeleteButton
                                    useTrashcan={false}
                                    ariaLabel={text('common.vedleggsliste.fjernKnapp')}
                                    onClick={() => onRemoveAttachmentClick(attachment)}>
                                    <CoreText id="common.vedleggsliste.fjernKnapp" />
                                </DeleteButton>
                            )
                        }
                    />
                ))}
        </UnstyledList>
    );
};

export default AttachmentListWithDeletion;
