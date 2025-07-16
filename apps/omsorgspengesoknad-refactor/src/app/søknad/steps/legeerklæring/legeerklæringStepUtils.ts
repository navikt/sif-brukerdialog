import { getUploadedVedlegg } from '@navikt/sif-common-core-ds/src';
import { LegeerklæringSøknadsdata, Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { LegeerklæringFormFields, LegeerklæringFormValues } from './LegeerklæringForm';

export const getLegeerklæringStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: LegeerklæringFormValues,
): LegeerklæringFormValues => {
    if (formValues) {
        return formValues;
    }
    return {
        vedlegg: [...(søknadsdata.legeerklaering?.vedlegg || [])],
    };
};

export const getLegeerklæringSøknadsdataFromFormValues = (
    values: LegeerklæringFormValues,
): LegeerklæringSøknadsdata => {
    return {
        vedlegg: getUploadedVedlegg(values[LegeerklæringFormFields.vedlegg] || []),
    };
};
