import React from 'react';
import './pageBoundary.scss';

interface Props {
    children: React.ReactNode;
}

const PageBoundary: React.FunctionComponent<Props> = ({ children }) => <div className="pageBoundary">{children}</div>;

export default PageBoundary;
