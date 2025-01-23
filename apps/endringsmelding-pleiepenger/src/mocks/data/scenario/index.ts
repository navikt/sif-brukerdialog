import { ScenarioType } from '../../../app/dev/scenarioer';
import { ArbeidsaktivitetUtenArbeidsgiver } from './arbeidsaktivitet-uten-arbeidsgiver/ArbeidsaktivitetUtenArbeidsgiver';
import { ArbeidsgiverIkkeISakFlereAnsettelser } from './arbeidsgiver-ikke-i-sak-flere-ansettelser/ArbeidsgiverIkkeISakFlereAnsettelser';
import { ArbeidsgiverIkkeISak } from './arbeidsgiver-ikke-i-sak/ArbeidsgiverIkkeISak';
import { ArbeidsgiverOgFrilanser } from './arbeidsgiver-og-frilanser/ArbeidsgiverOgFrilanser';
import { ArbeidsgivereOgFrilanser } from './arbeidsgivere-og-frilanser/ArbeidsgivereOgFrilanser';
import { Debug } from './debug/Debug';
import { EnArbeidsgiverEnPeriode } from './en-arbeidsgiver-en-periode/EnArbeidsgiverEnPeriode';
import { EnArbeidsgiverToAnsettelserSammeUkeMedOpphold } from './en-arbeidsgiver-to-ansettelser-samme-uke-med-opphold/EnArbeidsgiverToAnsettelserSammeUkeMedOpphold';
import { EnArbeidsgiverToAnsettelserSammeUkeUtenOpphold } from './en-arbeidsgiver-to-ansettelser-samme-uke-uten-opphold/EnArbeidsgiverToAnsettelserSammeUkeUtenOpphold';
import { EnArbeidsgiverToPerioder } from './en-arbeidsgiver-to-perioder/EnArbeidsgiverToPerioder';
import { FlereSaker } from './flere-saker/FlereSaker';
import { IngenSak } from './ingen-sak/IngenSak';
import { SelvstendigNæringsdrivende } from './selvstendig-næringsdrivende/SelvstendigNæringsdrivende';
import { UgyldigK9Format } from './ugyldig-k9-format/UgyldigK9Format';

type ScenarioMap = Record<ScenarioType, ScenarioData>;

export const mockData: ScenarioMap = {
    ['en-arbeidsgiver-en-periode']: EnArbeidsgiverEnPeriode,
    ['en-arbeidsgiver-to-perioder']: EnArbeidsgiverToPerioder,
    ['arbeidsgiver-og-frilanser']: ArbeidsgiverOgFrilanser,
    ['arbeidsgivere-og-frilanser']: ArbeidsgivereOgFrilanser,
    ['selvstendig-næringsdrivende']: SelvstendigNæringsdrivende,
    ['flere-saker']: FlereSaker,
    ['ingen-sak']: IngenSak,
    ['debug']: Debug,
    ['arbeidsgiver-ikke-i-sak']: ArbeidsgiverIkkeISak,
    ['arbeidsgiver-ikke-i-sak-flere-ansettelser']: ArbeidsgiverIkkeISakFlereAnsettelser,
    ['arbeidsaktivitet-uten-arbeidsgiver']: ArbeidsaktivitetUtenArbeidsgiver,
    ['ugyldig-k9-format']: UgyldigK9Format,
    ['en-arbeidsgiver-to-ansettelser-samme-uke-med-opphold']: EnArbeidsgiverToAnsettelserSammeUkeMedOpphold,
    ['en-arbeidsgiver-to-ansettelser-samme-uke-uten-opphold']: EnArbeidsgiverToAnsettelserSammeUkeUtenOpphold,
};

export interface ScenarioData {
    søker: any;
    sak: any;
    arbeidsgiver: any;
}

export const getScenarioMockData = (scenario: ScenarioType) => {
    return mockData[scenario];
};
