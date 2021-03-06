import { SoknadApiData } from '../../types/SoknadApiData';
import { Barn, SoknadFormData } from '../../types/SoknadFormData';
import { mapAnnenForelderToApiData } from './mapAnnenForelderToApiData';
import { mapBarnStepToApiData } from './mapBarnToApiData';

export const mapFormDataToApiData = (
    soknadId: string,
    locale = 'nb',
    formData: SoknadFormData,
    registrerteBarn: Barn[]
): SoknadApiData | undefined => {
    try {
        const apiData: SoknadApiData = {
            id: soknadId,
            spr√•k: locale === 'en' ? 'nn' : 'nb',
            harBekreftetOpplysninger: formData.harBekreftetOpplysninger,
            harForst√•ttRettigheterOgPlikter: formData.harForst√•ttRettigheterOgPlikter,
            ...mapAnnenForelderToApiData(formData),
            ...mapBarnStepToApiData(formData, registrerteBarn),
        };
        return apiData;
    } catch (error) {
        console.error('mapFormDataToApiData failed', error);
        return undefined;
    }
};
