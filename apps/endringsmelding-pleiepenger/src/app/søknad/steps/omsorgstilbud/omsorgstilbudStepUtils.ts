import {
    DateDurationMap,
    DateRange,
    dateToISODate,
    getDatesInDateRange,
    getDurationForISOWeekdayNumber,
    ISODateRangeToDateRange,
    ISODateToDate,
} from '@navikt/sif-common-utils';
import { OmsorgstilbudSøknadsdata, SakTilsynsordningPeriode, Søknadsdata } from '@types';
import dayjs from 'dayjs';

import { OmsorgstilbudPeriodeData } from '../../../local-sif-common-pleiepenger/components/omsorgstilbud-periode/components/omsorgstilbud-periode-form/OmsorgstilbudPeriodeForm';
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
        const dates = getDatesInDateRange(periode, true);
        dates.forEach((date) => {
            datesWithDuration[dateToISODate(date)] = duration;
        });
    });
    return datesWithDuration;
};

export const oppdaterDagerMedOmsorgstilbudIPeriode = ({
    fom,
    tom,
    tidFasteDager,
}: OmsorgstilbudPeriodeData): DateDurationMap => {
    const datoerIPeriode = getDatesInDateRange({ from: fom, to: tom }, true);
    const dagerSomSkalEndres: DateDurationMap = {};
    datoerIPeriode.forEach((dato) => {
        const isoDate = dateToISODate(dato);
        const varighet = getDurationForISOWeekdayNumber(tidFasteDager, dayjs(ISODateToDate(isoDate)).isoWeekday());
        if (varighet) {
            dagerSomSkalEndres[isoDate] = { ...varighet };
        }
    });
    return dagerSomSkalEndres;
};
