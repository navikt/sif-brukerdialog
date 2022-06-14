import React from 'react';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import ContentWithHeader from '@navikt/sif-common-core/lib/components/content-with-header/ContentWithHeader';

interface Props {
    header: string;
    children: React.ReactElement<any> | Array<React.ReactElement<any>> | React.ReactNode;
}

const SummaryBlock = ({ header, children }: Props) => (
    <Box margin="l">
        <ContentWithHeader header={header}>{children}</ContentWithHeader>
    </Box>
);

export default SummaryBlock;
