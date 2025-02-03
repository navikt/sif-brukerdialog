import { Ferieuttak } from '@navikt/sif-common-forms-ds/src/forms/ferieuttak/types';

export interface SkalTaUtFerieSøknadsdata {
    type: 'skalTaUtFerieSøknadsdata';
    skalTaUtFerieIPerioden: true;
    ferieuttak: Ferieuttak[];
}
export interface SkalIkkeTaUtFerieSøknadsdata {
    type: 'skalIkkeTaUtFerieSøknadsdata';
    skalTaUtFerieIPerioden: false;
}

export type FerieuttakIPeriodenSøknadsdata = SkalTaUtFerieSøknadsdata | SkalIkkeTaUtFerieSøknadsdata;
