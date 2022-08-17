import React from 'react';
import { Attachment } from '../../types/Attachment';
import bemHelper from '../../utils/bemUtils';
import AttachmentLabel from '../attachment-label/AttachmentLabel';
import './attachmentListElement.scss';

const listElementBem = bemHelper(`attachmentListElement`);

interface Props {
    attachment: Attachment;
    renderRightAlignedContent?: () => React.ReactNode;
}

const AttachmentListElement = ({ attachment, renderRightAlignedContent }: Props) => (
    <li className={listElementBem.block}>
        <span className={listElementBem.element('label')}>
            <AttachmentLabel attachment={attachment} />
        </span>
        {renderRightAlignedContent && (
            <span className={listElementBem.element('rightAlignedContent')}>{renderRightAlignedContent()}</span>
        )}
    </li>
);

export default AttachmentListElement;
