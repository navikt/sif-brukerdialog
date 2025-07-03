import { getYesOrNoFromBoolean } from '@navikt/sif-common-core-ds/src/utils/yesOrNoUtils';
import { LegeerklæringSøknadsdata, Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { LegeerklæringFormFields, LegeerklæringFormValues } from './LegeerklæringForm';
import { getUploadedVedlegg, YesOrNo } from '@navikt/sif-common-core-ds/src';

export const getLegeerklæringStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: LegeerklæringFormValues,
): LegeerklæringFormValues => {
    if (formValues) {
        return formValues;
    }
    const skalEttersendeVedlegg = søknadsdata.legeerklæring?.skalEttersendeVedlegg;
    const vedleggSomSkalEttersendes =
        skalEttersendeVedlegg && søknadsdata.legeerklæring?.vedleggSomSkalEttersendes
            ? søknadsdata.legeerklæring?.vedleggSomSkalEttersendes
            : [];
    return {
        vedlegg: [...(søknadsdata.legeerklæring?.vedlegg || [])],
        skalEttersendeVedlegg: getYesOrNoFromBoolean(skalEttersendeVedlegg),
        vedleggSomSkalEttersendes,
    };
};

export const getLegeerklæringSøknadsdataFromFormValues = (
    values: LegeerklæringFormValues,
): LegeerklæringSøknadsdata => {
    return {
        vedlegg: getUploadedVedlegg(values[LegeerklæringFormFields.vedlegg] || []),
        skalEttersendeVedlegg: values[LegeerklæringFormFields.skalEttersendeVedlegg] === YesOrNo.YES,
        vedleggSomSkalEttersendes: values[LegeerklæringFormFields.vedleggSomSkalEttersendes] || [],
    };
};
