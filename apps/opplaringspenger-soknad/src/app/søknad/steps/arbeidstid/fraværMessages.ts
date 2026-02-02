const nb = {
    'fraværIPeriode.StepInfo.1':
        'Her fyller du ut om du har hatt fullt fravær eller jobber noe de dagene du er på kurs eller har opplæring.',
    'fraværIPeriode.StepInfo.2':
        'Hvis du søker for første gang, eller du har hatt et opphold i minst fire uker, vil vi kontakte arbeidsgivere som du har helt eller delvis fravær fra for å innhente inntektsmelding.',
    'fraværIPeriode.FrilansLabel': 'Frilans',
    'fraværIPeriode.SNLabel': 'Selvstendig næringsdrivende',
    'fraværIPeriode.jobberIPerioden.spm': 'Har du fravær {hvor} på grunn av kurs eller reisetid i søknadsperioden?',
    'fraværIPeriode.enkeltdager_gruppe.legend':
        'Oppgi hvor mye fravær du har {hvor} på grunn av kurs eller reisetid i søknadsperioden.',
    'fraværIPeriode.enkeltdager_gruppe.description': 'Du trenger ikke fylle ut for dager du ikke har fravær',

    'fraværIPeriode.jobberIPerioden.jobberIkke': 'Jeg har fullt fravær her',
    'fraværIPeriode.jobberIPerioden.jobberVanlig': 'Jeg jobber som normalt her, og har ikke fravær',
    'fraværIPeriode.jobberIPerioden.jobberRedusert': 'Jeg har noe fravær her, og jobber noe de dagene jeg søker om',
    'fraværIPeriode.iDag.utledet': 'timer i uka',
    'fraværIPeriode.prosent.utledet.medTimer': 'prosent av {timerNormalt} ({timerRedusert} per dag)',
    'fraværIPeriode.arbeidstidSted.frilansoppdrag': 'Frilansoppdrag',
    'fraværIPeriode.arbeidstidSted.sn': 'Selvstendig næringsdrivende',

    'fraværIPeriode.arbeidIPeriodeSpørsmål.monthHeader':
        'Arbeider {numDatesInMonthWithDuration} av {enabledDatesInMonth} dager',
    'fraværIPeriode.arbeidIPeriodeSpørsmål.monthHeader.noAccordion':
        'Timer med fravær fra jobb {date} på grunn av kurs og reise',

    'fraværIPeriode.validation.timerDag.timeHasNoValue': 'Du må fylle ut tid med fravær for {dato} {hvor}.',
    'fraværIPeriode.validation.timerDag.hoursAreInvalid': 'Antall timer med fravær på {dato} er ikke et gyldig tall.',
    'fraværIPeriode.validation.timerDag.minutesAreInvalid':
        'Antall minutter med fravær på {dato} er ikke et gyldig tall.',
    'fraværIPeriode.validation.timerDag.tooManyHours': 'Antall timer med fravær på {dato} kan ikke overstige 24 timer.',
    'fraværIPeriode.validation.timerDag.tooManyMinutes':
        'Antall minutter med fravær på {dato}  kan ikke overstige 59 minutter.',
    'fraværIPeriode.validation.timerDag.durationIsTooLong':
        'Antall timer og minutter med fravær registrert {dato} er for høyt. Tiden kan ikke overstige 24 timer hver ukedag.',
    'fraværIPeriode.validation.timerDag.durationIsTooShort':
        'Antall timer og minutter med fravær {dato}  kan ikke være mindre enn 0 timer og 0 minutter.',
    'fraværIPeriode.validation.timerDag.minutesAreNegative':
        'Antall timer og minutter med fravær {dato}  kan ikke være mindre enn 0 timer og 0 minutter.',
    'fraværIPeriode.validation.timerDag.hoursAreNegative':
        'Antall timer og minutter med fravær {dato}  kan ikke være mindre enn 0 timer og 0 minutter.',
    'fraværIPeriode.validation.ingenTidRegistrert':
        'Du har ikke oppgitt noe tid med fravær {hvor} på dagene du har søkt om. Hvis dette stemmer, skal du velge "Jeg jobber ikke de dagene jeg søker om" på spørsmålet ovenfor.',
};

