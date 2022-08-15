import { Link } from '@navikt/ds-react';
import React from 'react';
import { Attachment } from '../../types/Attachment';
import bemHelper from '../../utils/bemUtils';
import AttachmentIcon from './AttachmentIcon';
import './attachmentLabel.scss';

interface Props {
    attachment: Attachment;
}

const attachmentLabelBem = bemHelper('attachmentLabel');

const AttachmentLabel = ({ attachment: { url, file } }: Props) => (
    <span>
        <span className="attachmentIcon ">
            <AttachmentIcon height={20} width={20} />
        </span>
        {url === undefined && <div className={attachmentLabelBem.element('text')}>{file.name}</div>}
        {url !== undefined && (
            <Link className={attachmentLabelBem.element('text')} href={url} target="_blank">
                {file.name}
            </Link>
        )}
    </span>
);

export default AttachmentLabel;
