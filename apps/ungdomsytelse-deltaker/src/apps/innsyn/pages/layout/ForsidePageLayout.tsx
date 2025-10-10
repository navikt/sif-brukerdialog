import { Box, VStack } from '@navikt/ds-react';
import { useDocumentTitle } from '@navikt/sif-common-hooks';
import { useAppIntl } from '@shared/i18n';
import PageContentWrapper from '@shared/pages/layout/PageContentWrapper';
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
            <PageContentWrapper>
                <VStack gap="10">{children}</VStack>
            </PageContentWrapper>
            {footer && (
                <Box className="bg-[#FFEBC7]" marginBlock={{ sm: '8 0', xs: '3 0' }} paddingBlock={{ sm: '8 0' }}>
                    <PageContentWrapper>{footer}</PageContentWrapper>
                </Box>
            )}
        </main>
    );
};

export default ForsidePageLayout;
