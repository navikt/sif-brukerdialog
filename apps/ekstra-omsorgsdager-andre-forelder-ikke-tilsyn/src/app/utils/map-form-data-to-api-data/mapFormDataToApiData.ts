import { RegistrertBarn } from '../../types/RegistrertBarn';
import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { SoknadFormData } from '../../types/SoknadFormData';
import { mapAnnenForelderToApiData } from './mapAnnenForelderToApiData';
import { mapBarnStepToApiData } from './mapBarnToApiData';

export const mapFormDataToApiData = (
    soknadId: string,
    locale = 'nb',
    formData: SoknadFormData,
    registrerteBarn: RegistrertBarn[]
): SøknadApiData | undefined => {
    try {
        const apiData: SøknadApiData = {
            id: soknadId,
            språk: locale === 'en' ? 'nn' : 'nb',
            harBekreftetOpplysninger: formData.harBekreftetOpplysninger,
            harForståttRettigheterOgPlikter: formData.harForståttRettigheterOgPlikter,
            ...mapAnnenForelderToApiData(formData),
            ...mapBarnStepToApiData(formData, registrerteBarn),
        };
        return apiData;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('mapFormDataToApiData failed', error);
        return undefined;
    }
};
