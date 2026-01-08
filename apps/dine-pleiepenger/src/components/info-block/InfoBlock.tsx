import { CalendarIcon, SparkLargeIcon, WalletIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, BoxNew, HGrid, HStack, Show, VStack } from '@navikt/ds-react';
import React from 'react';

interface Props {
    icon: InfoBlockIcon;
    title: string;
    titleInfo?: React.ReactNode;
    children: React.ReactNode;
}

export type InfoBlockIcon = 'calendar' | 'wallet' | 'spark';

const renderInfoBlockIcon = (icon: InfoBlockIcon): React.ReactNode => {
    switch (icon) {
        case 'calendar':
            return <CalendarIcon color="#005B82" width="1.5rem" height="1.5rem" />;
        case 'wallet':
            return <WalletIcon color="#005B82" width="1.5rem" height="1.5rem" />;
        case 'spark':
            return <SparkLargeIcon color="#005B82" width="1.5rem" height="1.5rem" />;
    }
};

const InfoBlock = ({ icon, title, children }: Props) => (
    <BoxNew borderRadius="large" background="default" padding="6" data-color="brand-blue">
        <HGrid columns={{ sm: '2.5rem 1fr' }}>
            <Show above="sm">
                <Box width="2.5rem">{renderInfoBlockIcon(icon)}</Box>
            </Show>
            <VStack gap="2">
                <HStack>
                    <BodyShort weight="semibold">{title}</BodyShort>
                </HStack>
                <BoxNew>{children}</BoxNew>
            </VStack>
        </HGrid>
    </BoxNew>
);

export default InfoBlock;
