const nb = {
    'oppgavestatus.LØST': 'Løst',
    'oppgavestatus.ULØST': 'Uløst',
    'oppgavestatus.AVBRUTT': 'Avbrutt',
    'oppgavestatus.UTLØPT': 'Utløpt',
    'oppgavestatus.LUKKET': 'Lukket',

    'oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE.ENDRET_STARTDATO.tittel': 'Ny startdato i ungdomsprogrammet',
    'oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE.ENDRET_STARTDATO.forstårOppgaveSpørsmål':
        'Forstår og godtar du at startdatoen din er endret',

    'oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE.ENDRET_SLUTTDATO.tittel': 'Ny sluttdato i ungdomsprogrammet',
    'oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE.ENDRET_SLUTTDATO.forstårOppgaveSpørsmål':
        'Forstår og godtar du at sluttdatoen din er endret',

    'oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE.NY_SLUTTDATO.tittel': 'Ny sluttdato i ungdomsprogrammet',
    'oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE.NY_SLUTTDATO.forstårOppgaveSpørsmål':
        'Forstår og godtar du at sluttdatoen din er endret',

    'oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.tittel': 'Bekreft eller kommenter avvik i inntekt',
    'oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.forstårOppgaveSpørsmål':
        'Forstår og godtar du at inntekten din er endret',

    'oppgavetype.RAPPORTER_INNTEKT': 'Rapporter inntekt',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const enumMessages = {
    nb,
    nn,
};
