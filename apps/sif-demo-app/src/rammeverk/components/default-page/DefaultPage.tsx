import { Page } from '@navikt/ds-react';
import { useDocumentTitle } from '@navikt/sif-common-hooks';
import { useEffect } from 'react';

interface Props {
    documentTitle: string;
    children: React.ReactNode;
}

export const DefaultPage = ({ documentTitle, children }: Props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useDocumentTitle(documentTitle);

    return (
        <Page>
            <Page.Block as="main" width="md" gutters>
                {children}
            </Page.Block>
        </Page>
    );
};