const nn: Record<keyof typeof nb, string> = {
    'fraværIPeriode.StepInfo.1':
        'Her fyller du ut om du har hatt fullt fråvær eller jobbar noko dei dagane du er på kurs eller har opplæring.',
    'fraværIPeriode.StepInfo.2':
        'Viss du søkjer for fyrste gong, eller du har hatt eit opphald i minst fire veker, vil vi kontakte arbeidsgjevarar som du har heilt eller delvis fråvær frå for å innhente inntektsmelding.',
    'fraværIPeriode.FrilansLabel': 'Frilans',
    'fraværIPeriode.SNLabel': 'Sjølvstendig næringsdrivande',
    'fraværIPeriode.jobberIPerioden.spm': 'Jobbar du noko {hvor} i søknadsperioden?',
    'fraværIPeriode.enkeltdager_gruppe.legend': 'Oppgi kor mykje du jobbar {hvor} i søknadsperioden.',
    'fraværIPeriode.enkeltdager_gruppe.description': 'Du treng ikkje fylle ut for dagar du ikkje jobbar',
    'fraværIPeriode.jobberIPerioden.jobberIkke': 'Eg jobbar ikkje dei dagane eg søkjer om',
    'fraværIPeriode.jobberIPerioden.jobberVanlig': 'Eg jobbar som normalt, og har ikkje fråvær',
    'fraværIPeriode.jobberIPerioden.jobberRedusert': 'Eg jobbar noko dei dagane eg søkjer om',
    'fraværIPeriode.iDag.utledet': 'timar i veka',
    'fraværIPeriode.prosent.utledet.medTimer': 'prosent av {timerNormalt} ({timerRedusert} per dag)',
    'fraværIPeriode.arbeidstidSted.frilansoppdrag': 'Frilansoppdrag',
    'fraværIPeriode.arbeidstidSted.sn': 'Sjølvstendig næringsdrivande',

    'fraværIPeriode.arbeidIPeriodeSpørsmål.monthHeader':
        'Jobbar {numDatesInMonthWithDuration} av {enabledDatesInMonth} dagar',
    'fraværIPeriode.arbeidIPeriodeSpørsmål.monthHeader.noAccordion': 'Timar med jobb {date}',

    'fraværIPeriode.validation.timerDag.timeHasNoValue': 'Du må fylle ut timar og minutt for {dato} {hvor}.',
    'fraværIPeriode.validation.timerDag.hoursAreInvalid': 'Talet på timar på {dato} er ikkje eit gyldig tal.',
    'fraværIPeriode.validation.timerDag.minutesAreInvalid': 'Talet på minutt på {dato} er ikkje eit gyldig tal.',
    'fraværIPeriode.validation.timerDag.tooManyHours': 'Talet på timar på {dato} kan ikkje overstige 24 timar.',
    'fraværIPeriode.validation.timerDag.tooManyMinutes': 'Talet på minutt på {dato} kan ikkje overstige 59 minutt.',
    'fraværIPeriode.validation.timerDag.durationIsTooLong':
        'Talet på timar og minutt registrert {dato} er for høgt. Tida kan ikkje overstige 24 timar kvar vekedag.',
    'fraværIPeriode.validation.timerDag.durationIsTooShort':
        'Talet på timar og minutt {dato} kan ikkje vere mindre enn 0 timar og 0 minutt.',
    'fraværIPeriode.validation.timerDag.minutesAreNegative':
        'Talet på timar og minutt {dato} kan ikkje vere mindre enn 0 timar og 0 minutt.',
    'fraværIPeriode.validation.timerDag.hoursAreNegative':
        'Talet på timar og minutt {dato} kan ikkje vere mindre enn 0 timar og 0 minutt.',
    'fraværIPeriode.validation.ingenTidRegistrert':
        'Du har ikkje oppgitt noko tid med jobb {hvor} på dagane du har søkt om. Dersom dette stemmer, skal du velje "Eg jobbar ikkje dei dagane eg søkjer om" på spørsmålet ovanfor.',
};

export const fraværMessages = {
    nb,
    nn,
};
