import { Box } from '@navikt/ds-react';
import React from 'react';

interface Props {
    children: React.ReactNode;
}

const PageContentWrapper = ({ children }: Props) => (
    <Box paddingBlock="space-40" marginInline="auto" maxWidth="704px">
        {children}
    </Box>
);

export default PageContentWrapper;
