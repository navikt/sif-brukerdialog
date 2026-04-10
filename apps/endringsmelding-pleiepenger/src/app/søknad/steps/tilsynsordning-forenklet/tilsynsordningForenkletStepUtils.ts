import { DateRange, dateRangeToISODateRange } from '@navikt/sif-common-utils';

import { TilsynsordningForenkletSøknadsdata } from '../../../types/TilsynsordningForenkletSøknadsdata';
import { TilsynsordningForenkletFormValues } from './TilsynsordningForenkletForm';
import { TilsynsordningPeriodeData } from './types';

export const getTilsynsordningStepInitialValues = (
    tilsynsordningSøknadsdata: TilsynsordningForenkletSøknadsdata | undefined,
    formValues?: TilsynsordningForenkletFormValues,
): TilsynsordningForenkletFormValues => {
    if (formValues) {
        return formValues;
    }
    if (tilsynsordningSøknadsdata === undefined) {
        return {
            endringer: {},
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

export const erTilsynsordningEndretIPeriode = (
    periode: DateRange,
    endringer?: TilsynsordningPeriodeData[],
): boolean => {
    if (!endringer) {
        return false;
    }
    return endringer.some((endring) => {
        return dateRangeToISODateRange(endring.periode) === dateRangeToISODateRange(periode);
    });
};
