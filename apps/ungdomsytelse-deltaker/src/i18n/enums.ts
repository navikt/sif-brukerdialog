const nb = {
    'oppgavestatus.LØST': 'Løst',
    'oppgavestatus.ULØST': 'Uløst',
    'oppgavestatus.KANSELLERT': 'Kansellert',
    'oppgavestatus.UTLØPT': 'Utløpt',
    'oppgavetype.BEKREFT_ENDRET_STARTDATO': 'Endret startdato',
    'oppgavetype.BEKREFT_ENDRET_SLUTTDATO': 'Endret sluttdato',
    'oppgavetype.BEKREFT_KORRIGERT_INNTEKT': 'Endret inntekt',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const enumMessages = {
    nb,
    nn,
};
