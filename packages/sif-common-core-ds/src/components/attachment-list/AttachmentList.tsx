import React from 'react';
import { Attachment } from '../../types/Attachment';
import AttachmentListElement from '../attachment-list-element/AttachmentListElement';
import UnstyledList from '../unstyled-list/UnstyledList';

interface Props {
    attachments: Attachment[];
}

const AttachmentList = ({ attachments, ...otherProps }: Props) => (
    <UnstyledList>
        {attachments
            .filter(({ pending, uploaded }) => uploaded || pending)
            .map((attachment, index) => (
                <AttachmentListElement attachment={attachment} key={attachment.file.name + index} {...otherProps} />
            ))}
    </UnstyledList>
);

export default AttachmentList;
