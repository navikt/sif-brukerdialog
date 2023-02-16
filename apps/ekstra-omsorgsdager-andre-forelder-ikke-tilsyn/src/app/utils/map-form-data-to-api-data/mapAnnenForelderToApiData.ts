import { SoknadFormData } from '../../types/SoknadFormData';
import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';

export type AnnenForelderToApiData = Pick<SøknadApiData, 'annenForelder'>;

export const mapAnnenForelderToApiData = (formData: SoknadFormData): AnnenForelderToApiData => {
    if (formData.annenForelderSituasjon === undefined) {
        throw new Error('Missing annenForelderSituasjon');
    }

    return {
        annenForelder: {
            navn: formData.annenForelderNavn,
            fnr: formData.annenForelderFnr,
            situasjon: formData.annenForelderSituasjon,
            situasjonBeskrivelse:
                formData.annenForelderSituasjonBeskrivelse && formData.annenForelderSituasjonBeskrivelse.length > 0
                    ? formData.annenForelderSituasjonBeskrivelse
                    : undefined,
            periodeFraOgMed:
                formData.annenForelderPeriodeFom && formData.annenForelderPeriodeFom.length > 0
                    ? formData.annenForelderPeriodeFom
                    : undefined,
            periodeTilOgMed:
                formData.annenForelderPeriodeTom && formData.annenForelderPeriodeTom.length > 0
                    ? formData.annenForelderPeriodeTom
                    : undefined,
            periodeOver6Måneder:
                formData.annenForelderPeriodeMer6Maneder === undefined ||
                formData.annenForelderPeriodeMer6Maneder === YesOrNo.UNANSWERED
                    ? undefined
                    : formData.annenForelderPeriodeMer6Maneder === YesOrNo.YES,
        },
    };
};
