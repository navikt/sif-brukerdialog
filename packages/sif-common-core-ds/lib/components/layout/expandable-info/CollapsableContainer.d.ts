import React from 'react';
import './collapsableContainer.less';
export interface Props {
    children: React.ReactNode;
    isOpen?: boolean;
    ariaLive?: 'assertive' | 'polite' | 'off';
    animated?: boolean;
}
declare const CollapsableContainer: ({ children, animated, isOpen, ariaLive }: Props) => JSX.Element;
export default CollapsableContainer;
