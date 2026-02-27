import { TilsynsordningPeriodeData } from '@app/modules/tilsynsordning-måned/components/tilsynsordning-periode-form/TilsynsordningPeriodeForm';
import { TilsynsordningSøknadsdata } from '@app/types';
import {
    DateDurationMap,
    dateToISODate,
    getDatesInDateRange,
    getDurationForISOWeekdayNumber,
    ISODateToDate,
} from '@navikt/sif-common-utils';
import dayjs from 'dayjs';

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
    fom,
    tom,
    tidFasteDager,
}: TilsynsordningPeriodeData): DateDurationMap => {
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
