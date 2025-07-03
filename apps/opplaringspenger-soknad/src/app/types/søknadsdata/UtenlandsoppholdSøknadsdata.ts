import { UtenlandsoppholdEnkel } from '@navikt/sif-common-forms-ds/src';

export interface SkalOppholdeSegIUtlandetIPeriodenSøknadsdata {
    type: 'harUtenlandsopphold';
    skalOppholdeSegIUtlandetIPerioden: true;
    utenlandsopphold: UtenlandsoppholdEnkel[];
}
export interface SkalIkkeTilUtlandetIPeriodenSøknadsdata {
    type: 'harIkkeUtenlandsopphold';
    skalOppholdeSegIUtlandetIPerioden: false;
}

export type UtenlandsoppholdIPeriodenSøknadsdata =
    | SkalOppholdeSegIUtlandetIPeriodenSøknadsdata
    | SkalIkkeTilUtlandetIPeriodenSøknadsdata;
