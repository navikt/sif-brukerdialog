import { VStack } from '@navikt/ds-react';
import React from 'react';

import PageHeader from '../page-header/PageHeader';

interface Props {
    children: React.ReactNode;
    pageHeader?: React.ReactNode;
    documentTitle?: string;
}

const DefaultPageLayout = ({ children, pageHeader, documentTitle }: Props) => (
    <VStack gap="space-40" className="p-5 max-w-282 mx-auto">
        {pageHeader ? pageHeader : <PageHeader documentTitle={documentTitle} />}
        {children}
    </VStack>
);

export default DefaultPageLayout;
