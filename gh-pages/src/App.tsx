import { BodyLong, Box, Heading, HGrid, Page, VStack } from '@navikt/ds-react';

import SideKort from './SideKort';
import { sider, SideType } from './sider';

const seksjoner: Array<{ type: SideType; tittel: string }> = [
    { type: 'demo', tittel: 'Demoer' },
    { type: 'storybook', tittel: 'Storybooks' },
];

const App = () => (
    <Page>
        <Page.Block as="main" width="lg" gutters>
            <VStack gap="space-32" paddingBlock="space-48">
                <VStack gap="space-16">
                    <Heading level="1" size="large">
                        Sif brukerdialog
                    </Heading>
                    <BodyLong>
                        Demoer og storybooks som publiseres fra monorepoet. Demoene kjører med mockede data og sender
                        ingen kall til ekte tjenester.
                    </BodyLong>
                </VStack>

                {seksjoner.map(({ type, tittel }) => {
                    const sideriSeksjon = sider.filter((side) => side.type === type);
                    if (sideriSeksjon.length === 0) {
                        return null;
                    }
                    return (
                        <VStack key={type} gap="space-16">
                            <Heading level="2" size="medium">
                                {tittel}
                            </Heading>
                            <HGrid gap="space-16" columns={{ xs: 1, md: 2 }}>
                                {sideriSeksjon.map((side) => (
                                    <SideKort key={side.path} side={side} />
                                ))}
                            </HGrid>
                        </VStack>
                    );
                })}

                <Box.New paddingBlock="space-16 space-0">
                    <BodyLong size="small" textColor="subtle">
                        Kildekode og dokumentasjon finnes i{' '}
                        <a href="https://github.com/navikt/sif-brukerdialog" rel="noopener noreferrer">
                            navikt/sif-brukerdialog
                        </a>
                        .
                    </BodyLong>
                </Box.New>
            </VStack>
        </Page.Block>
    </Page>
);

export default App;
