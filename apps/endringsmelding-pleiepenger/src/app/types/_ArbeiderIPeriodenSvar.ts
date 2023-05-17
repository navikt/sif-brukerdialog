export enum ArbeiderIPeriodenSvar {
    'somVanlig' = 'SOM_VANLIG',
    'redusert' = 'REDUSERT',
    'heltFravær' = 'HELT_FRAVÆR',
}

export const ArbeiderIPeriodenSvarTekst = {
    [ArbeiderIPeriodenSvar.heltFravær]: 'Jeg jobber ikke og har fullt fravær her',
    [ArbeiderIPeriodenSvar.redusert]: 'Jeg kombinerer delvis jobb med pleiepenger',
    [ArbeiderIPeriodenSvar.somVanlig]: 'Jeg jobber som normalt og har ingen fravær her',
};
