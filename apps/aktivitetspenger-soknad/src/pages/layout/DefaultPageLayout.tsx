import { useDocumentTitle } from '@navikt/sif-common-hooks';
import React, { useEffect } from 'react';

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
        <main aria-label="Hovedinnhold">
            <PageContentWrapper>{children}</PageContentWrapper>
        </main>
    );
};

export default DefaultPageLayout;
