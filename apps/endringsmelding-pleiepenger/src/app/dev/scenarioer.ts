export interface Scenario {
    name: string;
    value: string;
    description?: string;
    harTilgang: boolean;
}

export const scenarioer: Scenario[] = [
    {
        name: 'En arbeidsgiver - en periode',
        value: 'en-arbeidsgiver-en-periode',
        harTilgang: true,
    },
    {
        name: 'En arbeidsgiver - to perioder',
        value: 'en-arbeidsgiver-to-perioder',
        harTilgang: true,
    },
    {
        name: 'En arbeidsgiver + frilans',
        value: 'arbeidsgiver-og-frilanser',
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
];

export const defaultScenario = scenarioer[0];
