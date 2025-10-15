import { Box } from '@navikt/ds-react';
import PageBoundary from '@navikt/sif-common-core-ds/src/components/page-boundary/PageBoundary';
import React from 'react';

interface Props {
    children: React.ReactNode;
}

const PageContentWrapper = ({ children }: Props) => (
    <PageBoundary>
        <Box paddingBlock="10" className="mx-auto">
            {children}
        </Box>
    </PageBoundary>
);

export default PageContentWrapper;
