import { BodyShort, Box, Heading, HGrid, Link, List, Page, VStack } from '@navikt/ds-react';
import React from 'react';

interface Props {
    preTitle?: string;
    title?: string;
    feilId?: string;
    children?: React.ReactNode;
}

export const FallbackErrorPage = ({ preTitle, title = 'Beklager, noe gikk galt.', feilId }: Props) => {
    return (
        <Page>
            <Page.Block as="main" width="xl" gutters>
                <Box paddingBlock="space-80 space-32">
                    <HGrid columns="minmax(auto,600px)" gap="space-64" data-aksel-template="500-v3">
                        <VStack gap="space-48" align="start">
                            <VStack gap="space-16">
                                <div>
                                    {preTitle && (
                                        <BodyShort textColor="subtle" size="small">
                                            {preTitle}
                                        </BodyShort>
                                    )}
                                    <Heading level="1" size="large">
                                        {title}
                                    </Heading>
                                </div>
                                <BodyShort>
                                    En teknisk feil på gjør at siden er utilgjengelig. Dette skyldes ikke noe du gjorde.
                                </BodyShort>
                                <BodyShort>Du kan prøve å</BodyShort>
                                <List>
                                    <List.Item>
                                        vente noen minutter og{' '}
                                        <Link href="#" onClick={() => location.reload()}>
                                            laste siden på nytt
                                        </Link>
                                    </List.Item>
                                    <List.Item>
                                        <Link href="#" onClick={() => history.back()}>
                                            gå tilbake til forrige side
                                        </Link>
                                    </List.Item>
                                </List>
                                <BodyShort>
                                    Hvis problemet vedvarer, kan du{' '}
                                    <Link href="https://nav.no/kontaktoss" target="_blank" rel="noopener noreferrer">
                                        kontakte oss (åpnes i ny fane)
                                    </Link>
                                    .
                                </BodyShort>
                            </VStack>

                            {feilId && (
                                <BodyShort size="small" textColor="subtle">
                                    Feil-id: {feilId}
                                </BodyShort>
                            )}
                        </VStack>

                        <div>
                            <Heading level="1" size="large" spacing>
                                Something went wrong
                            </Heading>
                            <BodyShort spacing>
                                This was caused by a technical fault. Please refresh this page or try again in a few
                                minutes.
                            </BodyShort>
                            <BodyShort>
                                <Link target="_blank" href="https://www.nav.no/kontaktoss/en" rel="noopener noreferrer">
                                    Contact us (opens in new tab)
                                </Link>{' '}
                                if the problem persists.
                            </BodyShort>
                        </div>
                    </HGrid>
                </Box>
            </Page.Block>
        </Page>
    );
};
