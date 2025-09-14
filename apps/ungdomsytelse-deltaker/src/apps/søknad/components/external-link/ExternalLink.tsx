import { Link, LinkProps } from '@navikt/ds-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';

const ExternalLink = ({ children, ...rest }: LinkProps) => {
    return (
        <Link style={{ display: 'inline' }} {...rest} target={rest.target || '_blank'}>
            <span>{children}</span>
            <span className="inline-block pl-1">
                <ExternalLinkIcon aria-hidden="true" />
            </span>
        </Link>
    );
};

export default ExternalLink;
