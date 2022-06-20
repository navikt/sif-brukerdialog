import React from 'react';
import ContentWithHeader from '@navikt/sif-common-core/lib/components/content-with-header/ContentWithHeader';
import Box, { BoxMargin } from '@navikt/sif-common-core/lib/components/box/Box';

interface Props {
    header: string;
    margin?: BoxMargin;
}

const SummaryBlock: React.FunctionComponent<Props> = ({ header, margin = 'l', children }) => (
    <Box margin={margin}>
        <ContentWithHeader header={header}>{children}</ContentWithHeader>
    </Box>
);

export default SummaryBlock;
