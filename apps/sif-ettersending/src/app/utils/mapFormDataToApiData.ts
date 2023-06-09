import { IntlShape } from 'react-intl';
import { Attachment } from '@navikt/sif-common-core-ds/lib/types/Attachment';
import { getCommitShaFromEnv } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import { getLocaleForApi } from '@navikt/sif-common-core-ds/lib/utils/localeUtils';
import { ApplicationType } from '../types/ApplicationType';
import { SoknadApiData, YtelseTypeApi } from '../types/SoknadApiData';
import { SoknadFormData } from '../types/SoknadFormData';
import { getAttachmentURLBackend } from './attachmentUtilsAuthToken';

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

const getVedleggUrlFromAttachments = (attachments: Attachment[]): string[] => {
    const vedleggUrl: string[] = [];
    attachments.forEach((s) => {
        if (s.url) {
            vedleggUrl.push(getAttachmentURLBackend(s.url));
        }
    });
    return vedleggUrl;
};

export const mapFormDataToApiData = (
    soknadId: string,
    { harBekreftetOpplysninger, harForståttRettigheterOgPlikter, beskrivelse, dokumenter, søknadstype }: SoknadFormData,
    søknadstypeFraURL: ApplicationType,
    intl: IntlShape
): SoknadApiData => {
    const apiData: SoknadApiData = {
        id: soknadId,
        språk: getLocaleForApi(intl.locale),
        harBekreftetOpplysninger,
        harForståttRettigheterOgPlikter,
        søknadstype: søknadstype ? getSøknadstypeApi(søknadstype) : getSøknadstypeApi(søknadstypeFraURL),
        beskrivelse,
        vedlegg: getVedleggUrlFromAttachments(dokumenter),
        dataBruktTilUtledning: {
            soknadDialogCommitSha: getCommitShaFromEnv() || '',
        },
    };
    return apiData;
};
