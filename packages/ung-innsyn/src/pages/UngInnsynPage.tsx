import { Box } from '@navikt/ds-react';
import { useDocumentTitle } from '@navikt/sif-common-hooks';
import React, { useEffect } from 'react';

import { useUngUiIntl } from '../i18n';
import { InnsynPageBoundary } from '../components/innsyn-page-boundary/InnsynPageBoundary';

interface Props {
    documentTitle: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

const PageContentWrapper = ({ children }: { children: React.ReactNode }) => (
    <InnsynPageBoundary>
        <Box paddingBlock="space-40">{children}</Box>
    </InnsynPageBoundary>
);

export const UngInnsynPage = ({ documentTitle, children, footer }: Props) => {
    const { text } = useUngUiIntl();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useDocumentTitle(documentTitle);
    return (
        <main aria-label={text('@ungInnsyn.pageLayout.main.ariaLabel')}>
            <PageContentWrapper>{children}</PageContentWrapper>
            {footer && (
                <Box
                    style={{ backgroundColor: '#FFEBC7' }}
                    marginBlock={{ sm: 'space-32 space-0', xs: 'space-12 space-0' }}
                    paddingBlock={{ sm: 'space-32 space-0' }}>
                    <PageContentWrapper>{footer}</PageContentWrapper>
                </Box>
            )}
        </main>
    );
};
