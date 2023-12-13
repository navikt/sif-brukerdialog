import { Attachment } from '@navikt/sif-common-core-ds/src/types';
import { attachmentIsUploadedAndIsValidFileFormat } from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { dateToISODate } from '@navikt/sif-common-utils/lib';
import { FlereSokereApiData, SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { YesOrNoDontKnow } from '../../types/YesOrNoDontKnow';
import { getAttachmentURLBackend } from '../attachmentUtilsAuthToken';
import { getDataBruktTilUtledning } from '../getDataBruktTilUtledning';
import { getArbeidsgivereApiDataFromSøknadsdata } from './getArbeidsgivereApiDataFromSøknadsdata';
import { getFrilansApiDataFromSøknadsdata } from './getFrilansApiDataFromSøknadsdata';
import { getMedlemskapApiDataFromSøknadsdata } from './getMedlemskapApiDataFromSøknadsdata';
import { getOpptjeningUtlandApiDataFromSøknadsdata } from './getOpptjeningUtlandApiDataFromSøknadsdata';
import { getPleietrengendeApiDataFromSøknadsdata } from './getPleietrengendeApiDataFromSøknadsdata';
import { getSelvstendigApiDataFromSøknadsdata } from './getSelvstendigApiDataFromSøknadsdata';
import { getUtenlandskNæringApiDataFromSøknadsdata } from './getUtenlandskNæringApiDataFromSøknadsdata';
import { getUtenlansoppholdApiDataFromSøknadsdata } from './getUtenlandsoppholdApiDataFromSøknadsdata';

const getVedleggApiData = (vedlegg?: Attachment[]): string[] => {
    if (!vedlegg || vedlegg.length === 0) {
        return [];
    }
    return vedlegg.filter(attachmentIsUploadedAndIsValidFileFormat).map(({ url }) => getAttachmentURLBackend(url));
};

export const getFlereSokereApiData = (flereSokereSvar: YesOrNoDontKnow): FlereSokereApiData => {
    switch (flereSokereSvar) {
        case YesOrNoDontKnow.YES:
            return FlereSokereApiData.JA;
        case YesOrNoDontKnow.NO:
            return FlereSokereApiData.NEI;
        default:
            return FlereSokereApiData.USIKKER;
    }
};

export const getDagerMedPleieApiData = (søknadsdata: Søknadsdata): string[] => {
    return (søknadsdata.tidsrom?.dagerMedPleie || []).map(dateToISODate);
};

export const getApiDataFromSøknadsdata = (søknadsdata: Søknadsdata): SøknadApiData | undefined => {
    const { id, opplysningerOmPleietrengende, legeerklæring, tidsrom, arbeidssituasjon, arbeidstid, medlemskap } =
        søknadsdata;

    const { søknadsperiode, dagerMedPleie } = tidsrom || {};

    if (
        !id ||
        !opplysningerOmPleietrengende ||
        !legeerklæring ||
        !tidsrom ||
        !arbeidssituasjon ||
        !medlemskap ||
        !søknadsperiode ||
        !dagerMedPleie ||
        dagerMedPleie.length === 0
    ) {
        return undefined;
    }

    const periodeFra = tidsrom.søknadsperiode.from;
    const periodeTil = tidsrom.søknadsperiode.to;

    const { arbeidsgivere, frilans, selvstendig } = arbeidssituasjon;

    if (frilans === undefined || selvstendig === undefined) {
        return undefined;
    }

    if (!periodeFra || !periodeTil) {
        return undefined;
    }

    const språk = 'nb';

    return {
        id,
        språk,
        harForståttRettigheterOgPlikter: søknadsdata.velkommen?.harForståttRettigheterOgPlikter === true,
        pleietrengende: getPleietrengendeApiDataFromSøknadsdata(opplysningerOmPleietrengende),
        opplastetIdVedleggUrls:
            opplysningerOmPleietrengende.type === 'pleietrengendeUtenFnr'
                ? getVedleggApiData(opplysningerOmPleietrengende.pleietrengendeId)
                : [],
        vedleggUrls: getVedleggApiData(legeerklæring.vedlegg),
        pleierDuDenSykeHjemme: true,
        dagerMedPleie: getDagerMedPleieApiData(søknadsdata),
        flereSokere: getFlereSokereApiData(opplysningerOmPleietrengende.flereSokere),
        fraOgMed: dateToISODate(periodeFra),
        tilOgMed: dateToISODate(periodeTil),
        skalJobbeOgPleieSammeDag: tidsrom.skalJobbeOgPleieSammeDag,
        utenlandsoppholdIPerioden: getUtenlansoppholdApiDataFromSøknadsdata(språk, tidsrom),
        arbeidsgivere: getArbeidsgivereApiDataFromSøknadsdata(
            søknadsperiode,
            dagerMedPleie,
            tidsrom.skalJobbeOgPleieSammeDag,
            arbeidsgivere,
            arbeidstid?.arbeidsgivere,
        ),
        frilans: getFrilansApiDataFromSøknadsdata(
            søknadsperiode,
            dagerMedPleie,
            tidsrom.skalJobbeOgPleieSammeDag,
            frilans,
            arbeidstid?.frilans,
        ),
        selvstendigNæringsdrivende: getSelvstendigApiDataFromSøknadsdata(
            søknadsperiode,
            dagerMedPleie,
            tidsrom.skalJobbeOgPleieSammeDag,
            selvstendig,
            arbeidstid?.selvstendig,
        ),
        opptjeningIUtlandet: getOpptjeningUtlandApiDataFromSøknadsdata(språk, arbeidssituasjon.opptjeningUtland),
        utenlandskNæring: getUtenlandskNæringApiDataFromSøknadsdata(språk, arbeidssituasjon.utenlandskNæring),
        harVærtEllerErVernepliktig: arbeidssituasjon.vernepliktig
            ? arbeidssituasjon.vernepliktig.type === 'harVærtEllerErVernepliktigYes'
            : undefined,
        medlemskap: getMedlemskapApiDataFromSøknadsdata(språk, medlemskap),
        harBekreftetOpplysninger: søknadsdata.oppsummering?.harBekreftetOpplysninger === true,
        dataBruktTilUtledning: JSON.stringify(getDataBruktTilUtledning(søknadsdata)),
    };
};
