import React from 'react';
import PageContentWrapper from './PageContentWrapper';
import { Page } from '@navikt/ds-react';

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
