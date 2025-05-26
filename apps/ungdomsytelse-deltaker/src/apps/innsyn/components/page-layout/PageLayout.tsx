import { Box, VStack } from '@navikt/ds-react';
import { useDocumentTitle } from '@navikt/sif-common-hooks';
import React from 'react';

interface Props {
    children: React.ReactNode;
    documentTitle: string;
    footer?: React.ReactNode;
}

const PageLayout = ({ children, documentTitle, footer }: Props) => {
    useDocumentTitle(documentTitle);
    return (
        <>
            <VStack gap="10" className="p-10  max-w-[800px] mx-auto ">
                {children}
            </VStack>
            {footer && (
                <Box className="bg-[#FFD9BA]" marginBlock="8 0">
                    <VStack gap="10" className="p-10 pb-0  max-w-[800px] mx-auto ">
                        {footer}
                    </VStack>
                </Box>
            )}
        </>
    );
};

export default PageLayout;
