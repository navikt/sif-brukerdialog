export interface Scenario {
    name: string;
    value: string;
    description?: string;
    harTilgang: boolean;
}

export const scenarioer: Scenario[] = [
    {
        name: 'Én arbeidsgiver - en periode',
        value: 'en-arbeidsgiver-en-periode',
        harTilgang: true,
    },
    {
        name: 'Én arbeidsgiver - to perioder',
        value: 'en-arbeidsgiver-to-perioder',
        harTilgang: true,
    },
    {
        name: 'Én arbeidsgiver + frilans',
        value: 'arbeidsgiver-og-frilanser',
        harTilgang: true,
    },
    {
        name: 'To arbeidsgivere + frilans',
        value: 'arbeidsgivere-og-frilanser',
        harTilgang: true,
    },
    {
        name: 'Arbeidsgiver som ikke er i sak',
        value: 'arbeidsgiver-ikke-i-sak',
        harTilgang: true,
    },
    {
        name: 'Flere saker, kun én aktiv',
        value: 'flere-saker-kun-en-aktiv',
        harTilgang: true,
    },

    {
        name: 'Debug',
        value: 'debug',
        harTilgang: true,
    },
    {
        name: 'Selvstendig næringsdrivende',
        value: 'selvstendig-næringsdrivende',
        harTilgang: false,
    },
    {
        name: 'Saker for flere barn',
        value: 'flere-saker',
        harTilgang: false,
    },
    {
        name: 'Ingen sak',
        value: 'ingen-sak',
        harTilgang: false,
    },
    {
        name: 'Arbeidsaktivitet uten arbeidsgiver',
        value: 'arbeidsaktivitet-uten-arbeidsgiver',
        harTilgang: false,
    },
    {
        name: 'Ugyldig k9format',
        value: 'ugyldig-k9-format',
        harTilgang: false,
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
