const nb = {
    'fraværIPeriode.StepInfo.1':
        'Her skal du svare på hvor mye fravær fra jobb du har i perioden du søker om, altså hvor mye du er borte fra jobb mens du er på opplæring.',
    'fraværIPeriode.StepInfo.2':
        'Du får dekket tiden du bruker på opplæringen, og tiden du bruker på reise. Det vil for eksempel si at hvis opplæringen varer i fire timer, og du bruker to timer på å reise til og fra opplæringen, vil du få dekket til sammen seks timer av arbeidsdagen.',
    'fraværIPeriode.StepInfo.3.header': 'Når kontakter vi arbeidsgiveren din?',
    'fraværIPeriode.StepInfo.3.text':
        'Hvis du søker for første gang, eller hvis du har hatt et opphold i opplæringspengene i minst fire uker, kontakter vi arbeidsgiverne som du har fravær fra, for å hente inn inntektsmelding.',
    'fraværIPeriode.FrilansLabel': 'Frilans',
    'fraværIPeriode.SNLabel': 'Selvstendig næringsdrivende',
    'fraværIPeriode.jobberIPerioden.spm': 'Hvor mye fravær har du fra jobb {hvor} på grunn av opplæring og reisetid?',
    'fraværIPeriode.enkeltdager_gruppe.legend':
        'Fyll inn antall timer du er borte fra jobb på grunn av opplæring og reisetid',

    'fraværIPeriode.jobberIPerioden.jobberIkke': 'Jeg er helt borte fra jobb fordi jeg er på opplæring (fullt fravær)',
    'fraværIPeriode.jobberIPerioden.jobberVanlig':
        'Jeg jobber som normalt og er ikke borte fra jobb på grunn av opplæring (ikke fravær)',
    'fraværIPeriode.jobberIPerioden.jobberRedusert':
        'Jeg er delvis borte fra jobb fordi jeg er på opplæring (noe fravær)',
    'fraværIPeriode.iDag.utledet': 'timer i uka',
    'fraværIPeriode.prosent.utledet.medTimer': 'prosent av {timerNormalt} ({timerRedusert} per dag)',
    'fraværIPeriode.arbeidstidSted.frilansoppdrag': 'Frilansoppdrag',
    'fraværIPeriode.arbeidstidSted.sn': 'Selvstendig næringsdrivende',

    'fraværIPeriode.arbeidIPeriodeSpørsmål.monthHeader':
        '{numDatesInMonthWithDuration, plural, one {# dag} other {# dager}} med fravær',
    'fraværIPeriode.arbeidIPeriodeSpørsmål.monthHeader.noAccordion':
        'Timer med fravær fra jobb {date} på grunn av kurs og reise',
    'fraværIPeriode.arbeidIPeriodeSpørsmål.weekHeader': '{månedOgÅr} -  uke {ukenummer}',

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
        'Du har ikke fylt inn timer med fravær {hvor} på dagene du har søkt om. Hvis dette stemmer, skal du velge "{ingenFraværSpørsmål}" på spørsmålet ovenfor.',
};

