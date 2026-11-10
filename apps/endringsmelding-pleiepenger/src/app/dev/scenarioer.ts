import { IngenTilgangÅrsak } from '@app/types/IngenTilgangÅrsak';

export type ScenarioType =
    | 'en-arbeidsgiver-en-periode'
    | 'en-arbeidsgiver-to-perioder'
    | 'arbeidsgiver-og-frilanser'
    | 'arbeidsgivere-og-frilanser'
    | 'arbeidsgiver-ikke-i-sak'
    | 'arbeidsgiver-ikke-i-sak-flere-ansettelser'
    | 'debug'
    | 'selvstendig-næringsdrivende'
    | 'flere-saker'
    | 'ingen-sak'
    | 'arbeidsaktivitet-uten-arbeidsgiver'
    | 'barn-mangler-identitetsnummer'
    | 'en-arbeidsgiver-to-ansettelser-samme-uke-med-opphold'
    | 'en-arbeidsgiver-to-ansettelser-samme-uke-uten-opphold'
    | 'brukertest-2026';

export interface Scenario {
    name: string;
    value: ScenarioType;
    description?: string;
    /** Årsaken mocket /tilgang returnerer. Uten årsak har bruker tilgang. */
    ingenTilgangÅrsak?: IngenTilgangÅrsak;
    /** Scenarioet bruker dagens dato i stedet for NOW fra app settings */
    brukDagensDato?: boolean;
    fremhevet?: boolean;
}

export const scenarioer: Scenario[] = [
    {
        name: 'Én arbeidsgiver - en periode',
        value: 'en-arbeidsgiver-en-periode',
    },
    {
        name: 'Én arbeidsgiver - to perioder',
        value: 'en-arbeidsgiver-to-perioder',
    },
    {
        name: 'Én arbeidsgiver + frilans',
        value: 'arbeidsgiver-og-frilanser',
    },
    {
        name: 'To arbeidsgivere + frilans',
        value: 'arbeidsgivere-og-frilanser',
    },
    {
        name: 'Arbeidsgiver som ikke er i sak',
        value: 'arbeidsgiver-ikke-i-sak',
    },
    {
        name: 'Arbeidsgiver som ikke er i sak med flere ansettelser',
        value: 'arbeidsgiver-ikke-i-sak-flere-ansettelser',
        ingenTilgangÅrsak: IngenTilgangÅrsak.harFlereAnsettelsesforholdHosUkjentArbeidsgiver,
    },
    {
        name: 'Selvstendig næringsdrivende',
        value: 'selvstendig-næringsdrivende',
        ingenTilgangÅrsak: IngenTilgangÅrsak.harArbeidstidSomSelvstendigNæringsdrivende,
    },
    {
        name: 'Saker for flere barn',
        value: 'flere-saker',
        ingenTilgangÅrsak: IngenTilgangÅrsak.harMerEnnEnSak,
    },
    {
        name: 'Ingen sak',
        value: 'ingen-sak',
        ingenTilgangÅrsak: IngenTilgangÅrsak.harIngenSak,
    },
    {
        name: 'Debug',
        value: 'debug',
    },
    {
        name: 'Arbeidsaktivitet uten arbeidsgiver',
        value: 'arbeidsaktivitet-uten-arbeidsgiver',
    },
    {
        name: 'Barn mangler identitetsnummer',
        value: 'barn-mangler-identitetsnummer',
        ingenTilgangÅrsak: IngenTilgangÅrsak.barnManglerIdentitetsnummer,
    },
    {
        name: 'Arbeidsgiver med to ansettelser samme uke med opphold',
        value: 'en-arbeidsgiver-to-ansettelser-samme-uke-med-opphold',
        ingenTilgangÅrsak: IngenTilgangÅrsak.enArbeidsgiverToAnsettelserSammeUkeMedOpphold,
    },
    {
        name: 'Arbeidsgiver med to ansettelser samme uke uten opphold',
        value: 'en-arbeidsgiver-to-ansettelser-samme-uke-uten-opphold',
    },
    {
        name: 'Brukertest 2026',
        value: 'brukertest-2026',
        brukDagensDato: true,
        fremhevet: true,
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
