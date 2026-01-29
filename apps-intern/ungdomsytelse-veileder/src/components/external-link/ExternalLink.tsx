import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Link, LinkProps } from '@navikt/ds-react';

const ExternalLink = ({ children, ...props }: LinkProps) => (
    <Link {...props} target="_blank" rel="noreferrer noopener">
        <span>
            {children}
            <ExternalLinkIcon
                aria-hidden="true"
                style={{
                    display: 'inline',
                    paddingLeft: '.25rem',
                    width: '1.5rem',
                    height: '1.5rem',
                }}
            />
        </span>
    </Link>
);

export default ExternalLink;
