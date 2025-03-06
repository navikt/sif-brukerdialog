const nb = {
    'oppgavestatus.LØST': 'Løst',
    'oppgavestatus.ULØST': 'Uløst',
    'oppgavestatus.KANSELLERT': 'Kansellert',
    'oppgavetype.BEKREFT_ENDRET_STARTDATO': 'Endret startdato',
    'oppgavetype.BEKREFT_ENDRET_SLUTTDATO': 'Endret sluttdato',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const enumMessages = {
    nb,
    nn,
};
