import { VStack } from '@navikt/ds-react';
import React from 'react';

import { maxPageWidth } from '../../../constants';
import PageHeader from '../page-header/PageHeader';

interface Props {
    children: React.ReactNode;
    pageHeader?: React.ReactNode;
    documentTitle?: string;
}

const DefaultPageLayout = ({ children, pageHeader, documentTitle }: Props) => (
    <VStack
        gap="space-40"
        maxWidth={maxPageWidth}
        marginInline="auto"
        paddingInline="space-6 space-6"
        paddingBlock="space-6 space-48">
        {pageHeader ? pageHeader : <PageHeader documentTitle={documentTitle} />}
        <div>{children}</div>
    </VStack>
);

export default DefaultPageLayout;
