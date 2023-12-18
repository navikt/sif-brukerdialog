import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Back } from '@navikt/ds-icons';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import './backLink.less';
import { Link } from '@navikt/ds-react';

interface BackLinkProps {
    className?: string;
    href: string;
    ariaLabel?: string;
}

type Props = BackLinkProps;
const bem = bemUtils('backLink');
const BackLink = ({ className, href, ariaLabel }: Props) => {
    const navigate = useNavigate();
    return (
        <div className={`${bem.block} ${className}`}>
            <Link
                className={bem.element('link')}
                href={href}
                aria-label={ariaLabel}
                onClick={(evt) => {
                    evt.preventDefault();
                    evt.stopPropagation();
                    navigate(href);
                }}>
                <Back className={bem.element('chevron')} type="venstre" />
                <FormattedMessage id="backlink.label" />
            </Link>
        </div>
    );
};

export default BackLink;
