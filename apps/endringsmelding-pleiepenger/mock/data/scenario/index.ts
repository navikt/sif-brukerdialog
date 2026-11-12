import { scenarioer, ScenarioType } from '@app/dev/scenarioer';

import { ArbeidsaktivitetUtenArbeidsgiver } from './arbeidsaktivitet-uten-arbeidsgiver/ArbeidsaktivitetUtenArbeidsgiver';
import { ArbeidsgiverIkkeISak } from './arbeidsgiver-ikke-i-sak/ArbeidsgiverIkkeISak';
import { ArbeidsgiverIkkeISakFlereAnsettelser } from './arbeidsgiver-ikke-i-sak-flere-ansettelser/ArbeidsgiverIkkeISakFlereAnsettelser';
import { ArbeidsgiverOgFrilanser } from './arbeidsgiver-og-frilanser/ArbeidsgiverOgFrilanser';
import { ArbeidsgivereOgFrilanser } from './arbeidsgivere-og-frilanser/ArbeidsgivereOgFrilanser';
import { BarnManglerIdentitetsnummer } from './barn-mangler-identitetsnummer/BarnManglerIdentitetsnummer';
import { Brukertest2026 } from './brukertest-2026/Brukertest2026';
import { Debug } from './debug/Debug';
import { EnArbeidsgiverEnPeriode } from './en-arbeidsgiver-en-periode/EnArbeidsgiverEnPeriode';
import { EnArbeidsgiverToAnsettelserSammeUkeMedOpphold } from './en-arbeidsgiver-to-ansettelser-samme-uke-med-opphold/EnArbeidsgiverToAnsettelserSammeUkeMedOpphold';
import { EnArbeidsgiverToAnsettelserSammeUkeUtenOpphold } from './en-arbeidsgiver-to-ansettelser-samme-uke-uten-opphold/EnArbeidsgiverToAnsettelserSammeUkeUtenOpphold';
import { EnArbeidsgiverToPerioder } from './en-arbeidsgiver-to-perioder/EnArbeidsgiverToPerioder';
import { FlereSaker } from './flere-saker/FlereSaker';
import { IngenSak } from './ingen-sak/IngenSak';
import { SelvstendigNæringsdrivende } from './selvstendig-næringsdrivende/SelvstendigNæringsdrivende';

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
    ['barn-mangler-identitetsnummer']: BarnManglerIdentitetsnummer,
    ['en-arbeidsgiver-to-ansettelser-samme-uke-med-opphold']: EnArbeidsgiverToAnsettelserSammeUkeMedOpphold,
    ['en-arbeidsgiver-to-ansettelser-samme-uke-uten-opphold']: EnArbeidsgiverToAnsettelserSammeUkeUtenOpphold,
    ['brukertest-2026']: Brukertest2026,
};

export interface ScenarioData {
    søker: any;
    sak: any;
    arbeidsgiver: any;
    mellomlagring?: any;
}

export const getScenarioMockData = (scenario: ScenarioType) => {
    return mockData[scenario];
};

export type TilgangMockPeriode = { fom: string; tom: string };

/**
 * Svar fra /tilgang for scenarioet. Perioden sendes inn fordi denne filen også lastes av Playwright i Node,
 * der dato-koden i appen ikke kan importeres.
 */
export const getTilgangMockData = (scenario: ScenarioType, tillattEndringsperiode: TilgangMockPeriode) => {
    const årsak = scenarioer.find((s) => s.value === scenario)?.ingenTilgangÅrsak;
    return årsak ? { kanBruke: false, årsaker: [årsak] } : { kanBruke: true, årsaker: [], tillattEndringsperiode };
};
