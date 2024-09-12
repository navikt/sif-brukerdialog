import { Attachment } from '../../types/Attachment';
import AttachmentListElement from '../attachment-list-element/AttachmentListElement';
import UnstyledList from '../lists/unstyled-list/UnstyledList';

interface Props {
    attachments: Attachment[];
    showFileSize?: boolean;
}

const AttachmentList = ({ attachments, showFileSize, ...otherProps }: Props) => (
    <UnstyledList>
        {attachments
            .filter(({ pending, uploaded }) => uploaded || pending)
            .map((attachment, index) => (
                <AttachmentListElement
                    showFileSize={showFileSize}
                    attachment={attachment}
                    key={attachment.file.name + index}
                    {...otherProps}
                />
            ))}
    </UnstyledList>
);

export default AttachmentList;
