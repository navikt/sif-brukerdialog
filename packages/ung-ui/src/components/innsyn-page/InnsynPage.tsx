import { Box } from '@navikt/ds-react';
import PageBoundary from '@navikt/sif-common-core-ds/src/components/page-boundary/PageBoundary';
import { useDocumentTitle } from '@navikt/sif-common-hooks';
import React, { useEffect } from 'react';

import { useUngUiIntl } from '../../i18n';

interface Props {
    documentTitle: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

const PageContentWrapper = ({ children }: { children: React.ReactNode }) => (
    <PageBoundary>
        <Box paddingBlock="space-40" className="mx-auto">
            {children}
        </Box>
    </PageBoundary>
);

export const InnsynPage = ({ documentTitle, children, footer }: Props) => {
    const { text } = useUngUiIntl();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useDocumentTitle(documentTitle);
    return (
        <main aria-label={text('@ung-ui.pageLayout.main.ariaLabel')}>
            <PageContentWrapper>{children}</PageContentWrapper>
            {footer && (
                <Box
                    className="bg-[#FFEBC7]"
                    marginBlock={{ sm: 'space-32 space-0', xs: 'space-12 space-0' }}
                    paddingBlock={{ sm: 'space-32 space-0' }}>
                    <PageContentWrapper>{footer}</PageContentWrapper>
                </Box>
            )}
        </main>
    );
};
