import { Box, LinkCard, Show } from '@navikt/ds-react';
import React from 'react';

interface Props {
    icon?: React.ReactNode;
    title: string;
    description?: React.ReactNode;
    href?: string;
}

const SnarveiLinkCard = ({ icon, title, description, href }: Props) => {
    return (
        <LinkCard>
            {icon ? (
                <Show above="sm" asChild>
                    <Box
                        asChild
                        borderRadius="12"
                        padding="space-8"
                        style={{ backgroundColor: 'var(--ax-bg-moderateA)' }}>
                        <LinkCard.Icon>{icon}</LinkCard.Icon>
                    </Box>
                </Show>
            ) : undefined}
            <LinkCard.Title>{href ? <LinkCard.Anchor href={href}>{title}</LinkCard.Anchor> : title}</LinkCard.Title>
            {description ? <LinkCard.Description>{description}</LinkCard.Description> : null}
        </LinkCard>
    );
};

export default SnarveiLinkCard;
