import { Buildings3Icon, CalendarIcon, CodeIcon, SparkLargeIcon, WalletIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, BoxNew, BoxNewProps, HelpText, HGrid, HStack, Show, VStack } from '@navikt/ds-react';
import React from 'react';

interface Props {
    icon: InfoBlockIcon;
    title: string;
    titleInfo?: React.ReactNode;
    children: React.ReactNode;
    background?: BoxNewProps['background'];
}

export type InfoBlockIcon = 'calendar' | 'wallet' | 'spark' | 'building' | 'code';

const renderInfoBlockIcon = (icon: InfoBlockIcon): React.ReactNode => {
    switch (icon) {
        case 'calendar':
            return <CalendarIcon color="#005B82" width="1.5rem" height="1.5rem" role="presentation" />;
        case 'wallet':
            return <WalletIcon color="#005B82" width="1.5rem" height="1.5rem" role="presentation" />;
        case 'spark':
            return <SparkLargeIcon color="#005B82" width="1.5rem" height="1.5rem" role="presentation" />;
        case 'building':
            return <Buildings3Icon color="#005B82" width="1.5rem" height="1.5rem" role="presentation" />;
        case 'code':
            return <CodeIcon color="#005B82" width="1.5rem" height="1.5rem" role="presentation" />;
    }
};

const InfoBlock = ({ icon, title, background = 'default', titleInfo, children }: Props) => (
    <BoxNew borderRadius="large" background={background} padding="6" data-color="brand-blue">
        <HGrid columns={{ sm: '2.5rem 1fr' }}>
            <Show above="sm">
                <Box width="2.5rem">{renderInfoBlockIcon(icon)}</Box>
            </Show>
            <VStack gap="2">
                <Show below="sm">
                    <HGrid columns="auto 1fr" gap="2">
                        <BodyShort weight="semibold">{title}</BodyShort>
                        {titleInfo && <HelpText>{titleInfo}</HelpText>}
                    </HGrid>
                </Show>
                <Show above="sm">
                    <HStack gap="2">
                        <BodyShort weight="semibold">{title}</BodyShort>
                        {titleInfo && <HelpText>{titleInfo}</HelpText>}
                    </HStack>
                </Show>
                <BoxNew>{children}</BoxNew>
            </VStack>
        </HGrid>
    </BoxNew>
);

export default InfoBlock;
