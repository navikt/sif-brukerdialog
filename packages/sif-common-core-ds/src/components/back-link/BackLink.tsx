import React from 'react';
import { FormattedMessage } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { History } from 'history';
import Chevron from 'nav-frontend-chevron';
import Lenke from 'nav-frontend-lenker';
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
        <div className={`${bem.block} ${className}`} onClick={handleOnClick}>
            <Chevron className={bem.element('chevron')} type="venstre" />
            <Lenke className={bem.element('link')} href={href} ariaLabel={ariaLabel}>
                <FormattedMessage id="backlink.label" />
            </Lenke>
        </div>
    );
};

export default withRouter(BackLink);
