import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Link, LinkProps } from '@navikt/ds-react';

const ExternalLink = ({ children, ...rest }: LinkProps) => {
    return (
        <Link style={{ display: 'inline' }} {...rest} target={rest.target || '_blank'}>
            <span>{children}</span>
            <span className="inline-block pl-1">
                <ExternalLinkIcon role="presentation" />
            </span>
        </Link>
    );
};

export default ExternalLink;
