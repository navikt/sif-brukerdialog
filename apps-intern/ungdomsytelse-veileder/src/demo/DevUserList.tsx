import { BodyLong, Box, Button, CopyButton, Heading, HStack, VStack } from '@navikt/ds-react';
import { mockUtils } from '../../mock/msw/mockUtils';
import { appEnv } from '../utils/appEnv';
import { RecycleIcon } from '@navikt/aksel-icons';

const DevUserList = () => {
    if (appEnv.DEV_IS_STORYBOOK) {
        return null;
    }
    return import.meta.env.MODE === 'msw' && __VIS_DEMO_BRUKERE__ ? (
        <Box background="sunken" padding="space-16" borderRadius="4">
            <VStack gap="space-32">
                <VStack gap="space-16">
                    <Heading level="2" size="small">
                        Demobrukere
                    </Heading>
                    <BodyLong>
                        Velg hvilke scenarioer du ønsker å teste ut ved å kopiere fødselsnummeret fra listen under og
                        søke opp personen. Hvis en gjør endringer kan en null-stille demoen ved å klikke &quot;Nullstill
                        demo&quot; knappen nederst.
                    </BodyLong>
                    <VStack gap="space-1">
                        <HStack gap="space-8" align="center">
                            <CopyButton copyText="56857102105" size="small" /> 56857102105 - Ikke registrert person
                        </HStack>
                        <HStack gap="space-8" align="center">
                            <CopyButton copyText="03867198392" size="small" /> 03867198392 - Registrert deltaker
                        </HStack>
                        {/* <HStack gap="space-8" align="center">
                            <CopyButton copyText="26430569928" size="small" /> 26430569928 - Skjermet registrert
                            deltaker
                        </HStack> */}
                        <HStack gap="space-8" align="center">
                            <CopyButton copyText="27857798800" size="small" /> 27857798800 - Person finnes ikke
                        </HStack>
                        <HStack gap="space-8" align="center">
                            <CopyButton copyText="09847696068" size="small" /> 09847696068 - Person med kode 6/7
                        </HStack>
                        <HStack gap="space-8" align="center">
                            <CopyButton copyText="65430071240" size="small" /> 65430071240 - Slettet deltaker
                        </HStack>
                    </VStack>
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
            </VStack>
        </Box>
    ) : null;
};

export default DevUserList;
