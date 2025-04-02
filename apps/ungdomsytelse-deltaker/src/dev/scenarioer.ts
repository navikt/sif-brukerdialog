export enum ScenarioType {
    'harSøkt' = 'harSøkt',
    'harIkkeSøkt' = 'harIkkeSøkt',
}

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
