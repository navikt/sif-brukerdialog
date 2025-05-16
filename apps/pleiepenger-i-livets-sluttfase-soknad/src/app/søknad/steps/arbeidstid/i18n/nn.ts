import { arbeidstidMessages_nb, arbeidstidPeriodeMessages_nb } from './nb';

export const arbeidstidMessages_nn: Record<keyof typeof arbeidstidMessages_nb, string> = {
    'arbeidIPeriode.StepInfo.1':
        'Du har fortalt oss at du skal jobbe noko dei dagane du skal gje pleie. I denne kalenderen fører du opp kor mange timar du faktisk jobbar i perioden.',
    'arbeidIPeriode.StepInfo.2':
        'Om du søkjer for første gong, eller du har hatt eit opphald i pleiepengane i minst fire veker, vil vi kontakte arbeidsgjevarar som du har heilt eller delvis fråvær frå for å innhente inntektsmelding.',
    'arbeidIPeriode.FrilansLabel': 'Frilans',
    'arbeidIPeriode.SNLabel': 'Sjølvstendig næringsdrivande',
    'arbeidIPeriode.jobberIPerioden.spm': 'I dagane du søkjer for, kva situasjon gjeld for deg {hvor}?',
    'arbeidIPeriode.enkeltdager_gruppe.legend':
        'Oppgi kor mykje du jobbar {hvor} i dei dagane du søkjer pleiepengar for.',
    'arbeidIPeriode.jobberIPerioden.jobberIkke': 'Eg jobbar ikkje noko dei dagane eg pleier',
    'arbeidIPeriode.jobberIPerioden.jobberVanlig': 'Eg jobbar som normalt, og har ikkje fråvær',
    'arbeidIPeriode.jobberIPerioden.jobberRedusert': 'Eg kombinerer delvis jobb med pleiepengar',
    'arbeidIPeriode.iDag.utledet': 'timar i veka',
    'arbeidIPeriode.prosent.utledet.medTimer': 'prosent av {timerNormalt} ({timerRedusert} per dag)',
    'arbeidIPeriode.arbeidstidSted.frilansoppdrag': 'Frilansoppdrag',
    'arbeidIPeriode.arbeidstidSted.sn': 'Sjølvstendig næringsdrivande',

    'arbeidIPeriode.validation.timerDag.timeHasNoValue': 'Du må fylle ut timar og minutt for {dato} {hvor}.',
    'arbeidIPeriode.validation.timerDag.hoursAreInvalid': 'Tal på timar for {dato} er ikkje eit gyldig tal.',
    'arbeidIPeriode.validation.timerDag.minutesAreInvalid': 'Tal på minutt for {dato} er ikkje eit gyldig tal.',
    'arbeidIPeriode.validation.timerDag.tooManyHours': 'Tal på timar for {dato} kan ikkje overstige 24 timar.',
    'arbeidIPeriode.validation.timerDag.tooManyMinutes': 'Tal på minutt for {dato} kan ikkje overstige 59 minutt.',
    'arbeidIPeriode.validation.timerDag.durationIsTooLong':
        'Tal på timar og minutt registrert for {dato} er for høgt. Tida kan ikkje overstige 24 timar kvar vekedag.',
    'arbeidIPeriode.validation.timerDag.durationIsTooShort':
        'Tal på timar og minutt for {dato} kan ikkje vere mindre enn 0 timar og 0 minutt.',
    'arbeidIPeriode.validation.timerDag.minutesAreNegative':
        'Tal på timar og minutt for {dato} kan ikkje vere mindre enn 0 timar og 0 minutt.',
    'arbeidIPeriode.validation.timerDag.hoursAreNegative':
        'Tal på timar og minutt for {dato} kan ikkje vere mindre enn 0 timar og 0 minutt.',
    'arbeidIPeriode.validation.ingenTidRegistrert':
        "Du har ikkje oppgjeve noko tid med jobb {hvor} på dagane du har søkt om. Dersom dette stemmer, skal du velje 'Eg jobbar ikkje' på spørsmålet ovanfor.",
};

export const arbeidstidPeriodeMessages_nn: Record<keyof typeof arbeidstidPeriodeMessages_nb, string> = {
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.harJobbet': 'har jobba',
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.skalJobbe': 'skal jobbe',
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.somAnsatt': `hos {arbeidsstedNavn}`,
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.somFrilanser': 'som frilansar',
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.somSN': 'som sjølvstendig næringsdrivande',
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.iPerioden': `i perioden {fra} til {til}`,
    'arbeidstidPeriode.timer': '{timer, plural, one {# time} other {# timar}}',
    'arbeidstidPeriode.timer.ikkeTall': `{timer} timar`,
};
