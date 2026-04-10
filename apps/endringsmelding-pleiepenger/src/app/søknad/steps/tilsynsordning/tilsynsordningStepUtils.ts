import { TilsynsordningSøknadsdata } from '@app/types';
import {
    DateDurationMap,
    dateToISODate,
    getDatesInDateRange,
    getDurationForISOWeekdayNumber,
    ISODateToDate,
} from '@navikt/sif-common-utils';
import dayjs from 'dayjs';

import { TilsynsordningPeriodeData } from '../tilsynsordning-forenklet/types';
import { TilsynsordningFormValues } from './TilsynsordningForm';

export const getTilsynsordningStepInitialValues = (
    tilsynsordningSøknadsdata: TilsynsordningSøknadsdata | undefined,
    formValues?: TilsynsordningFormValues,
): TilsynsordningFormValues => {
    if (formValues) {
        return formValues;
    }
    if (tilsynsordningSøknadsdata === undefined) {
        return {
            tilsynsdager: {},
        };
    }
    return {
        tilsynsdager: tilsynsordningSøknadsdata.tilsynsdagerMap,
    };
};

export const getTilsynsordningSøknadsdataFromFormValues = (
    values: TilsynsordningFormValues,
): TilsynsordningSøknadsdata => {
    return {
        tilsynsdagerMap: values.tilsynsdager,
    };
};

export const oppdaterDagerMedOmsorgstilbudIPeriode = ({
    periode,
    tidFasteDager,
}: TilsynsordningPeriodeData): DateDurationMap => {
    const datoerIPeriode = getDatesInDateRange({ from: periode.from, to: periode.to }, true);
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
