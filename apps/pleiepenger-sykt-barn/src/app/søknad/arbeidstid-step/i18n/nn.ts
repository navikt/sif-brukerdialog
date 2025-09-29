import { arbeidIPeriodeMessages_nb } from './nb';

export const arbeidIPeriodeMessages_nn: Record<keyof typeof arbeidIPeriodeMessages_nb, string> = {
    'arbeidIPeriode.spørsmål.ANSATT.arbeiderIPerioden': 'Kva situasjon gjeld for deg {hvor} i søknadsperioden?',
    'arbeidIPeriode.spørsmål.ANSATT.erLiktHverUke': 'Jobbar du like mykje kvar veke {hvor} i perioden?',
    'arbeidIPeriode.spørsmål.ANSATT.timerEllerProsent': 'Korleis vil du oppgje kor mykje du jobbar {hvor} i perioden?',
    'arbeidIPeriode.spørsmål.ANSATT.snittTimerPerUke': 'Kor mange timar jobbar du kvar veke {hvor} i perioden?',
    'arbeidIPeriode.spørsmål.ANSATT.prosentAvNormalt': 'Kor mange prosent jobbar du {hvor} i perioden?',
    'arbeidIPeriode.spørsmål.ANSATT.arbeidsuker':
        'Oppgje kor mange timar du jobbar {hvor} i kvar enkeltveke i perioden?',
    'arbeidIPeriode.spørsmål.FRILANSER.arbeiderIPerioden':
        'Kva situasjon gjeld for deg som frilansar i søknadsperioden?',
    'arbeidIPeriode.spørsmål.FRILANSER.erLiktHverUke': 'Jobbar du like mykje kvar veke som frilansar i perioden?',
    'arbeidIPeriode.spørsmål.FRILANSER.timerEllerProsent':
        'Korleis vil du oppgje kor mykje du jobbar som frilansar i perioden?',
    'arbeidIPeriode.spørsmål.FRILANSER.snittTimerPerUke':
        'Kor mange timar jobbar du kvar veke som frilansar i perioden?',
    'arbeidIPeriode.spørsmål.FRILANSER.prosentAvNormalt': 'Kor mange prosent jobbar du som frilansar i perioden?',
    'arbeidIPeriode.spørsmål.FRILANSER.arbeidsuker':
        'Oppgje kor mange timar du jobbar som frilansar i kvar enkeltveke i perioden?',
    'arbeidIPeriode.spørsmål.SELVSTENDIG.arbeiderIPerioden':
        'Kva situasjon gjeld for deg som sjølvstendig næringsdrivande i søknadsperioden?',
    'arbeidIPeriode.spørsmål.SELVSTENDIG.erLiktHverUke':
        'Jobbar du like mykje kvar veke som sjølvstendig næringsdrivande i perioden?',
    'arbeidIPeriode.spørsmål.SELVSTENDIG.timerEllerProsent':
        'Korleis vil du oppgje kor mykje du jobbar som sjølvstendig næringsdrivande i perioden?',
    'arbeidIPeriode.spørsmål.SELVSTENDIG.snittTimerPerUke':
        'Kor mange timar jobbar du kvar veke som sjølvstendig næringsdrivande i perioden?',
    'arbeidIPeriode.spørsmål.SELVSTENDIG.prosentAvNormalt':
        'Kor mange prosent jobbar du som sjølvstendig næringsdrivande i perioden?',
    'arbeidIPeriode.spørsmål.SELVSTENDIG.arbeidsuker':
        'Oppgje kor mange timar du jobbar som sjølvstendig næringsdrivande i kvar enkeltveke i perioden?',

    'arbeidIPeriode.validation.arbeiderIPerioden.noValue':
        'Du må svare på kva situasjon som gjeld for deg {hvor} i søknadsperioden.',
    'arbeidIPeriode.validation.erLiktHverUke.noValue':
        'Du må svare på om du jobbar like mykje kvar veke {hvor} i perioden.',
    'arbeidIPeriode.validation.timerEllerProsent.noValue':
        'Du må svare på korleis du ønskjer å oppgje kor mykje du jobbar {hvor}.',
    'arbeidIPeriode.validation.prosentAvNormalt.numberHasNoValue': 'Du må oppgje kor mange prosent du jobbar {hvor}.',
    'arbeidIPeriode.validation.prosentAvNormalt.numberHasInvalidFormat':
        'Talet på prosent du jobbar {hvor} har ikkje gyldig format. Eit gyldig tal inneheld berre siffer og komma som desimalteikn.',
    'arbeidIPeriode.validation.prosentAvNormalt.numberIsTooSmall':
        'Talet på prosent du jobbar {hvor} kan ikkje vere mindre enn {min}.',
    'arbeidIPeriode.validation.prosentAvNormalt.numberIsTooLarge':
        'Talet på prosent du jobbar {hvor} kan ikkje vere meir enn {max}.',
    'arbeidIPeriode.validation.snittTimerPerUke.numberHasNoValue': 'Du må oppgje kor mange timar du jobbar {hvor}.',
    'arbeidIPeriode.validation.snittTimerPerUke.numberHasInvalidFormat':
        'Talet på timar du jobbar {hvor} har ikkje gyldig format. Eit gyldig tal inneheld berre siffer og komma som desimalteikn.',
    'arbeidIPeriode.validation.snittTimerPerUke.numberIsTooSmall':
        'Talet på timar du jobbar {hvor} kan ikkje vere mindre enn {min}.',
    'arbeidIPeriode.validation.snittTimerPerUke.numberIsTooLarge':
        'Talet på timar du jobbar {hvor} kan ikkje vere meir enn det du jobbar normalt ({max}).',
    'arbeidIPeriode.validation.snittTimerPerUke.UKE.numberHasNoValue':
        'Du må oppgje kor mange timar du jobbar i veke {ukenummer} {hvor}.',
    'arbeidIPeriode.validation.snittTimerPerUke.UKE.numberHasInvalidFormat':
        'Talet på timar du jobbar i veke {ukenummer} {hvor} har ikkje gyldig format. Eit gyldig tal inneheld berre siffer og komma som desimalteikn.',
    'arbeidIPeriode.validation.snittTimerPerUke.UKE.numberIsTooSmall':
        'Talet på timar du jobbar i veke {ukenummer} {hvor} kan ikkje vere mindre enn {min}.',
    'arbeidIPeriode.validation.snittTimerPerUke.UKE.numberIsTooLarge':
        'Talet på timar du jobbar i veke {ukenummer} {hvor} kan ikkje vere meir enn {max}.',
    'arbeidIPeriode.validation.snittTimerPerUke.UKE.flereTimerEnnTilgjengeligIUke':
        'Talet på timar du har oppgjeve i veke {ukenummer} {hvor} kan ikkje vere meir enn det er timar i døgnet ({dagInfo}).',

    'arbeidIPeriode.erLiktHverUke.ja': 'Ja',
    'arbeidIPeriode.erLiktHverUke.nei': 'Nei, det varierar',
    'arbeidIPeriode.arbeiderIPerioden.svar.jobberIkke': 'Eg jobbar ikkje',
    'arbeidIPeriode.arbeiderIPerioden.svar.jobberRedusert': 'Eg kombinerer delvis jobb med pleiepengar',
    'arbeidIPeriode.arbeiderIPerioden.svar.jobberVanlig':
        'Eg jobbar som normalt, og har ikkje fråvær på grunn av pleiepengar',
    'arbeidIPeriode.timerEllerProsent.timer': 'I timar',
    'arbeidIPeriode.timerEllerProsent.prosent': 'I prosent',

    'arbeidIPeriode.arbeiderIPerioden.description':
        'Hugs at du også skal ta med eventuell jobb som du mottar honorar for.',
    'arbeidIPeriode.uke.ukenummer': 'Veke {ukenummer}',
    'arbeidIPeriode.uke.ukedatoer': '{ukedatoer}',
    'arbeidstidPeriode.timer': '{timer, plural, one {# time} other {# timar}}',
    'arbeidstidPeriode.timer.ikkeTall': `{timer} timar`,
    'arbeidIPeriode.info.frilanser.tittel': 'Delvis jobb som frilansar i perioden',
    'arbeidIPeriode.info.frilanser.tekst.FRILANS':
        'No må vi vite kor mange timar du jobbar som frilansar i perioden du søkjer for.',
    'arbeidIPeriode.info.frilanser.tekst.FRILANS_HONORAR':
        'No må vi vite kor mange timar du jobbar som frilansar i perioden du søkjer for. Du skal altså leggje saman tida du jobbar som frilansar, med tida du brukar på det du mottek honorar for. Du skal oppgje denne tida samla.',
    'arbeidIPeriode.info.frilanser.tekst.HONORAR':
        'No må vi vite kor mange timar du jobbar som frilansar i perioden du søkjer for. Det vil seie kor mange timar du brukar på arbeidet du får honorar for.',

    'step.arbeidstid.pageTitle': 'Pleiepengesøknad - opplysningar om arbeidstid',
    'step.arbeidstid.stepTitle': 'Jobb i søknadsperioden',
    'step.arbeidstid.stepIndicatorLabel': 'Jobb i søknadsperioden',

    'arbeidIPeriode.StepInfo.1':
        'Her skal du svare på om du jobbar noko i perioden du søkjer om. Altså om du kombinerer pleiepengar med delvis jobb.',
    'arbeidIPeriode.StepInfo.2':
        'Pleiepengane blir gradert mot den tida du jobbar. Det vil seie at viss du til dømes i søknadsperioden jobbar 30 prosent, kan du ha rett til opptil 70 prosent pleiepengar.',
    'arbeidIPeriode.StepInfo.3':
        'Viss du søkjer for fyrste gong, eller du har hatt eit opphald i pleiepengane i minst fire veker, vil vi kontakte arbeidsgjevarar som du har heilt eller delvis fråvær frå for å innhente inntektsmelding.',

    'arbeidIPeriode.redusert.info.tekst':
        'Viss du er usikker på kor mykje du skal jobbe framover i tid, legg du inn slik du trur du skal jobbe. Viss det seinare viser seg at du jobbar meir eller mindre enn du trur no, melder du frå om endring i slutten av den aktuelle månaden.',
    'arbeidIPeriode.redusert.info.tekst.mottarOmsorgsstønad':
        'Du skal ikkje ta med tid for fosterheimsgodtgjersle og omsorgsstønad.',

    'arbeidIPeriode.redusert.endring.tittel': 'Korleis melder eg frå om endring?',
    'arbeidIPeriode.redusert.endring.arb_frilans.tekst':
        'Du sender endringsmelding for pleiepengar som du finn under «Skjema og søknad» på nav.no, eller på «Dine pleiepengar» på innlogga side. I endringsmeldinga kan du enkelt registrere kor mykje du har jobba.',
    'arbeidIPeriode.redusert.endring.sn.tekst':
        'Du sender ei melding med kor mykje du har jobba via «Skriv til oss»-tenesta på innlogga side.',
};
