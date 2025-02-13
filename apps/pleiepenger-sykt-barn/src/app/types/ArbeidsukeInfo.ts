import { DateRange } from '@navikt/sif-common-formik-ds';
import { ISODateRange } from '@navikt/sif-common-utils';

export interface ArbeidsukeInfoÅrMap<T> {
    [key: ISODateRange]: T & ArbeidsukeInfo;
}

export interface ArbeidsukeInfo {
    ukenummer: number;
    årstall: number;
    periode: DateRange;
    arbeidsdagerPeriode?: DateRange;
    erFullArbeidsuke: boolean;
}
