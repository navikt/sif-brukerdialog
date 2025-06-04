import React, { useEffect } from 'react';
import PageBoundary from '@navikt/sif-common-core-ds/src/components/page-boundary/PageBoundary';
import { useDocumentTitle } from '@navikt/sif-common-hooks';
import PageContentWrapper from './PageContentWrapper';

interface Props {
    documentTitle: string;
    children: React.ReactNode;
}

const DefaultPage = ({ documentTitle, children }: Props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useDocumentTitle(documentTitle);
    return (
        <div role="main" aria-label="Hovedinnhold">
            <PageContentWrapper>
                <PageBoundary>{children}</PageBoundary>
            </PageContentWrapper>
        </div>
    );
};

export default DefaultPage;
