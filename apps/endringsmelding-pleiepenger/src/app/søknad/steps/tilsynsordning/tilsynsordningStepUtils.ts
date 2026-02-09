import {
    DateDurationMap,
    dateToISODate,
    getDatesInDateRange,
    getDurationForISOWeekdayNumber,
    ISODateToDate,
} from '@navikt/sif-common-utils';
import { TilsynsordningSøknadsdata } from '@types';
import dayjs from 'dayjs';

import { TilsynsordningPeriodeData } from '../../../local-sif-common-pleiepenger/components/tilsynsordning-måned/components/tilsynsordning-periode-form/TilsynsordningPeriodeForm';
import { OmsorgstilbudFormValues } from './TilsynsordningForm';

export const getTilsynsordningStepInitialValues = (
    tilsynsordningSøknadsdata: TilsynsordningSøknadsdata | undefined,
    formValues?: OmsorgstilbudFormValues,
): OmsorgstilbudFormValues => {
    if (formValues) {
        return formValues;
    }
    if (tilsynsordningSøknadsdata === undefined) {
        return {
            tilsynsdager: {},
        };
    }
    return {
        tilsynsdager: tilsynsordningSøknadsdata.enkeltdager,
    };
};

export const getTilsynsordningSøknadsdataFromFormValues = (
    values: OmsorgstilbudFormValues,
): TilsynsordningSøknadsdata => {
    return {
        enkeltdager: values.tilsynsdager,
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
