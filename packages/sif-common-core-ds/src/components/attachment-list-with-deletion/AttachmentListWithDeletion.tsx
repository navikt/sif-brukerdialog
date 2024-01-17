import { FormattedMessage, useIntl } from 'react-intl';
import { Attachment } from '../../types/Attachment';
import intlHelper from '../../utils/intlUtils';
import AttachmentListElement from '../attachment-list-element/AttachmentListElement';
import DeleteButton from '../../atoms/delete-button/DeleteButton';
import LoadingSpinner from '../../atoms/loading-spinner/LoadingSpinner';
import UnstyledList from '../lists/unstyled-list/UnstyledList';

interface Props {
    attachments: Attachment[];
    onRemoveAttachmentClick: (attachment: Attachment) => void;
}

const AttachmentListWithDeletion = ({ attachments, onRemoveAttachmentClick }: Props) => {
    const intl = useIntl();
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
                                    ariaLabel={intlHelper(intl, 'common.vedleggsliste.fjernKnapp')}
                                    onClick={() => onRemoveAttachmentClick(attachment)}>
                                    <FormattedMessage id="common.vedleggsliste.fjernKnapp" />
                                </DeleteButton>
                            )
                        }
                    />
                ))}
        </UnstyledList>
    );
};

export default AttachmentListWithDeletion;
