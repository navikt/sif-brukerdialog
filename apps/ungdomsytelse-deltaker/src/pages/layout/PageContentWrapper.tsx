import { Box } from '@navikt/ds-react';
import { InnsynPageBoundary } from '@sif/ung-innsyn';
import React from 'react';

interface Props {
    children: React.ReactNode;
}

const PageContentWrapper = ({ children }: Props) => (
    <InnsynPageBoundary>
        <Box paddingBlock="space-40" className="mx-auto">
            {children}
        </Box>
    </InnsynPageBoundary>
);

export default PageContentWrapper;
