import { BodyLong, Box, Heading } from '@navikt/ds-react';
import React from 'react';
import { HeadingLevel } from '../../../utils/headingLevelUtils';
import StatusIkon, { StatusIconStatusKey } from '../status-icon/StatusIcon';

interface Props {
    image: React.ReactNode;
    status: StatusIconStatusKey;
    statusText: string;
    description: string;
    headingLevel?: HeadingLevel;
}

const PictureScanningExample = ({ image, status, statusText, description, headingLevel = '4' }: Props) => (
    <BodyLong as="div">
        <Box marginBlock="0 4">{image}</Box>
        <Heading size="xsmall" level={headingLevel} spacing={true} style={{ display: 'flex', gap: '.25rem' }}>
            <StatusIkon status={status} />
            <span>{statusText}</span>
        </Heading>
        <p>{description}</p>
    </BodyLong>
);

export default PictureScanningExample;
