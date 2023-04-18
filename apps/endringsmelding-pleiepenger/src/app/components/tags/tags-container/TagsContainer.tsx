import React, { HTMLProps } from 'react';
import './tagsContainer.scss';

interface Props extends HTMLProps<HTMLDivElement> {
    children: React.ReactNode;
}

const TagsContainer: React.FunctionComponent<Props> = ({ children, ...rest }) => {
    return (
        <span className="tagsContainer" {...rest}>
            {children}
        </span>
    );
};

export default TagsContainer;
