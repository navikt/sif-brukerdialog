import { Box, VStack } from '@navikt/ds-react';
import { InnsynPageBoundary } from '@sif/ung-innsyn';
import { useDocumentTitle } from '@navikt/sif-common-hooks';
import { useAppIntl } from '@shared/i18n';
import React, { useEffect } from 'react';

interface Props {
    children: React.ReactNode;
    documentTitle: string;
    footer?: React.ReactNode;
}

const ForsidePageLayout = ({ children, documentTitle, footer }: Props) => {
    const { text } = useAppIntl();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useDocumentTitle(documentTitle);
    return (
        <main aria-label={text('pageLayout.main.ariaLabel')}>
            <InnsynPageBoundary paddingBlock="space-40">
                <VStack gap="space-40">{children}</VStack>
            </InnsynPageBoundary>
            {footer && (
                <Box
                    className="bg-[#FFEBC7]"
                    marginBlock={{ sm: 'space-32 space-0', xs: 'space-12 space-0' }}
                    paddingBlock={{ sm: 'space-32 space-0' }}>
                    <InnsynPageBoundary paddingBlock="space-40">{footer}</InnsynPageBoundary>
                </Box>
            )}
        </main>
    );
};

export default ForsidePageLayout;
