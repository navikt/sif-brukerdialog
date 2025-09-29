import './page.scss';

import { useDocumentTitle } from '@navikt/sif-common-hooks';
import React, { useEffect } from 'react';

import PageBoundary from '../page-boundary/PageBoundary';

interface PageProps {
    className?: string;
    title: string;
    id?: string;
    topContentRenderer?: () => React.ReactElement<any>;
    children: React.ReactNode;
}

const Page = ({ id = 'pageMainContent', className = '', title, topContentRenderer, children }: PageProps) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useDocumentTitle(title);
    return (
        <div role="main" aria-label="Hovedinnhold" id={id}>
            {topContentRenderer && topContentRenderer()}
            <PageBoundary>
                <div className={`page ${className}`}>{children}</div>
            </PageBoundary>
        </div>
    );
};

export default Page;
