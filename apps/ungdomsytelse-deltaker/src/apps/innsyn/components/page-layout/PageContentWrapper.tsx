import { Box } from '@navikt/ds-react';
import PageBoundary from '@navikt/sif-common-core-ds/src/components/page-boundary/PageBoundary';
import React from 'react';

interface Props {
    children: React.ReactNode;
}

const PageContentWrapper = ({ children }: Props) => (
    <PageBoundary>
        <Box className="md:pb-10 sm:pb-0 mx-auto">{children}</Box>
    </PageBoundary>
);

export default PageContentWrapper;
