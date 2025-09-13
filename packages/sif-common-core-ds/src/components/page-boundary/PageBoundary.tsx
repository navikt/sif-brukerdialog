import React from 'react';
import './pageBoundary.scss';

interface Props {
    children: React.ReactNode;
}

const PageBoundary = ({ children }: Props) => <div className="pageBoundary">{children}</div>;

export default PageBoundary;
