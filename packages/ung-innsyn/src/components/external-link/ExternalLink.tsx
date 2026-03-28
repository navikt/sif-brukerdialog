import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Link, LinkProps } from '@navikt/ds-react';

export const ExternalLink = ({ children, inlineText, ...rest }: LinkProps) => {
    return (
        <Link {...rest} target={rest.target || '_blank'} inlineText={inlineText || true}>
            <span>{children}</span>
            <span className="inline-block pl-1">
                <ExternalLinkIcon role="presentation" />
            </span>
        </Link>
    );
};
