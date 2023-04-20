import React from 'react';

export interface AriaTextProps {
    id?: string;
    children?: React.ReactNode;
    tag?: string;
}

const AriaText = ({ id, children, tag }: AriaTextProps) => {
    const tagName = tag || 'span';
    return React.createElement(tagName, { id, className: 'sr-only' }, children);
};
export default AriaText;
