import { Link, LinkProps } from '@navikt/ds-react';

const ExternalLink = ({ children, ...props }: LinkProps) => (
    <Link {...props} target="_blank" rel="noreferrer noopener">
        {children}
    </Link>
);

export default ExternalLink;