const nn: Record<keyof typeof nb, string> = {
    'fraværIPeriode.StepInfo.1':
        'Her skal du svare på kor mykje fråvær frå jobb du har i perioden du søkjer om, altså kor mykje du er borte frå jobb medan du er på opplæring.',
    'fraværIPeriode.StepInfo.2':
        'Du får dekt tida du brukar på opplæringa, og tida du brukar på reise. Det vil til dømes sei at viss opplæringa varar i fire timar, og du brukar to timar på å reise til og frå opplæringa, vil du få dekt til samen seks timar av arbeidsdagen.',
    'fraværIPeriode.StepInfo.3.header': 'Når kontaktar me arbeidsgjevaren din?',
    'fraværIPeriode.StepInfo.3.text':
        'Viss du søkjer for fyrste gong, eller viss du har hatt eit opphald i opplæringspengane i minst fire veker, kontaktar me arbeidsgjevaren som du har fråvær frå, for å hente inn inntektsmelding.',
    'fraværIPeriode.FrilansLabel': 'Frilans',
    'fraværIPeriode.SNLabel': 'Sjølvstendig næringsdrivande',
    'fraværIPeriode.jobberIPerioden.spm': 'Kor mykje fråvær har du frå jobb {hvor} på grunn av opplæring og reisetid?',
    'fraværIPeriode.enkeltdager_gruppe.legend':
        'Fyll inn talet på timar du er borte frå jobb på grunn av opplæring og reisetid',
    'fraværIPeriode.jobberIPerioden.jobberIkke': 'Eg er heilt borte frå jobb fordi eg er på opplæring (fullt fråvær)',
    'fraværIPeriode.jobberIPerioden.jobberVanlig':
        'Eg jobbar som normalt og er ikkje borte frå jobb på grunn av opplæring (ikkje fråvær)',
    'fraværIPeriode.jobberIPerioden.jobberRedusert':
        'Eg er delvis borte frå jobb fordi eg er på opplæring (noko fråvær)',
    'fraværIPeriode.iDag.utledet': 'timar i veka',
    'fraværIPeriode.prosent.utledet.medTimer': 'prosent av {timerNormalt} ({timerRedusert} per dag)',
    'fraværIPeriode.arbeidstidSted.frilansoppdrag': 'Frilansoppdrag',
    'fraværIPeriode.arbeidstidSted.sn': 'Sjølvstendig næringsdrivande',
    'fraværIPeriode.arbeidIPeriodeSpørsmål.monthHeader':
        '{numDatesInMonthWithDuration, plural, one {# dag} other {# dager}} med fråvær',
    'fraværIPeriode.arbeidIPeriodeSpørsmål.monthHeader.noAccordion':
        'Timar med fråvær frå jobb {date} på grunn av kurs og reise',
    'fraværIPeriode.arbeidIPeriodeSpørsmål.weekHeader': '{månedOgÅr} - veke {ukenummer}',
    'fraværIPeriode.validation.timerDag.timeHasNoValue': 'Du må fylle ut tid med fråvær for {dato} {hvor}.',
    'fraværIPeriode.validation.timerDag.hoursAreInvalid':
        'Talet på timar med fråvær på {dato} er ikkje eit gyldig tal.',
    'fraværIPeriode.validation.timerDag.minutesAreInvalid':
        'Talet på minutt med fråvær på {dato} er ikkje eit gyldig tal.',
    'fraværIPeriode.validation.timerDag.tooManyHours':
        'Talet på timar med fråvær på {dato} kan ikkje overstige 24 timar.',
    'fraværIPeriode.validation.timerDag.tooManyMinutes':
        'Talet på minutt med fråvær på {dato} kan ikkje overstige 59 minutt.',
    'fraværIPeriode.validation.timerDag.durationIsTooLong':
        'Talet på timar og minutt med fråvær registrert {dato} er for høgt. Tida kan ikkje overstige 24 timar kvar vekedag.',
    'fraværIPeriode.validation.timerDag.durationIsTooShort':
        'Talet på timar og minutt med fråvær {dato} kan ikkje vere mindre enn 0 timar og 0 minutt.',
    'fraværIPeriode.validation.timerDag.minutesAreNegative':
        'Talet på timar og minutt med fråvær {dato} kan ikkje vere mindre enn 0 timar og 0 minutt.',
    'fraværIPeriode.validation.timerDag.hoursAreNegative':
        'Talet på timar og minutt med fråvær {dato} kan ikkje vere mindre enn 0 timar og 0 minutt.',
    'fraværIPeriode.validation.ingenTidRegistrert':
        'Du har ikkje fylt inn timar med fråvær {hvor} på dagane du har søkt om. Dersom dette stemmer, skal du velje "{ingenFraværSpørsmål}" på spørsmålet ovanfor.',
};

export const fraværMessages = {
    nb,
    nn,
};
