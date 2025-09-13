import { IntlShape } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';

export const arbeidstidMessages_nb = {
    'arbeidIPeriode.StepInfo.1':
        'Du har fortalt oss at du skal jobbe noe de dagene du skal gi pleie. I denne kalenderen fører du opp hvor mange timer du faktisk jobber i perioden.',
    'arbeidIPeriode.StepInfo.2':
        'Hvis du søker for første gang, eller du har hatt et opphold i pleiepengene i minst fire uker, vil vi kontakte arbeidsgivere som du har helt eller delvis fravær fra for å innhente inntektsmelding.',
    'arbeidIPeriode.FrilansLabel': 'Frilans',
    'arbeidIPeriode.SNLabel': 'Selvstendig næringsdrivende',
    'arbeidIPeriode.jobberIPerioden.spm': 'I dagene du søker for, hvilken situasjon gjelder for deg {hvor}?',
    'arbeidIPeriode.jobberIPerioden.accordionHeader': 'Timer med jobb {når}',
    'arbeidIPeriode.jobberIPerioden.accordionHeader.dagerTag':
        'Jobber {dagerMedArbeid} av {tilgjengeligeDager, plural, one {# dag} other {# dager}}',
    'arbeidIPeriode.jobberIPerioden.ingenJobbInfo': 'Du trenger ikke fylle ut noe for dager du ikke skal jobbe.',
    'arbeidIPeriode.enkeltdager_gruppe.legend': 'Oppgi hvor mye du jobber {hvor} i de dagene du søker pleiepenger for.',
    'arbeidIPeriode.jobberIPerioden.jobberIkke': 'Jeg jobber ikke noe de dagene jeg pleier',
    'arbeidIPeriode.jobberIPerioden.jobberVanlig': 'Jeg jobber som normalt, og har ikke fravær',
    'arbeidIPeriode.jobberIPerioden.jobberRedusert': 'Jeg kombinerer delvis jobb med pleiepenger',
    'arbeidIPeriode.iDag.utledet': 'timer i uka',
    'arbeidIPeriode.prosent.utledet.medTimer': 'prosent av {timerNormalt} ({timerRedusert} per dag)',
    'arbeidIPeriode.arbeidstidSted.frilansoppdrag': 'Frilansoppdrag',
    'arbeidIPeriode.arbeidstidSted.sn': 'Selvstendig næringsdrivende',

    'arbeidIPeriode.validation.timerDag.timeHasNoValue': 'Du må fylle ut timer og minutter for {dato} {hvor}.',
    'arbeidIPeriode.validation.timerDag.hoursAreInvalid': 'Antall timer på {dato} er ikke et gyldig tall.',
    'arbeidIPeriode.validation.timerDag.minutesAreInvalid': 'Antall minutter på {dato} er ikke et gyldig tall.',
    'arbeidIPeriode.validation.timerDag.tooManyHours': 'Antall timer på {dato} kan ikke overstige 24 timer.',
    'arbeidIPeriode.validation.timerDag.tooManyMinutes': 'Antall minutter på {dato}  kan ikke overstige 59 minutter.',
    'arbeidIPeriode.validation.timerDag.durationIsTooLong':
        'Antall timer og minutter registrert {dato} er for høyt. Tiden kan ikke overstige 24 timer hver ukedag.',
    'arbeidIPeriode.validation.timerDag.durationIsTooShort':
        'Antall timer og minutter {dato}  kan ikke være mindre enn 0 timer og 0 minutter.',
    'arbeidIPeriode.validation.timerDag.minutesAreNegative':
        'Antall timer og minutter {dato}  kan ikke være mindre enn 0 timer og 0 minutter.',
    'arbeidIPeriode.validation.timerDag.hoursAreNegative':
        'Antall timer og minutter {dato}  kan ikke være mindre enn 0 timer og 0 minutter.',
    'arbeidIPeriode.validation.ingenTidRegistrert':
        'Du har ikke oppgitt noe tid med jobb {hvor} på dagene du har søkt om. Hvis dette stemmer, skal du velge "Jeg jobber ikke " på spørsmålet ovenfor.',
};

export const arbeidstidPeriodeMessages_nb = {
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.harJobbet': 'har jobbet',
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.skalJobbe': 'skal jobbe',
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.somAnsatt': `hos {arbeidsstedNavn}`,
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.somFrilanser': 'som frilanser',
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.somSN': 'som selvstendig næringsdrivende',
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.iPerioden': `i perioden {fra} til {til}`,
    'arbeidstidPeriode.timer': '{timer, plural, one {# time} other {# timer}}',
    'arbeidstidPeriode.timer.ikkeTall': `{timer} timer`,
};

type ArbeidstidPeriodeMessagesType = keyof typeof arbeidstidPeriodeMessages_nb;

export const getArbeidstidPeriodeIntl = (intl: IntlShape) => typedIntlHelper<ArbeidstidPeriodeMessagesType>(intl);
