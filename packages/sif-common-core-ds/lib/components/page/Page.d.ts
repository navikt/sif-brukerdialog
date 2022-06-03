import React from 'react';
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
declare const Page: ({ id, className, title, topContentRenderer, children }: PageProps) => JSX.Element;
export default Page;
