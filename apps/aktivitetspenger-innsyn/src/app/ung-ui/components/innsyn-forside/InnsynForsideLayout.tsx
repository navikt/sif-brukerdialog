import { Box, VStack } from '@navikt/ds-react';
import { useDocumentTitle } from '@navikt/sif-common-hooks';
import React, { useEffect } from 'react';

import { useAppIntl } from '../../../i18n';
import PageContentWrapper from '../layout/PageContentWrapper';

interface Props {
    children: React.ReactNode;
    documentTitle: string;
    footer?: React.ReactNode;
}

const InnsynForsideLayout = ({ children, documentTitle, footer }: Props) => {
    const { text } = useAppIntl();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useDocumentTitle(documentTitle);
    return (
        <main aria-label={text('@ung-ui.pageLayout.main.ariaLabel')}>
            <PageContentWrapper>
                <VStack gap="space-40">{children}</VStack>
            </PageContentWrapper>
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

export default InnsynForsideLayout;
