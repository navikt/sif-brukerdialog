import { VStack } from '@navikt/ds-react';
import { useDocumentTitle } from '@navikt/sif-common-hooks';
import React from 'react';

interface Props {
    children: React.ReactNode;
    documentTitle: string;
}

const PageLayout = ({ children, documentTitle }: Props) => {
    useDocumentTitle(documentTitle);
    return (
        <VStack gap="10" className="p-10  max-w-[800px] mx-auto ">
            {children}
        </VStack>
    );
};

export default PageLayout;
