export enum EndringType {
    'arbeidstid' = 'arbeidstid',
    'lovbestemtFerie' = 'lovbestemtFerie',
    'utenlandsopphold' = 'utenlandsopphold',
}
export interface SkalEndresMap {
    arbeidstidSkalEndres: boolean;
    lovbestemtFerieSkalEndres: boolean;
    utenlandsoppholdSkalEndres: boolean;
}
