import { Box } from '@navikt/ds-react';
import React from 'react';

interface Props {
    children: React.ReactNode;
}

const PageContentWrapper = ({ children }: Props) => (
    <Box paddingBlock="space-40" className="mx-auto max-w-176">
        {children}
    </Box>
);

export default PageContentWrapper;
