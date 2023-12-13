import { Utenlandsopphold } from '@navikt/sif-common-forms-ds/src';

export interface SkalOppholdeSegIUtlandetSøknadsdata {
    type: 'skalOppholdeSegIUtlandet';
    skalOppholdeSegIUtlandetIPerioden: true;
    opphold: Utenlandsopphold[];
}

export interface SkalIkkeOppholdeSegIUtlandetSøknadsdata {
    type: 'skalIkkeOppholdeSegIUtlandet';
    skalOppholdeSegIUtlandetIPerioden: false;
}

export type UtenlandsoppholdIPeriodenSøknadsdata =
    | SkalOppholdeSegIUtlandetSøknadsdata
    | SkalIkkeOppholdeSegIUtlandetSøknadsdata;
