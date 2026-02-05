export enum EndringType {
    'arbeidstid' = 'arbeidstid',
    'lovbestemtFerie' = 'lovbestemtFerie',
    'omsorgstilbud' = 'omsorgstilbud',
}

export interface SkalEndresMap {
    arbeidstidSkalEndres: boolean;
    lovbestemtFerieSkalEndres: boolean;
    omsorgstilbudSkalEndres: boolean;
}
