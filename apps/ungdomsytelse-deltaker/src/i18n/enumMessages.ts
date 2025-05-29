const nb = {
    'oppgavestatus.LØST': 'Løst',
    'oppgavestatus.ULØST': 'Uløst',
    'oppgavestatus.AVBRUTT': 'Avbrutt',
    'oppgavestatus.UTLØPT': 'Utløpt',
    'oppgavestatus.LUKKET': 'Lukket',
    'oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE.ENDRET_STARTDATO.tittel': 'Ny startdato i ungdomsprogrammet',
    'oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE.ENDRET_SLUTTDATO.tittel': 'Ny sluttdato i ungdomsprogrammet',
    'oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE.NY_SLUTTDATO.tittel': 'Ny sluttdato i ungdomsprogrammet',
    'oppgavetype.RAPPORTER_INNTEKT': 'Rapporter inntekt',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const enumMessages = {
    nb,
    nn,
};
