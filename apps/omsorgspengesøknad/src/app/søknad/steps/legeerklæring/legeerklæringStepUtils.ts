/* eslint-disable no-console */
import { Søknadsdata, LegeerklæringSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { LegeerklæringFormValues } from './LegeerklæringStep';

export const getLegeerklæringStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: LegeerklæringFormValues
): LegeerklæringFormValues => {
    console.log(søknadsdata);

    if (formValues) {
        return formValues;
    }
    return {
        vedlegg: undefined,
    };
};

export const getLegeerklæringSøknadsdataFromFormValues = (
    values: LegeerklæringFormValues
): LegeerklæringSøknadsdata => {
    console.log(values);
    return {};
};
