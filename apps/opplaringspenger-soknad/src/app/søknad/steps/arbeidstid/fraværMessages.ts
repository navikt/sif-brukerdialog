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
    ...nb,
};

export const fraværMessages = {
    nb,
    nn,
};
