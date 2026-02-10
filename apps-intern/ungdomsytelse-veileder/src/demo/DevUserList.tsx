import { BodyLong, Button, CopyButton, ExpansionCard, Heading, HStack, VStack } from '@navikt/ds-react';
import { mockUtils } from '../../mock/msw/mockUtils';
import { appEnv } from '../utils/appEnv';
import { RecycleIcon } from '@navikt/aksel-icons';

const DevUserList = () => {
    if (appEnv.DEV_IS_STORYBOOK) {
        return null;
    }
    return import.meta.env.MODE === 'msw' && __VIS_DEMO_BRUKERE__ ? (
        <ExpansionCard aria-label="Demobrukere" size="small" defaultOpen={true}>
            <ExpansionCard.Header>
                <ExpansionCard.Title size="small">Demobrukere</ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <VStack gap="space-32">
                    <VStack gap="space-16">
                        <BodyLong as="div">
                            <p>
                                Velg hvilke scenarioer du ønsker å teste ut ved å kopiere fødselsnummer fra listen
                                nedenfor og søke opp personen.
                            </p>
                            <VStack gap="space-8">
                                <HStack gap="space-8" align="center">
                                    <CopyButton copyText="56857102105" size="small" /> 56857102105 - Ny deltaker
                                </HStack>
                                <HStack gap="space-8" align="center">
                                    <CopyButton copyText="03867198392" size="small" /> 03867198392 - Registrert deltaker
                                </HStack>
                                <HStack gap="space-8" align="center">
                                    <CopyButton copyText="27857798800" size="small" /> 27857798800 - Person finnes ikke
                                </HStack>
                                {__IS_GITHUB_PAGES__ ? null : (
                                    <>
                                        <HStack gap="space-8" align="center">
                                            <CopyButton copyText="26430569928" size="small" /> 26430569928 - Skjermet
                                            registrert deltaker
                                        </HStack>
                                        <HStack gap="space-8" align="center">
                                            <CopyButton copyText="09847696068" size="small" /> 09847696068 - Person med
                                            kode 6/7
                                        </HStack>
                                    </>
                                )}
                                <HStack gap="space-8" align="center">
                                    <CopyButton copyText="65430071240" size="small" /> 65430071240 - Slettet deltaker
                                </HStack>
                            </VStack>
                        </BodyLong>
                    </VStack>
                    <VStack gap="space-12">
                        <Heading level="3" size="xsmall">
                            Tilbakestille demo
                        </Heading>
                        <BodyLong>
                            Når en har gjort endringer i demoen så vil disse endringene bli husket. For å tilbakestille
                            demoen til opprinnelig tilstand, klikk på knappen under.
                        </BodyLong>
                        <div>
                            <Button
                                variant="secondary"
                                size="small"
                                icon={<RecycleIcon role="presentation" />}
                                iconPosition="left"
                                onClick={() => {
                                    mockUtils.reset();
                                    window.location.reload();
                                }}>
                                Tilbakestill demo
                            </Button>
                        </div>
                    </VStack>
                </VStack>{' '}
            </ExpansionCard.Content>
        </ExpansionCard>
    ) : null;
};

export default DevUserList;
