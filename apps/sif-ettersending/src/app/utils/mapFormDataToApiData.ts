import { IntlShape } from 'react-intl';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { YtelseKey, Ytelser } from '@navikt/sif-common-core-ds/src/types/Ytelser';
import { getLocaleForApi } from '@navikt/sif-common-core-ds/src/utils/localeUtils';
import { BarnetLegeerklæringGjelderApiData, SoknadApiData, YtelseTypeApi } from '../types/SoknadApiData';
import { SoknadFormData } from '../types/SoknadFormData';
import { getAttachmentURLBackend } from './attachmentUtilsAuthToken';
import { DokumentType } from '../types/DokumentType';

const getYtelseTypeApiKey = (ytelse: YtelseKey): YtelseTypeApi => {
    switch (ytelse) {
        case YtelseKey.pleiepengerSyktBarn:
            return YtelseTypeApi.PLEIEPENGER_SYKT_BARN;
        case YtelseKey.pleiepengerLivetsSlutt:
            return YtelseTypeApi.PLEIEPENGER_LIVETS_SLUTTFASE;
        case YtelseKey.omsorgsdagerKroniskSyk:
            return YtelseTypeApi.OMP_UTV_KS;
        case YtelseKey.omsorgspengerutbetalingSNFri:
            return YtelseTypeApi.OMP_UT_SNF;
        case YtelseKey.omsorgspengerutbetalingArbeidstaker:
            return YtelseTypeApi.OMP_UT_ARBEIDSTAKER;
        case YtelseKey.omsorgsdagerAnnenForelderIkkeTilsyn:
            return YtelseTypeApi.OMP_UTV_MA;
    }
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

const mapBarnFormDataToApiData = (
    barnetHarIkkeFnr?: boolean,
    legeerklæringGjelderEtAnnetBarn?: boolean,
    barnetsFødselsnummer?: string,
    registrertBarnAktørId?: string,
): BarnetLegeerklæringGjelderApiData | undefined => {
    if (barnetHarIkkeFnr) {
        return undefined;
    }
    if (legeerklæringGjelderEtAnnetBarn && barnetsFødselsnummer) {
        return {
            fødselsnummer: barnetsFødselsnummer,
        };
    }
    if (registrertBarnAktørId) {
        return { aktørId: registrertBarnAktørId };
    }

    return undefined;
};

export const mapFormDataToApiData = (
    soknadId: string,
    {
        harBekreftetOpplysninger,
        harForståttRettigheterOgPlikter,
        beskrivelse,
        dokumenter,
        ytelse,
        dokumentType,
        barnetHarIkkeFnr,
        legeerklæringGjelderEtAnnetBarn,
        barnetsFødselsnummer,
        registrertBarnAktørId,
    }: SoknadFormData,
    intl: IntlShape,
): SoknadApiData => {
    if (!ytelse) {
        throw new Error('ytelse mangler');
    }

    const isLegeerklæring = ytelse === YtelseKey.pleiepengerSyktBarn && dokumentType === DokumentType.legeerklæring;

    const apiData: SoknadApiData = {
        id: soknadId,
        språk: getLocaleForApi(intl.locale),
        harBekreftetOpplysninger,
        harForståttRettigheterOgPlikter,
        søknadstype: getYtelseTypeApiKey(ytelse),
        isLegeerklæring,
        barn: isLegeerklæring
            ? mapBarnFormDataToApiData(
                  barnetHarIkkeFnr,
                  legeerklæringGjelderEtAnnetBarn,
                  barnetsFødselsnummer,
                  registrertBarnAktørId,
              )
            : undefined,
        beskrivelse,
        vedlegg: getVedleggUrlFromAttachments(dokumenter),
        ytelseTittel: Ytelser[ytelse].søknadstittel.nb,
    };
    return apiData;
};
