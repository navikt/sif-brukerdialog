const nb = {
    'steg.kurs.counsellorPanel.avsnitt.1': 'Her skal du gi oss informasjon om opplæringen.',
    'steg.kurs.counsellorPanel.avsnitt.2':
        'For å få opplæringspenger må du ha gjennomført opplæring ved en helseinstitusjon eller et offentlig godkjent kompetansesenter.',
    'steg.kurs.opplæringsinstitusjonId.label': 'Velg helseinstitusjon/kompetansesenter',
    'steg.kurs.opplæringsinstitusjoner.velg': 'Velg',
    'steg.kurs.opplæringsinstitusjoner.godkjente.group': 'Godkjente helseinstitusjoner og kurssentre',
    'steg.kurs.opplæringsinstitusjoner.annen.group': 'Annen',
    'steg.kurs.opplæringsinstitusjoner.annen.option': 'Annen helseinstitusjon eller kurssenter',
    'steg.kurs.kursperiode.addLabel': 'Legg til kursperiode',
    'steg.kurs.kursperiode.modalTitle': 'Legg til kursperiode',
    'steg.kurs.kursperiode.listTitle': 'Kursperioder',
    'steg.kurs.arbeiderIKursperiode.label':
        'Jobber du noe på de dagene du er på er på kurs, eller reiser til og fra kurs?',
    'steg.kurs.validation.opplæringsinstitusjonId.noValue': 'Du må velge en helseinstitusjon/kompetansesenter.',
    'steg.kurs.validation.kursperioder.listIsEmpty': 'Du må legge til minst én kursperiode.',
    'steg.kurs.validation.arbeiderIKursperiode.yesOrNoIsUnanswered':
        'Du må svare på om du jobber noe på de dagene du er på er på kurs, eller reiser til og fra kurs.',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const kursMessages = { nb, nn };
