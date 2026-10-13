import './pageBoundary.scss';

import React from 'react';

interface Props {
    children: React.ReactNode;
}

const PageBoundary = ({ children }: Props) => <div className="pageBoundary">{children}</div>;

export default PageBoundary;
