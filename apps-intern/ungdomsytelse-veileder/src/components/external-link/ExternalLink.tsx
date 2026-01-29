import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Link, LinkProps } from '@navikt/ds-react';

const ExternalLink = ({ children, ...props }: LinkProps) => (
    <Link {...props} target="_blank" rel="noreferrer noopener">
        {children}
        <ExternalLinkIcon aria-hidden="true" />
    </Link>
);

export default ExternalLink;
