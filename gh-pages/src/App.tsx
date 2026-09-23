import { BodyLong, Box, Heading, HGrid, Link, Page, VStack } from '@navikt/ds-react';

import SideKort from './SideKort';
import { sider, SideType } from './sider';

const seksjoner: Array<{ type: SideType; tittel: string }> = [
    { type: 'demo', tittel: 'Demoer' },
    { type: 'storybook', tittel: 'Storybooks' },
];

const byggetidspunkt = new Intl.DateTimeFormat('nb-NO', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'Europe/Oslo',
}).format(new Date(__BUILD_TIME__));

const App = () => (
    <Page>
        <Page.Block as="main" width="lg" gutters>
            <VStack gap="space-32" paddingBlock="space-48">
                <VStack gap="space-16">
                    <Heading level="1" size="large">
                        Sif brukerdialog
                    </Heading>
                    <BodyLong>Demoer og storybooks som publiseres fra monorepoet.</BodyLong>
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

                <Box paddingBlock="space-16 space-0">
                    <BodyLong size="small" textColor="subtle">
                        Kildekode og dokumentasjon finnes i{' '}
                        <Link href="https://github.com/navikt/sif-brukerdialog" rel="noopener noreferrer">
                            navikt/sif-brukerdialog
                        </Link>
                        .
                    </BodyLong>
                    <BodyLong size="small" textColor="subtle">
                        Bygget fra{' '}
                        <Link
                            href={`https://github.com/navikt/sif-brukerdialog/tree/${__BRANCH__}`}
                            rel="noopener noreferrer">
                            {__BRANCH__}
                        </Link>{' '}
                        (
                        <Link
                            href={`https://github.com/navikt/sif-brukerdialog/commit/${__COMMIT__}`}
                            rel="noopener noreferrer">
                            {__COMMIT__}
                        </Link>
                        ) <time dateTime={__BUILD_TIME__}>{byggetidspunkt}</time>.
                    </BodyLong>
                </Box>
            </VStack>
        </Page.Block>
    </Page>
);

export default App;
