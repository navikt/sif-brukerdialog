import React from 'react';
import PageContentWrapper from './PageContentWrapper';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';

interface Props {
    title: string;
    children: React.ReactNode;
}

const DefaultPage = ({ title, children }: Props) => (
    <Page title={title}>
        <PageContentWrapper>{children}</PageContentWrapper>
    </Page>
);

export default DefaultPage;
