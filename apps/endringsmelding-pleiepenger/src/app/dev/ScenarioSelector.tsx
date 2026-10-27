import { BodyShort, Button, ExpansionCard, HStack, Radio, RadioGroup, VStack } from '@navikt/ds-react';
import { RadioCard, RadioCardGroup } from '@navikt/ds-react/PREVIEW';
import { useState } from 'react';

import { useMellomlagring, useSøknadContext } from '../hooks';
import actionsCreator from '../søknad/context/action/actionCreator';
import { relocateToWelcomePage } from '../utils';
import {
    getScenarioFromLocalStorage,
    nullstillScenarioer,
    saveScenarioToLocalStorage,
    Scenario,
    scenarioer,
    ScenarioType,
} from './scenarioer';

export const ScenarioSelector = () => {
    const [scenario, setScenario] = useState<Scenario>(getScenarioFromLocalStorage());
    const aktivtScenario = getScenarioFromLocalStorage();
    const { slettMellomlagring } = useMellomlagring();
    const { dispatch } = useSøknadContext();

    const startPåNytt = () =>
        slettMellomlagring().then(() => {
            dispatch(actionsCreator.resetSøknad());
            relocateToWelcomePage();
        });

    const nullstill = (scenarioerSomSkalNullstilles: ScenarioType[]) => {
        nullstillScenarioer(scenarioerSomSkalNullstilles);
        startPåNytt();
    };

    const setScenarioFromValue = (value: string) => {
        const scenarioFromValue = scenarioer.find((s) => s.value === value);
        if (scenarioFromValue) {
            setScenario(scenarioFromValue);
        }
    };

    const fremhevetScenarioer = scenarioer.filter(({ fremhevet }) => fremhevet === true);
    const vanligeScenarioer = scenarioer.filter(({ fremhevet }) => fremhevet !== true);

    const tilgangScenarioer = vanligeScenarioer.filter(({ harTilgang }) => harTilgang === true);
    const stoppetScenarioer = vanligeScenarioer.filter(({ harTilgang }) => harTilgang === false);

    return (
        <VStack gap="space-32">
            <RadioCardGroup
                value={scenario.value}
                legend={
                    <BodyShort size="large" as="span" weight="semibold">
                        Scenario for brukertest
                    </BodyShort>
                }
                onChange={(value) => setScenarioFromValue(value)}>
                {fremhevetScenarioer.map(({ name, value }) => (
                    <RadioCard key={value} value={value}>
                        {name}
                    </RadioCard>
                ))}
            </RadioCardGroup>
            <ExpansionCard aria-label="Andre scenarioer" size="small">
                <ExpansionCard.Header>
                    <ExpansionCard.Title size="small">Andre scenarioer</ExpansionCard.Title>
                    <ExpansionCard.Description>Åpne for å se andre scenarioer som kan velges</ExpansionCard.Description>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <div className="scenarioes">
                        <RadioGroup
                            value={scenario.value}
                            legend="Scenario hvor bruker har tilgang"
                            onChange={(value) => setScenarioFromValue(value)}>
                            {tilgangScenarioer.map(({ name, value }) => (
                                <Radio key={value} value={value}>
                                    {name}
                                </Radio>
                            ))}
                        </RadioGroup>
                        <RadioGroup
                            value={scenario.value}
                            legend="Scenario hvor bruker stoppes"
                            onChange={(value) => setScenarioFromValue(value)}>
                            {stoppetScenarioer.map(({ name, value }) => (
                                <Radio key={value} value={value}>
                                    {name}
                                </Radio>
                            ))}
                        </RadioGroup>
                    </div>
                </ExpansionCard.Content>
            </ExpansionCard>
            <div>
                <Button
                    type="button"
                    style={{ width: '100%' }}
                    onClick={() => {
                        saveScenarioToLocalStorage(scenario);
                        startPåNytt();
                    }}>
                    Velg
                </Button>
            </div>
            <VStack gap="space-8">
                <BodyShort>Nullstill innsendte endringer, slik at scenarioet starter med opprinnelige data.</BodyShort>
                <HStack gap="space-8">
                    <Button
                        type="button"
                        variant="secondary"
                        size="small"
                        onClick={() => nullstill([aktivtScenario.value])}>
                        Nullstill «{aktivtScenario.name}»
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        size="small"
                        onClick={() => nullstill(scenarioer.map(({ value }) => value))}>
                        Nullstill alle scenarioer
                    </Button>
                </HStack>
            </VStack>
        </VStack>
    );
};
