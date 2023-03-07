import { Link } from '@navikt/ds-react';
import React from 'react';
import { Attachment as DSAttachment } from '@navikt/ds-icons';
import { Attachment } from '../../types/Attachment';
import bemHelper from '../../utils/bemUtils';
import './attachmentLabel.scss';

interface Props {
    attachment: Attachment;
}

const bem = bemHelper('attachmentLabel');

const AttachmentLabel = ({ attachment: { url, file } }: Props) => (
    <span className={bem.block}>
        <span className={bem.element('icon')}>
            <DSAttachment title="Filikon" />
        </span>
        {url === undefined && <span>{file.name}</span>}
        {url !== undefined && (
            <Link className={bem.element('text')} href={url} target="_blank">
                {file.name}
            </Link>
        )}
    </span>
);

export default AttachmentLabel;
