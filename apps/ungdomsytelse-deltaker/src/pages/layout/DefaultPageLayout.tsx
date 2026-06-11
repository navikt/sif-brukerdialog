import { useDocumentTitle } from '@navikt/sif-common-hooks';
import { useAppIntl } from '@shared/i18n';
import { InnsynPageBoundary } from '@sif/ung-innsyn';
import React, { useEffect } from 'react';

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
            <InnsynPageBoundary paddingBlock="space-40">{children}</InnsynPageBoundary>
        </main>
    );
};

export default DefaultPageLayout;
