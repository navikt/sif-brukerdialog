import {
    DateDurationMap,
    DateRange,
    dateToISODate,
    getDatesInDateRange,
    ISODateRangeToDateRange,
} from '@navikt/sif-common-utils';
import { OmsorgstilbudSøknadsdata, SakTilsynsordningPeriode, Søknadsdata } from '@types';

import { OmsorgstilbudFormValues } from './OmsorgstilbudForm';

export const getOmsorgstilbudStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: OmsorgstilbudFormValues,
): OmsorgstilbudFormValues => {
    if (formValues) {
        return formValues;
    }
    if (søknadsdata.omsorgstilbud === undefined) {
        return {
            omsorgsdager: {},
        };
    }
    return {
        omsorgsdager: søknadsdata.omsorgstilbud.enkeltdager,
    };
};

export const getOmsorgstilbudSøknadsdataFromFormValues = (
    values: OmsorgstilbudFormValues,
): OmsorgstilbudSøknadsdata => {
    return {
        enkeltdager: values.omsorgsdager,
        enkeltdagerMeta: {
            erEndret: false,
        },
    };
};

export const mapSakTilsynsordningPeriodeToDateDurationMap = (
    tilsynsordningPeriode: SakTilsynsordningPeriode,
): DateDurationMap => {
    const datesWithDuration: DateDurationMap = {};
    Object.keys(tilsynsordningPeriode).forEach((key) => {
        const periode: DateRange = ISODateRangeToDateRange(key);
        const duration = tilsynsordningPeriode[key];
        const dates = getDatesInDateRange(periode);
        dates.forEach((date) => {
            datesWithDuration[dateToISODate(date)] = duration;
        });
    });
    return datesWithDuration;
};
