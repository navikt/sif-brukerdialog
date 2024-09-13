import React from 'react';
import { Attachment } from '../../types/Attachment';
import bemHelper from '../../utils/bemUtils';
import AttachmentLabel from '../attachment-label/AttachmentLabel';
import './attachmentListElement.scss';

const listElementBem = bemHelper(`attachmentListElement`);

interface Props {
    attachment: Attachment;
    showFileSize?: boolean;
    renderRightAlignedContent?: () => React.ReactNode;
}

const formatFileSize = (sizeInBytes: number): string => {
    const sizeInKB = sizeInBytes / 1024;
    const sizeInMB = sizeInBytes / 1048576;

    if (sizeInMB >= 1) {
        return `${sizeInMB.toFixed(2)} MB`;
    } else {
        return `${sizeInKB.toFixed(2)} KB`;
    }
};

const AttachmentListElement = ({ attachment, renderRightAlignedContent, showFileSize }: Props) => (
    <li className={listElementBem.block}>
        <span className={listElementBem.element('label')}>
            <AttachmentLabel attachment={attachment} />
            {showFileSize && ` (${formatFileSize(attachment.file.size)})`}
        </span>
        {renderRightAlignedContent && (
            <span className={listElementBem.element('rightAlignedContent')}>{renderRightAlignedContent()}</span>
        )}
    </li>
);

export default AttachmentListElement;
