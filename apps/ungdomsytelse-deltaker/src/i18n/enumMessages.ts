const nb = {
    'oppgavestatus.LØST': 'Løst',
    'oppgavestatus.ULØST': 'Uløst',
    'oppgavestatus.AVBRUTT': 'Avbrutt',
    'oppgavestatus.UTLØPT': 'Utløpt',
    'oppgavestatus.LUKKET': 'Lukket',
    'oppgavetype.BEKREFT_ENDRET_STARTDATO': 'Endret startdato',
    'oppgavetype.BEKREFT_ENDRET_SLUTTDATO': 'Endret sluttdato',
    'oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT': 'Endret inntekt',
    'oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE': 'Endret programperiode',
    'oppgavetype.RAPPORTER_INNTEKT': 'Rapporter inntekt',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const enumMessages = {
    nb,
    nn,
};
