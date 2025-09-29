import { ScenarioType } from '../../mock/scenarios/types';

export interface Scenario {
    name: string;
    value: ScenarioType;
    description?: string;
}

export const scenarioer: Scenario[] = [
    {
        name: 'Har ikke søkt',
        value: ScenarioType.harIkkeSøkt,
    },
    {
        name: 'Har søkt',
        value: ScenarioType.harSøkt,
    },
    {
        name: 'Er ikke meldt inn',
        value: ScenarioType.ikkeMeldtInn,
    },
];

export const defaultScenario = scenarioer[0];

export const getScenarioFromLocalStorage = (): Scenario => {
    const scenario = localStorage.getItem('scenario');
    const storedScenario = scenarioer.find((s) => s.value === scenario);
    return storedScenario || defaultScenario;
};

export const saveScenarioToLocalStorage = (scenario: Scenario) => {
    localStorage.setItem('scenario', scenario.value);
};
