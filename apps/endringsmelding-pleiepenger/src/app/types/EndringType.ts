export enum EndringType {
    'arbeidstid' = 'arbeidstid',
    'lovbestemtFerie' = 'lovbestemtFerie',
    'tilsynsordning' = 'tilsynsordning',
}

export interface SkalEndresMap {
    arbeidstidSkalEndres: boolean;
    lovbestemtFerieSkalEndres: boolean;
    tilsynsordningSkalEndres: boolean;
}
