import {
    DateDurationMap,
    dateToISODate,
    getDatesInDateRange,
    getDurationForISOWeekdayNumber,
    ISODateToDate,
} from '@navikt/sif-common-utils';
import { OmsorgstilbudSøknadsdata } from '@types';
import dayjs from 'dayjs';

import { OmsorgstilbudPeriodeData } from '../../../local-sif-common-pleiepenger/components/omsorgstilbud-måned/components/omsorgstilbud-periode-form/OmsorgstilbudPeriodeForm';
import { OmsorgstilbudFormValues } from './OmsorgstilbudForm';

export const getOmsorgstilbudStepInitialValues = (
    omsorgstilbudSøknadsdata: OmsorgstilbudSøknadsdata | undefined,
    formValues?: OmsorgstilbudFormValues,
): OmsorgstilbudFormValues => {
    if (formValues) {
        return formValues;
    }
    if (omsorgstilbudSøknadsdata === undefined) {
        return {
            omsorgsdager: {},
        };
    }
    return {
        omsorgsdager: omsorgstilbudSøknadsdata.enkeltdager,
    };
};

export const getOmsorgstilbudSøknadsdataFromFormValues = (
    values: OmsorgstilbudFormValues,
): OmsorgstilbudSøknadsdata => {
    return {
        enkeltdager: values.omsorgsdager,
    };
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
