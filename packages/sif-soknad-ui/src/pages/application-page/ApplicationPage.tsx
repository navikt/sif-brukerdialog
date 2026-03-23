import { Page, VStack } from '@navikt/ds-react';
import { useDocumentTitle } from '@navikt/sif-common-hooks';
import { useEffect } from 'react';

import { AppHeader } from '../../components/app-header/AppHeader';

interface Props {
    documentTitle?: string;
    applicationTitle: string;
    headerLevel?: '1' | '2';
    children: React.ReactNode;
}

export function ApplicationPage({ documentTitle, applicationTitle, headerLevel = '2', children }: Props) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fullDocumentTitle = `${documentTitle ? `${documentTitle} - ` : ''}${applicationTitle}`;

    useDocumentTitle(fullDocumentTitle);

    return (
        <Page>
            <Page.Block as="main" width="md" gutters>
                <VStack gap="space-40" marginBlock="space-24">
                    <AppHeader title={applicationTitle} level={headerLevel} />
                    <div>{children}</div>
                </VStack>
            </Page.Block>
        </Page>
    );
}
