import { DateDurationMap } from '@navikt/sif-common-utils';

export enum JobberIPeriodeSvar {
    'somVanlig' = 'SOM_VANLIG',
    'redusert' = 'REDUSERT',
    'heltFravær' = 'HELT_FRAVÆR',
}

export enum ArbeidIPeriodeField {
    jobberIPerioden = 'jobberIPerioden',
    enkeltdager = 'enkeltdager',
}

export interface ArbeidIPeriode {
    [ArbeidIPeriodeField.jobberIPerioden]: JobberIPeriodeSvar;
    [ArbeidIPeriodeField.enkeltdager]?: DateDurationMap;
}
