import { VStack } from '@navikt/ds-react';
import React from 'react';
import PageHeader from '../page-header/PageHeader';

interface Props {
    children: React.ReactNode;
    pageHeader?: React.ReactNode;
}

const DefaultPageLayout: React.FunctionComponent<Props> = ({ children, pageHeader }) => (
    <VStack gap="10" className="p-5 max-w-[1128px] mx-auto">
        {pageHeader ? pageHeader : <PageHeader />}
        {children}
    </VStack>
);

export default DefaultPageLayout;
