import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { Duration, ISODate, ISODuration } from '@navikt/sif-common-utils';

export * from './Daginfo';
export * from './Ukeinfo';

export enum ArbeidsforholdType {
    ANSATT = 'ANSATT',
    FRILANSER = 'FRILANSER',
    SELVSTENDIG = 'SELVSTENDIG',
}

export type TidPerDagValidator = (dag: string) => (tid: Duration) => ValidationError | undefined;

export enum ArbeiderIPeriodenSvar {
    'somVanlig' = 'SOM_VANLIG',
    'redusert' = 'REDUSERT',
    'heltFravær' = 'HELT_FRAVÆR',
}

export type ArbeidIPeriodeIntlValues = {
    hvor: string;
    skalEllerHarJobbet: string;
    timer: string;
    fra: string;
    til: string;
    iPerioden: string;
};

export interface DagMedTid {
    dato: Date;
    tid: Duration;
    normaltid?: Duration;
}

export interface ArbeidstimerApiData {
    normalTimer: ISODuration;
    faktiskTimer: ISODuration;
}

export interface ArbeidstimerFasteDagerApiData {
    mandag?: ArbeidstimerApiData;
    tirsdag?: ArbeidstimerApiData;
    onsdag?: ArbeidstimerApiData;
    torsdag?: ArbeidstimerApiData;
    fredag?: ArbeidstimerApiData;
}

export interface ArbeidstidEnkeltdagApiData {
    dato: ISODate;
    arbeidstimer: ArbeidstimerApiData;
}
