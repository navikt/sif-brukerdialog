import React, { useEffect } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import './page.less';

interface PageProps {
    className?: string;
    title: string;
    id?: string;
    setMainRole?: boolean;
    ariaLabel?: string;
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
            <div className={`page ${className}`}>{children}</div>
        </div>
    );
};

export default Page;
