import { TilsynsordningPeriodeData } from '@app/modules/tilsynsordning-måned/components/tilsynsordning-periode-form/TilsynsordningPeriodeForm';
import {
    DateDurationMap,
    dateToISODate,
    getDatesInDateRange,
    getDurationForISOWeekdayNumber,
    ISODateToDate,
} from '@navikt/sif-common-utils';
import dayjs from 'dayjs';

import { TilsynsordningForenkletSøknadsdata } from '../../../types/TilsynsordningForenkletSøknadsdata';
import { TilsynsordningForenkletFormValues } from './TilsynsordningForenkletForm';
import { TilsynsordningEndring } from './types';

export const getTilsynsordningStepInitialValues = (
    tilsynsordningSøknadsdata: TilsynsordningForenkletSøknadsdata | undefined,
    formValues?: TilsynsordningForenkletFormValues,
): TilsynsordningForenkletFormValues => {
    if (formValues) {
        return formValues;
    }
    if (tilsynsordningSøknadsdata === undefined) {
        return {
            endringer: [],
        };
    }
    return {
        endringer: tilsynsordningSøknadsdata.endringer,
    };
};

export const getTilsynsordningSøknadsdataFromFormValues = (
    values: TilsynsordningForenkletFormValues,
): TilsynsordningForenkletSøknadsdata => {
    return {
        endringer: values.endringer,
    };
};

export const oppdaterDagerMedOmsorgstilbudIPeriode = ({
    fom,
    tom,
    tidFasteDager,
}: TilsynsordningPeriodeData): TilsynsordningEndring[] => {
    const datoerIPeriode = getDatesInDateRange({ from: fom, to: tom }, true);
    const dagerSomSkalEndres: DateDurationMap = {};
    datoerIPeriode.forEach((dato) => {
        const isoDate = dateToISODate(dato);
        const varighet = getDurationForISOWeekdayNumber(tidFasteDager, dayjs(ISODateToDate(isoDate)).isoWeekday());
        if (varighet) {
            dagerSomSkalEndres[isoDate] = { ...varighet };
        }
    });
    return [];
};
