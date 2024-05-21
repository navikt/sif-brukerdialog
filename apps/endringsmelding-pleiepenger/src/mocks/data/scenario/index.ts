import { ScenarioType } from '../../../app/dev/scenarioer';
import { ArbeidsaktivitetUtenArbeidsgiver } from './arbeidsaktivitet-uten-arbeidsgiver/ArbeidsaktivitetUtenArbeidsgiver';
import { ArbeidsgiverIkkeISak } from './arbeidsgiver-ikke-i-sak/ArbeidsgiverIkkeISak';
import { ArbeidsgiverOgFrilanser } from './arbeidsgiver-og-frilanser/ArbeidsgiverOgFrilanser';
import { ArbeidsgivereOgFrilanser } from './arbeidsgivere-og-frilanser/ArbeidsgivereOgFrilanser';
import { EnArbeidsgiverEnPeriode } from './en-arbeidsgiver-en-periode/EnArbeidsgiverEnPeriode';
import { EnArbeidsgiverToPerioder } from './en-arbeidsgiver-to-perioder/EnArbeidsgiverToPerioder';
import { FlereSaker } from './flere-saker/FlereSaker';
import { IngenSak } from './ingen-sak/IngenSak';
import { SelvstendigNæringsdrivende } from './selvstendig-næringsdrivende/SelvstendigNæringsdrivende';
import { UgyldigK9Format } from './ugyldig-k9-format/UgyldigK9Format';

type ScenarioMap = {
    [key: string]: ScenarioData;
};

export const mockData: ScenarioMap = {
    ['en-arbeidsgiver-en-periode']: EnArbeidsgiverEnPeriode,
    ['en-arbeidsgiver-to-perioder']: EnArbeidsgiverToPerioder,
    ['arbeidsgiver-og-frilanser']: ArbeidsgiverOgFrilanser,
    ['arbeidsgivere-og-frilanser']: ArbeidsgivereOgFrilanser,
    ['selvstendig-næringsdrivende']: SelvstendigNæringsdrivende,
    ['flere-saker']: FlereSaker,
    ['ingen-sak']: IngenSak,
    ['arbeidsgiver-ikke-i-sak']: ArbeidsgiverIkkeISak,
    ['arbeidsaktivitet-uten-arbeidsgiver']: ArbeidsaktivitetUtenArbeidsgiver,
    ['ugyldig-k9-format']: UgyldigK9Format,
};

export interface ScenarioData {
    søker: any;
    sak: any;
    arbeidsgiver: any;
}

export const getScenarioMockData = (scenario: ScenarioType) => {
    return mockData[scenario];
};
