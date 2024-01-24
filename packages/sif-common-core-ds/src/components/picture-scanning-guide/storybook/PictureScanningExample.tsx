import { BodyLong, Heading } from '@navikt/ds-react';
import React from 'react';
import StatusIkon, { StatusIconStatusKey } from '../status-icon/StatusIcon';

interface Props {
    image: React.ReactNode;
    status: StatusIconStatusKey;
    statusText: string;
    description: string;
}

const PictureScanningExample = ({ image, status, statusText, description }: Props) => (
    <BodyLong as="div">
        <div>{image}</div>
        <Heading size="xsmall" level="4" spacing={true} style={{ display: 'flex', gap: '.25rem' }}>
            <StatusIkon status={status} />
            <span>{statusText}</span>
        </Heading>
        <p>{description}</p>
    </BodyLong>
);

export default PictureScanningExample;
