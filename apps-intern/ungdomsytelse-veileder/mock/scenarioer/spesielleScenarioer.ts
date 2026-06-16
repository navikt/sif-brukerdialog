import { MockScenario } from './types';

/** Scenario: Person finnes ikke i registeret (returnerer 404). */
export const personFinnesIkkeScenario: MockScenario = {
    fnr: '27857798800',
    beskrivelse: 'Person finnes ikke',
    gruppe: 'grunnscenarioer',
};

/** Scenario: Person med diskresjonskode 6/7 (returnerer 403). Håndteres direkte i handlers.ts. */
export const personMedKode6Scenario: MockScenario = {
    fnr: '09847696068',
    beskrivelse: 'Person med kode 6/7',
    gruppe: 'tilgangsbegrensning',
    skjultPåGithubPages: true,
};
