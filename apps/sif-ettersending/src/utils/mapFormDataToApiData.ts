import { IntlShape } from 'react-intl';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { YtelseKey, Ytelser } from '@navikt/sif-common-core-ds/src/types/Ytelser';
import { getLocaleForApi } from '@navikt/sif-common-core-ds/src/utils/localeUtils';
import { BarnetLegeerklæringGjelderApiData, SoknadApiData, YtelseTypeApi } from '../types/SoknadApiData';
import { RegistrertBarnFormData, SoknadFormData } from '../types/SoknadFormData';
import { DokumentType } from '../types/DokumentType';
import { getAttachmentURLBackend } from '@navikt/sif-common';

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
    gjelderEtAnnetBarn?: boolean,
    barnetsFødselsnummer?: string,
    valgteRegistrertBarn?: RegistrertBarnFormData,
): BarnetLegeerklæringGjelderApiData | undefined => {
    if (gjelderEtAnnetBarn !== false && barnetsFødselsnummer) {
        return {
            norskIdentitetsnummer: barnetsFødselsnummer,
        };
    }
    if (valgteRegistrertBarn) {
        return {
            aktørId: valgteRegistrertBarn.aktørId,
            navn: valgteRegistrertBarn.barnetsNavn,
            fødselsdato: valgteRegistrertBarn.barnetsFødselsdato,
        };
    }

    return undefined;
};

export const mapFormDataToApiData = (
    søkerNorskIdent: string,
    soknadId: string,
    {
        harBekreftetOpplysninger,
        harForståttRettigheterOgPlikter,
        beskrivelse,
        dokumenter,
        ytelse,
        dokumentType,
        gjelderEtAnnetBarn,
        barnetsFødselsnummer,
        valgteRegistrertBarn,
    }: SoknadFormData,
    intl: IntlShape,
): SoknadApiData => {
    if (!ytelse) {
        throw new Error('ytelse mangler');
    }

    const ettersendelsesType =
        ytelse === YtelseKey.pleiepengerSyktBarn && dokumentType ? dokumentType : DokumentType.annet;

    const apiData: SoknadApiData = {
        søkerNorskIdent,
        id: soknadId,
        språk: getLocaleForApi(intl.locale),
        harBekreftetOpplysninger,
        harForståttRettigheterOgPlikter,
        søknadstype: getYtelseTypeApiKey(ytelse),
        ettersendelsesType,
        pleietrengende:
            ytelse === YtelseKey.pleiepengerSyktBarn
                ? mapBarnFormDataToApiData(gjelderEtAnnetBarn, barnetsFødselsnummer, valgteRegistrertBarn)
                : undefined,
        beskrivelse,
        vedlegg: getVedleggUrlFromAttachments(dokumenter),
        ytelseTittel: Ytelser[ytelse].søknadstittel.nb,
    };
    return apiData;
};
