const nb = {
    'arbeidIPeriode.StepInfo.1':
        'Her fyller du ut om du har hatt fullt fravær eller jobber noe de dagene du er på kurs eller har opplæring.',
    'arbeidIPeriode.FrilansLabel': 'Frilans',
    'arbeidIPeriode.SNLabel': 'Selvstendig næringsdrivende',
    'arbeidIPeriode.jobberIPerioden.spm': 'Jobber du noe {hvor} i søknadsperioden?',
    'arbeidIPeriode.enkeltdager_gruppe.legend': 'Oppgi hvor mye du jobber {hvor} i søknadsperioden.',
    'arbeidIPeriode.enkeltdager_gruppe.description': 'Du trenger ikke fylle ut for dager du ikke jobber',

    'arbeidIPeriode.jobberIPerioden.jobberIkke': 'Jeg jobber ikke',
    'arbeidIPeriode.jobberIPerioden.jobberVanlig': 'Jeg jobber som normalt, og har ikke fravær',
    'arbeidIPeriode.jobberIPerioden.jobberRedusert': 'Jeg jobber noe',
    'arbeidIPeriode.iDag.utledet': 'timer i uka',
    'arbeidIPeriode.prosent.utledet.medTimer': 'prosent av {timerNormalt} ({timerRedusert} per dag)',
    'arbeidIPeriode.arbeidstidSted.frilansoppdrag': 'Frilansoppdrag',
    'arbeidIPeriode.arbeidstidSted.sn': 'Selvstendig næringsdrivende',

    'arbeidIPeriode.arbeidIPeriodeSpørsmål.monthHeader':
        'Arbeider {numDatesInMonthWithDuration} av {enabledDatesInMonth} dager',
    'arbeidIPeriode.arbeidIPeriodeSpørsmål.monthHeader.noAccordion': 'Timer med jobb {date}',

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
        'Du har ikke oppgitt noe tid med jobb {hvor} på dagene du har søkt om. Hvis dette stemmer, skal du velge "Jeg jobber ikke de dagene jeg søker om" på spørsmålet ovenfor.',
};

const nn: Record<keyof typeof nb, string> = {
    'arbeidIPeriode.StepInfo.1':
        'Her fyller du ut om du har hatt fullt fråvær eller jobbar noko dei dagane du er på kurs eller har opplæring.',
    'arbeidIPeriode.FrilansLabel': 'Frilans',
    'arbeidIPeriode.SNLabel': 'Sjølvstendig næringsdrivande',
    'arbeidIPeriode.jobberIPerioden.spm': 'Jobbar du noko {hvor} i søknadsperioden?',
    'arbeidIPeriode.enkeltdager_gruppe.legend': 'Oppgi kor mykje du jobbar {hvor} i søknadsperioden.',
    'arbeidIPeriode.enkeltdager_gruppe.description': 'Du treng ikkje fylle ut for dagar du ikkje jobbar',
    'arbeidIPeriode.jobberIPerioden.jobberIkke': 'Eg jobbar ikkje dei dagane eg søkjer om',
    'arbeidIPeriode.jobberIPerioden.jobberVanlig': 'Eg jobbar som normalt, og har ikkje fråvær',
    'arbeidIPeriode.jobberIPerioden.jobberRedusert': 'Eg jobbar noko dei dagane eg søkjer om',
    'arbeidIPeriode.iDag.utledet': 'timar i veka',
    'arbeidIPeriode.prosent.utledet.medTimer': 'prosent av {timerNormalt} ({timerRedusert} per dag)',
    'arbeidIPeriode.arbeidstidSted.frilansoppdrag': 'Frilansoppdrag',
    'arbeidIPeriode.arbeidstidSted.sn': 'Sjølvstendig næringsdrivande',

    'arbeidIPeriode.arbeidIPeriodeSpørsmål.monthHeader':
        'Jobbar {numDatesInMonthWithDuration} av {enabledDatesInMonth} dagar',
    'arbeidIPeriode.arbeidIPeriodeSpørsmål.monthHeader.noAccordion': 'Timar med jobb {date}',

    'arbeidIPeriode.validation.timerDag.timeHasNoValue': 'Du må fylle ut timar og minutt for {dato} {hvor}.',
    'arbeidIPeriode.validation.timerDag.hoursAreInvalid': 'Talet på timar på {dato} er ikkje eit gyldig tal.',
    'arbeidIPeriode.validation.timerDag.minutesAreInvalid': 'Talet på minutt på {dato} er ikkje eit gyldig tal.',
    'arbeidIPeriode.validation.timerDag.tooManyHours': 'Talet på timar på {dato} kan ikkje overstige 24 timar.',
    'arbeidIPeriode.validation.timerDag.tooManyMinutes': 'Talet på minutt på {dato} kan ikkje overstige 59 minutt.',
    'arbeidIPeriode.validation.timerDag.durationIsTooLong':
        'Talet på timar og minutt registrert {dato} er for høgt. Tida kan ikkje overstige 24 timar kvar vekedag.',
    'arbeidIPeriode.validation.timerDag.durationIsTooShort':
        'Talet på timar og minutt {dato} kan ikkje vere mindre enn 0 timar og 0 minutt.',
    'arbeidIPeriode.validation.timerDag.minutesAreNegative':
        'Talet på timar og minutt {dato} kan ikkje vere mindre enn 0 timar og 0 minutt.',
    'arbeidIPeriode.validation.timerDag.hoursAreNegative':
        'Talet på timar og minutt {dato} kan ikkje vere mindre enn 0 timar og 0 minutt.',
    'arbeidIPeriode.validation.ingenTidRegistrert':
        'Du har ikkje oppgitt noko tid med jobb {hvor} på dagane du har søkt om. Dersom dette stemmer, skal du velje "Eg jobbar ikkje dei dagane eg søkjer om" på spørsmålet ovanfor.',
};

export const arbeidstidMessages = {
    nb,
    nn,
};
