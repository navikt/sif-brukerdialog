import { DateDurationMap } from '@navikt/sif-common-utils/lib';

export enum JobberIPeriodeSvar {
    'somVanlig' = 'SOM_VANLIG',
    'redusert' = 'REDUSERT',
    'heltFravær' = 'HELT_FRAVÆR',
}

export enum ArbeidIPeriodeField {
    jobberIPerioden = 'jobberIPerioden',
    enkeltdager = 'enkeltdager',
    // arbeidstid = 'arbeidstid',
}

export interface ArbeidIPeriode {
    [ArbeidIPeriodeField.jobberIPerioden]: JobberIPeriodeSvar;
    [ArbeidIPeriodeField.enkeltdager]?: DateDurationMap;
    // [ArbeidIPeriodeField.arbeidstid]?: DateDurationMap;
}
