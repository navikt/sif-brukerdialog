const nb = {
    'oppgavestatus.LØST': 'Løst',
    'oppgavestatus.ULØST': 'Uløst',
    'oppgavestatus.AVBRUTT': 'Avbrutt',
    'oppgavestatus.UTLØPT': 'Utløpt',
    'oppgavestatus.LUKKET': 'Lukket',

    'oppgavetype.SØK_YTELSE.tittel': 'Søknad for ungdomsprogramytelsen',
    'oppgavetype.SØK_YTELSE.info': 'Du er meldt inn i ungdomsprogrammet. Nå kan du søke om ungdomsprogramytelsen.',

    'oppgavetype.RAPPORTER_INNTEKT.tittel': 'Meld fra om du hadde inntekt {måned}',
    'oppgavetype.RAPPORTER_INNTEKT.info':
        'Meld fra om du jobbet og fikk utbetalt lønn i september. Hadde du ingen inntekt, trenger du ikke gjøre noe.',
    'oppgavetype.RAPPORTER_INNTEKT.info.rapportert': 'Du meldte at du hadde {inntekt} kr i inntekt i {måned}.',
    'oppgavetype.RAPPORTER_INNTEKT.info.ikkeRapportert': 'Du meldte at du ikke hadde inntekt i {måned}.',

    'oppgavetype.BEKREFT_ENDRET_STARTDATO.tittel': 'Se og gi tilbakemelding på ny startdato',
    'oppgavetype.BEKREFT_ENDRET_STARTDATO.info':
        'Veilederen din har endret datoen for når du startet i ungdomsprogrammet.',
    'oppgavetype.BEKREFT_ENDRET_STARTDATO.forstårOppgaveSpørsmål': 'Forstår og godtar du at startdatoen din er endret',

    'oppgavetype.BEKREFT_ENDRET_SLUTTDATO.tittel': 'Se og gi tilbakemelding på sluttdato',
    'oppgavetype.BEKREFT_ENDRET_SLUTTDATO.info':
        'Veilederen din har satt en dato for når du slutter i ungdomsprogrammet. ',
    'oppgavetype.BEKREFT_ENDRET_SLUTTDATO.forstårOppgaveSpørsmål': 'Forstår og godtar du at sluttdatoen din er endret',

    'oppgavetype.BEKREFT_NY_SLUTTDATO.tittel': 'Se og gi tilbakemelding på ny sluttdato',
    'oppgavetype.BEKREFT_NY_SLUTTDATO.info': 'Veilederen din har endret datoen for når du slutter i ungdomsprogrammet.',
    'oppgavetype.BEKREFT_NY_SLUTTDATO.forstårOppgaveSpørsmål': 'Forstår og godtar du at sluttdatoen din er endret',

    'oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.tittel': 'Se og gi tibakemelding på ulik inntekt for september',
    'oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.info':
        'Det er forskjell mellom det du har oppgitt i lønn, og det arbeidsgiveren din har rapportert til oss.',
    'oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.forstårOppgaveSpørsmål':
        'Forstår og godtar du at inntekten din er endret',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const oppgaveMessages = {
    nb,
    nn,
};
