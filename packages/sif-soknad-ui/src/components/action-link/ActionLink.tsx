import { Link } from '@navikt/ds-react';
import React from 'react';

interface Props {
    className?: string;
    onClick: () => void;
    ariaLabel?: string;
    children: React.ReactNode;
}

const ActionLink = ({ onClick, children, className, ariaLabel }: Props) => {
    return (
        <Link
            className={className}
            href="#"
            aria-label={ariaLabel}
            onClick={(evt) => {
                evt.stopPropagation();
                evt.preventDefault();
                onClick();
            }}>
            {children}
        </Link>
    );
};

export default ActionLink;
