import { ArbeidsukeInfo, ArbeidsukeInfoÅrMap } from '../../../types/ArbeidsukeInfo';

/**
 * ArbeidsukeFieldName format er YYYY_WW
 */
export type ArbeidsukeFieldName = string;

export interface Arbeidsuke extends ArbeidsukeInfo {
    fieldname: ArbeidsukeFieldName;
}

export type Arbeidsuker = ArbeidsukeInfoÅrMap<Arbeidsuke>;
