import { Link } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Back } from '@navikt/ds-icons';
import { History } from 'history';
import bemUtils from '../../utils/bemUtils';
import './backLink.scss';

interface BackLinkProps {
    className?: string;
    href: string;
    ariaLabel?: string;
    onClick?: (href: string, history: History, event: React.SyntheticEvent) => void;
}

type Props = BackLinkProps & RouteComponentProps;
const bem = bemUtils('backLink');
const BackLink = ({ className, href, history, onClick, ariaLabel }: Props) => {
    const navigate = () => history.push(href);

    const handleOnClick = (event: React.SyntheticEvent) => {
        if (onClick) {
            onClick(href, history, event);
        } else {
            event.preventDefault();
            navigate();
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

export default withRouter(BackLink);
