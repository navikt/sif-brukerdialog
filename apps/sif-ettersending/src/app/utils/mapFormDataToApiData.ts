import { RegistrertBarn } from '@navikt/sif-common-api';
import { getVedleggApiData } from '@navikt/sif-common-core-ds/src';
import { getLocaleForApi } from '@navikt/sif-common-core-ds/src/utils/localeUtils';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { dateToISODate } from '@navikt/sif-common-utils';
import { IntlShape } from 'react-intl';

import { DokumentType } from '../types/DokumentType';
import { BarnetLegeerklæringGjelderApiData, SoknadApiData, YtelseTypeApi } from '../types/SoknadApiData';
import { SoknadFormData } from '../types/SoknadFormData';
import { YtelseKey, Ytelser } from '../types/Ytelser';

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
        case YtelseKey.opplaringspenger:
            return YtelseTypeApi.OPPLÆRINGSPENGER;
    }
};

const mapBarnFormDataToApiData = (
    registrerteBarn: RegistrertBarn[],
    barnetsFødselsnummer?: string,
    registrertBarnAktørId?: string,
): BarnetLegeerklæringGjelderApiData | undefined => {
    const valgtRegistrertBarn = registrertBarnAktørId
        ? registrerteBarn.find((b) => b.aktørId === registrertBarnAktørId)
        : undefined;
    if (valgtRegistrertBarn) {
        return {
            aktørId: valgtRegistrertBarn.aktørId,
            navn: formatName(
                valgtRegistrertBarn.fornavn,
                valgtRegistrertBarn.etternavn,
                valgtRegistrertBarn.mellomnavn,
            ),
            fødselsdato: dateToISODate(valgtRegistrertBarn.fødselsdato),
        };
    }
    if (barnetsFødselsnummer) {
        return {
            norskIdentitetsnummer: barnetsFødselsnummer,
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
        barnetsFødselsnummer,
        registrertBarnAktørId,
    }: SoknadFormData,
    registrerteBarn: RegistrertBarn[],
    intl: IntlShape,
): SoknadApiData => {
    if (!ytelse) {
        throw new Error('ytelse mangler');
    }

    const gjelderPsbEllerOpplæringspenger = [YtelseKey.pleiepengerSyktBarn, YtelseKey.opplaringspenger].includes(
        ytelse,
    );
    const ettersendelsesType = gjelderPsbEllerOpplæringspenger && dokumentType ? dokumentType : DokumentType.annet;

    const apiData: SoknadApiData = {
        søkerNorskIdent,
        id: soknadId,
        språk: getLocaleForApi(intl.locale),
        harBekreftetOpplysninger,
        harForståttRettigheterOgPlikter,
        søknadstype: getYtelseTypeApiKey(ytelse),
        ettersendelsesType,
        pleietrengende: gjelderPsbEllerOpplæringspenger
            ? mapBarnFormDataToApiData(registrerteBarn, barnetsFødselsnummer, registrertBarnAktørId)
            : undefined,
        beskrivelse,
        vedlegg: getVedleggApiData(dokumenter),
        ytelseTittel: Ytelser[ytelse].søknadstittel.nb,
    };
    return apiData;
};
