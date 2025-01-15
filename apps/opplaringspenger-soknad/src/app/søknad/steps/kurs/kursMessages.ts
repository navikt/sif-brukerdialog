const nb = {
    'steg.kurs.counsellorPanel.avsnitt.1':
        'Her trenger vi informasjon om hvor og når du har vært, eller skal, på opplæring. ',
    'steg.kurs.counsellorPanel.avsnitt.2':
        'For å få opplæringspenger må kurset eller opplæringen være ved en godkjent helseinstitusjon eller et offentlig spesialpedagogisk kompetansenter.',
    'steg.kurs.counsellorPanel.avsnitt.3':
        'Du kan få opplæringspenger for perioder du er på opplæring, og eventuell reisetid til og fra opplæringen.',
    'steg.kurs.opplæringsinstitusjon.label': 'Hvor foregår opplæringen?',
    'steg.kurs.opplæringsinstitusjon.description':
        'Skriv inn helseinstitusjon eller kompetansesenter som er ansvarlig for kurs eller opplæring',
    'steg.kurs.opplæringsinstitusjon.stringHasNoValue': '',

    'steg.kurs.kursperioder.tittel': 'Hvilke dager søker du opplæringspenger?',
    'steg.kurs.kursperioder.tekst':
        'Du kan få opplæringspenger for perioder du er på opplæring, og eventuell reisetid til og fra opplæringen.',

    'steg.kurs.kursperiode.addLabel': 'Legg til kursperiode',
    'steg.kurs.kursperiode.modalTitle': 'Legg til kursperiode',
    'steg.kurs.kursperiode.listTitle': 'Kursperioder',

    'steg.kurs.reiserUtenforKursdager.label': 'Reiser du på dager du ikke har kurs eller opplæring?',

    'steg.kurs.validation.opplæringsinstitusjon.stringIsTooShort':
        'Du må beskrive hvor opplæringen foregår med minst 2 tegn.',
    'steg.kurs.validation.reiserUtenforKursdager.yesOrNoIsUnanswered':
        'Du må svare på om du reiser på dager du ikke har kurs eller opplæring.',
    'steg.kurs.validation.opplæringsinstitusjon.stringHasNoValue': 'Du må fylle ut hvor opplæringen foregår.',
    'steg.kurs.validation.kursperioder.listIsEmpty': 'Du må legge til minst én kursperiode.',
    'steg.kurs.validation.kursperioder.kursperioderOverlapper':
        'Noen av periodene du har lagt til overlapper hverandre. Se over fra og til datoene og korriger. Hvis periodene overlapper, må du slå disse periodene sammen til én.',
    'steg.kurs.skalTaUtFerieIPerioden.label': 'Skal du ha ferie i løpet av søknadsperioden?',
    'steg.kurs.validation.skalTaUtFerieIPerioden.yesOrNoIsUnanswered':
        'Du må svare på om du skal ha ferie i søknadsperioden.',
    'steg.kurs.ferie.addLabel': 'Legg til ferie',
    'steg.kurs.ferie.modalTitle': 'Legg til ferie',
    'steg.kurs.ferie.listTitle': 'Ferie i perioden',
    'steg.kurs.validation.ferieuttak.listIsEmpty':
        'Du har krysset av for at du har ferie i søknadsperioden, da må du legge til minst én ferie.',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const kursMessages = { nb, nn };
