export enum EndringType {
    'arbeidstid' = 'arbeidstid',
    'lovbestemtFerie' = 'lovbestemtFerie',
}
export interface SkalEndresMap {
    arbeidstidSkalEndres: boolean;
    lovbestemtFerieSkalEndres: boolean;
}
