const nb = {
    'steg.kurs.counsellorPanel.avsnitt.1':
        'Her trenger vi informasjon om hvor og når du har vært, eller skal, på opplæring.',
    'steg.kurs.counsellorPanel.avsnitt.2':
        'For å få opplæringspenger må kurset eller opplæringen være ved en godkjent helseinstitusjon eller et offentlig spesialpedagogisk kompetansenter.',
    'steg.kurs.counsellorPanel.avsnitt.3':
        'Har du hatt tapt arbeidstid på grunn av reise til eller fra opplæringsstedet kan du søke om kompensasjon for dette.',
    'steg.kurs.opplæringsinstitusjon.label': 'Hvor foregår opplæringen?',
    'steg.kurs.opplæringsinstitusjon.description':
        'Skriv inn helseinstitusjon eller kompetansesenter som er ansvarlig for kurs eller opplæring',
    'steg.kurs.kursperiode.addLabel': 'Legg til kursperiode',
    'steg.kurs.kursperiode.modalTitle': 'Legg til kursperiode',
    'steg.kurs.kursperiode.listTitle': 'Kursperioder',
    'steg.kurs.kursperioder.validation.harTaptArbeidstid.yesOrNoIsUnanswered':
        'Du må svare på om du har tapt arbeidstid på grunn av reise til eller fra opplæringsstedet{harFlerePerioder, select, true { (periode {index})} other{}}.',

    'steg.kurs.kursperioder.validation.avreise.dateHasNoValue':
        'Du må oppgi når avreise til kurset er. Skriv inn eller velg dato fra datovelgeren.',
    'steg.kurs.kursperioder.validation.avreise.dateIsAfterMax':
        'Datoen for avreise kan ikke være etter {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'steg.kurs.kursperioder.validation.avreise.dateIsBeforeMin':
        'Datoen for avreise kan ikke være før {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'steg.kurs.kursperioder.validation.avreise.dateHasInvalidFormat':
        'Du må oppgi dato for avreise i et gyldig format. Gyldig format er dd.mm.åååå.',

    'steg.kurs.kursperioder.validation.hjemkomst.dateHasNoValue':
        'Du må oppgi når avreise til kurset er. Skriv inn eller velg dato fra datovelgeren.',
    'steg.kurs.kursperioder.validation.hjemkomst.dateIsAfterMax':
        'Datoen for avreise kan ikke være etter {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'steg.kurs.kursperioder.validation.hjemkomst.dateIsBeforeMin':
        'Datoen for avreise kan ikke være før {dato}. Skriv inn eller velg dato fra datovelgeren.',
    'steg.kurs.kursperioder.validation.hjemkomst.dateHasInvalidFormat':
        'Du må oppgi dato for avreise i et gyldig format. Gyldig format er dd.mm.åååå.',

    'steg.kurs.begrunnelseReisetid.stringHasNoValue':
        'Du må oppgi en beskrivelse av årsaken til at reisetiden er over én dag etter sluttdato.',
    'steg.kurs.begrunnelseReisetid.stringIsTooLong':
        'Beskrivelsen av årsaken til reisetiden kan ikke være lengre enn 500 tegn.',
    'steg.kurs.begrunnelseReisetid.stringIsTooShort': 'Beskrivelsen av årsaken til reisetiden må være minst 5 tegn.',
    'steg.kurs.begrunnelseReisetid.stringContainsUnicodeChacters':
        'Beskrivelsen årsaken til reisetiden kan ikke inneholde spesialtegn.',

    'steg.kurs.arbeiderIKursperiode.label': 'Jobber du noe de dagene du er på opplæring eller reiser?',
    'steg.kurs.validation.opplæringsinstitusjon.stringIsToShort':
        'Du må beskrive hvor opplæringer foregår med en lengre.',
    'steg.kurs.validation.kursperioder.listIsEmpty': 'Du må legge til minst én kursperiode.',
    'steg.kurs.validation.arbeiderIKursperiode.yesOrNoIsUnanswered':
        'Du må svare på om du jobber noe på de dagene du er på er på kurs, eller reiser til og fra kurs.',
    'steg.kurs.harFerieIPerioden.label': 'Skal du ha ferie i løpet av søknadsperioden?',
    'steg.kurs.validation.harFerieIPerioden.yesOrNoIsUnanswered':
        'Du må svare på om du skal ha ferie i søknadsperioden.',
    'steg.kurs.ferie.addLabel': 'Legg til ferie',
    'steg.kurs.ferie.modalTitle': 'Legg til ferie',
    'steg.kurs.ferie.listTitle': 'Ferie i perioden',
    'steg.kurs.validation.ferie.listIsEmpty':
        'Du har krysset av for at du har ferie i søknadsperioden, da må du legge til minst én ferie.',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const kursMessages = { nb, nn };
