import { Søknadsdata, LegeerklæringSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { LegeerklæringFormFields, LegeerklæringFormValues } from './LegeerklæringForm';

export const getLegeerklæringStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: LegeerklæringFormValues
): LegeerklæringFormValues => {
    if (formValues) {
        return formValues;
    }
    const {} = søknadsdata.legeerklæring || {};
    return {
        vedlegg: [...(søknadsdata.legeerklæring?.vedlegg || [])],
    };
};

export const getLegeerklæringSøknadsdataFromFormValues = (
    values: LegeerklæringFormValues
): LegeerklæringSøknadsdata => {
    return {
        vedlegg: values[LegeerklæringFormFields.vedlegg].filter(
            (vedlegg) => vedlegg.pending === false && vedlegg.uploaded === true
        ),
    };
};
