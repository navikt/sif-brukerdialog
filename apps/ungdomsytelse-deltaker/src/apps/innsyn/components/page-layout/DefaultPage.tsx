import React, { useEffect } from 'react';
import PageBoundary from '@navikt/sif-common-core-ds/src/components/page-boundary/PageBoundary';
import { useDocumentTitle } from '@navikt/sif-common-hooks';
import PageContentWrapper from './PageContentWrapper';

interface Props {
    title: string;
    children: React.ReactNode;
}

const DefaultPage = ({ title, children }: Props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useDocumentTitle(title);
    return (
        <PageContentWrapper>
            <PageBoundary>{children}</PageBoundary>
        </PageContentWrapper>
    );
};

export default DefaultPage;
