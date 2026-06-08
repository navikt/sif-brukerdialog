import { useDocumentTitle } from '@navikt/sif-common-hooks';
import { useAppIntl } from '@shared/i18n';
import React, { useEffect } from 'react';

import PageContentWrapper from './PageContentWrapper';

interface Props {
    documentTitle: string;
    children: React.ReactNode;
}

const DefaultPageLayout = ({ documentTitle, children }: Props) => {
    const { text } = useAppIntl();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useDocumentTitle(documentTitle);
    return (
        <main aria-label={text('pageLayout.main.ariaLabel')}>
            <PageContentWrapper>{children}</PageContentWrapper>
        </main>
    );
};

export default DefaultPageLayout;
