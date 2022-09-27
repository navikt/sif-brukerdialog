import { Link } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Back } from '@navikt/ds-icons';
import bemUtils from '../../utils/bemUtils';
import './backLink.scss';

interface BackLinkProps {
    className?: string;
    href: string;
    ariaLabel?: string;
    onClick?: (href: string, event: React.SyntheticEvent) => void;
}

type Props = BackLinkProps;
const bem = bemUtils('backLink');
const BackLink = ({ className, href, onClick, ariaLabel }: Props) => {
    const navigate = useNavigate();

    const handleOnClick = (event: React.SyntheticEvent) => {
        if (onClick) {
            onClick(href, event);
        } else {
            event.preventDefault();
            navigate(href);
        }
    };

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
        <div className={`${bem.block} ${className || ''}`} onClick={handleOnClick}>
            <span className={bem.element('chevron')}>
                <Back />
            </span>
            <Link className={bem.element('link')} href={href} aria-label={ariaLabel}>
                <FormattedMessage id="backlink.label" />
            </Link>
        </div>
    );
};

export default BackLink;
