import { ArbeidsukeInfo, ArbeidsukeInfoÅrMap } from '../../../types/_ArbeidsukeInfo';

export type ArbeidsukeFieldName = string; // YYYY_WW

export interface Arbeidsuke extends ArbeidsukeInfo {
    fieldname: ArbeidsukeFieldName;
}

export type Arbeidsuker = ArbeidsukeInfoÅrMap<Arbeidsuke>;
