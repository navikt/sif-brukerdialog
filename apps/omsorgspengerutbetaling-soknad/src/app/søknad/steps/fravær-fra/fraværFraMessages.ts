const nb = {
    'step.fravaerFra.dag.spm': 'Hvilket arbeid hadde du fravær fra {dato}?',
    'step.fravaerFra.info':
        'Du har opplyst at du er både selvstendig næringsdrivende og frilanser. Nå trenger vi å vite hvilket arbeid du hadde fravær fra i dagene du brukte omsorgsdager.',
    'aktivitetFravær.SELVSTENDIG_VIRKSOMHET': 'selvstendig næringsdrivende',
    'aktivitetFravær.FRILANSER': 'frilanser',
};

const nn: Record<keyof typeof nb, string> = {
    'step.fravaerFra.dag.spm': 'Kva arbeid hadde du fråvær frå {dato}?',
    'step.fravaerFra.info':
        'Du har opplyst at du er både sjølvstendig næringsdrivande og frilanser. No treng me å vite kva arbeid du hadde fråvær frå i dagane du brukte omsorgsdagar.',
    'aktivitetFravær.SELVSTENDIG_VIRKSOMHET': 'sjølvstendig næringsdrivande',
    'aktivitetFravær.FRILANSER': 'frilanser',
};
export const fraværFraMessages = { nb, nn };
