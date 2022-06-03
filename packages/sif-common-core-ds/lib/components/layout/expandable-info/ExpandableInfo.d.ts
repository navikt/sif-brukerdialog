import React from 'react';
import './expandableInfo.less';
interface Props {
    children: React.ReactNode;
    title?: string;
    closeTitle?: string;
    initialOpen?: boolean;
    filledBackground?: boolean;
}
declare const ExpandableInfo: ({ children, initialOpen, closeTitle, title, filledBackground }: Props) => JSX.Element;
export default ExpandableInfo;
