import { HStack, Link, LinkProps } from '@navikt/ds-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';

const ExternalLink = ({ children, ...rest }: LinkProps) => {
    return (
        <Link
            {...rest}
            target={rest.target || '_blank'}
            aria-description={rest['aria-description'] || 'Åpnes i nytt vindu'}>
            <HStack as="span" gap="1" align="baseline">
                {children}
                <ExternalLinkIcon role="presentation" aria-hidden="true" />
            </HStack>
        </Link>
    );
};

export default ExternalLink;
