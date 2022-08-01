import { BodyLong, Heading } from '@navikt/ds-react';
import React from 'react';
import StatusIkon, { StatusIconStatusKey } from './status-icon/StatusIcon';

interface Props {
    image: React.ReactNode;
    status: StatusIconStatusKey;
    statusText: string;
    description: string;
}

const PictureScanningExample = ({ image, status, statusText, description }: Props) => (
    <BodyLong as="div">
        <div className="pl-4 mb-3">{image}</div>
        <Heading size="xsmall" level="4" spacing={true} className="flex">
            <StatusIkon status={status} />
            <span className="pl-2">{statusText}</span>
        </Heading>
        <p>{description}</p>
    </BodyLong>
);

export default PictureScanningExample;
