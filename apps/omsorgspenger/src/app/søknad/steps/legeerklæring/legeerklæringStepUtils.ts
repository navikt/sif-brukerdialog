import { Søknadsdata, LegeerklæringSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { LegeerklæringFormValues } from './LegeerklæringStep';

export const getLegeerklæringStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: LegeerklæringFormValues
): LegeerklæringFormValues => {
    if (formValues) {
        return formValues;
    }
    const { navn = '', alder } = søknadsdata.omBarnet || {};
    return {
        navn,
        alder: alder !== undefined ? `${alder}` : '',
    };
};

export const getLegeerklæringSøknadsdataFromFormValues = (
    values: LegeerklæringFormValues
): LegeerklæringSøknadsdata => {
    return { navn: values.navn, alder: parseInt(values.alder, 10) };
};
