import { Locale } from '@navikt/sif-common-core/lib/types/Locale';
import { attachmentUploadHasFailed } from '@navikt/sif-common-core/lib/utils/attachmentUtils';
import { getLocaleForApi } from '@navikt/sif-common-core/lib/utils/localeUtils';
import { ApplicationApiData, YtelseTypeApi } from '../types/ApplicationApiData';
import { ApplicationFormData } from '../types/ApplicationFormData';
import { ApplicationType } from '../types/ApplicationType';

const getSøknadstypeApi = (søknadstype: ApplicationType): YtelseTypeApi => {
    switch (søknadstype) {
        case ApplicationType.pleiepengerBarn:
            return YtelseTypeApi.PLEIEPENGER_SYKT_BARN;
        case ApplicationType.pleiepengerLivetsSluttfase:
            return YtelseTypeApi.PLEIEPENGER_LIVETS_SLUTTFASE;
        case ApplicationType.ekstraomsorgsdager:
            return YtelseTypeApi.OMP_UTV_KS;
        case ApplicationType.utbetaling:
            return YtelseTypeApi.OMP_UT_SNF;
        case ApplicationType.utbetalingarbeidstaker:
            return YtelseTypeApi.OMP_UT_ARBEIDSTAKER;
        case ApplicationType.regnetsomalene:
            return YtelseTypeApi.OMP_UTV_MA;
        case ApplicationType.deling:
            return YtelseTypeApi.OMP_DELE_DAGER;
    }
    return YtelseTypeApi.ukjent;
};

export const mapFormDataToApiData = (
    {
        harBekreftetOpplysninger,
        harForståttRettigheterOgPlikter,
        beskrivelse,
        dokumenter,
        søknadstype,
    }: ApplicationFormData,
    søknadstypeFraURL: ApplicationType,
    locale: Locale
): ApplicationApiData => {
    const apiData: ApplicationApiData = {
        språk: getLocaleForApi(locale),
        harBekreftetOpplysninger,
        harForståttRettigheterOgPlikter,
        søknadstype: søknadstype ? getSøknadstypeApi(søknadstype) : getSøknadstypeApi(søknadstypeFraURL),
        beskrivelse,
        vedlegg: dokumenter.filter((attachment) => !attachmentUploadHasFailed(attachment)).map(({ url }) => url!),
    };
    return apiData;
};
