import { BodyLong, Button, CopyButton, ExpansionCard, Heading, HStack, VStack } from '@navikt/ds-react';
import { alleScenarioer, MockScenario } from '../../mock/scenarioer';
import { appEnv } from '../utils/appEnv';
import { RecycleIcon } from '@navikt/aksel-icons';
import { mockUtils } from '../../mock/msw/mockUtils';

const ScenarioListe = ({ scenarioer }: { scenarioer: MockScenario[] }) => (
    <VStack gap="space-8">
        {scenarioer.map((s) => (
            <HStack gap="space-8" align="center" key={s.fnr}>
                <CopyButton copyText={s.fnr} size="small" />
                {s.fnr} — {s.beskrivelse}
            </HStack>
        ))}
    </VStack>
);

const DevUserList = () => {
    if (appEnv.DEV_IS_STORYBOOK) {
        return null;
    }

    const synligeScenarioer = alleScenarioer.filter((s) => !(__IS_GITHUB_PAGES__ && s.skjultPåGithubPages));

    const grunnscenarioer = synligeScenarioer.filter((s) => s.gruppe === 'grunnscenarioer');
    const handlinger = synligeScenarioer.filter((s) => s.gruppe === 'handlinger');
    const tilgangsbegrensning = synligeScenarioer.filter((s) => s.gruppe === 'tilgangsbegrensning');

    return import.meta.env.MODE === 'msw' && __VIS_DEMO_BRUKERE__ ? (
        <ExpansionCard aria-label="Demobrukere" size="small" defaultOpen={true}>
            <ExpansionCard.Header>
                <ExpansionCard.Title size="small">Demobrukere</ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <VStack gap="space-32">
                    <BodyLong as="div">
                        <p>
                            Velg hvilke scenarioer du ønsker å teste ut ved å kopiere fødselsnummer fra listen nedenfor
                            og søke opp personen.
                        </p>
                        <VStack gap="space-24">
                            {grunnscenarioer.length > 0 && (
                                <VStack gap="space-8">
                                    <Heading level="4" size="xsmall">
                                        Grunnscenarioer
                                    </Heading>
                                    <ScenarioListe scenarioer={grunnscenarioer} />
                                </VStack>
                            )}
                            {handlinger.length > 0 && (
                                <VStack gap="space-8">
                                    <Heading level="4" size="xsmall">
                                        Handlinger
                                    </Heading>
                                    <ScenarioListe scenarioer={handlinger} />
                                </VStack>
                            )}
                            {tilgangsbegrensning.length > 0 && (
                                <VStack gap="space-8">
                                    <Heading level="4" size="xsmall">
                                        Tilgangsbegrensning
                                    </Heading>
                                    <ScenarioListe scenarioer={tilgangsbegrensning} />
                                </VStack>
                            )}
                        </VStack>
                    </BodyLong>
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
            </ExpansionCard.Content>
        </ExpansionCard>
    ) : null;
};

export default DevUserList;
