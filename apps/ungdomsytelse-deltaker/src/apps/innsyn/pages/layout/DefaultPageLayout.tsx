import React, { useEffect } from 'react';
import { useDocumentTitle } from '@navikt/sif-common-hooks';
import PageContentWrapper from './PageContentWrapper';

interface Props {
    documentTitle: string;
    children: React.ReactNode;
}

const DefaultPageLayout = ({ documentTitle, children }: Props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useDocumentTitle(documentTitle);
    return (
        <div role="main" aria-label="Hovedinnhold">
            <PageContentWrapper>{children}</PageContentWrapper>
        </div>
    );
};

export default DefaultPageLayout;
