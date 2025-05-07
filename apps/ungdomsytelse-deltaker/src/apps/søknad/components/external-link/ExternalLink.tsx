import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Link, LinkProps } from '@navikt/ds-react';

const ExternalLink = ({ children, ...rest }: LinkProps) => {
    return (
        <Link
            style={{ display: 'inline' }}
            {...rest}
            target={rest.target || '_blank'}
            aria-description={rest['aria-description'] || 'Åpnes i nytt vindu'}>
            <span>{children}</span>
            <span className="inline-block">
                <ExternalLinkIcon role="presentation" aria-hidden="true" />
            </span>
        </Link>
    );
};

export default ExternalLink;
