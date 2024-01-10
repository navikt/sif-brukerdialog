import { DateRange } from '@navikt/sif-common-formik-ds/src';
import { dateRangeUtils } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { ArbeidsukeInfo } from '../types/ArbeidsukeInfo';
import { getArbeidsdagerPeriode } from './arbeidUtils';

export const getArbeidsukeInfoIPeriode = (dateRange: DateRange): ArbeidsukeInfo => {
    const antallArbeidsdager = dateRangeUtils.getNumberOfDaysInDateRange(dateRange, true);
    return {
        årstall: dateRange.from.getFullYear(),
        periode: dateRange,
        ukenummer: dayjs(dateRange.from).week(),
        arbeidsdagerPeriode: getArbeidsdagerPeriode(dateRange),
        erFullArbeidsuke: antallArbeidsdager === 5,
    };
};
