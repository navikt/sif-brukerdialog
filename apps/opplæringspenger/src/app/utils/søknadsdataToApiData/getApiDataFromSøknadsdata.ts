import { Attachment } from '@navikt/sif-common-core-ds/src/types';
import { attachmentIsUploadedAndIsValidFileFormat } from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { dateToISODate } from '@navikt/sif-common-utils';
import { FlereSokereApiData, SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { YesOrNoDontKnow } from '../../types/YesOrNoDontKnow';
import { getAttachmentURLBackend } from '../attachmentUtils';
import { getDataBruktTilUtledning } from '../getDataBruktTilUtledning';
import { getArbeidsgivereApiDataFromSøknadsdata } from './getArbeidsgivereApiDataFromSøknadsdata';
import { getFrilansApiDataFromSøknadsdata } from './getFrilansApiDataFromSøknadsdata';
import { getMedlemskapApiDataFromSøknadsdata } from './getMedlemskapApiDataFromSøknadsdata';
import { getOpptjeningUtlandApiDataFromSøknadsdata } from './getOpptjeningUtlandApiDataFromSøknadsdata';
import { getSelvstendigApiDataFromSøknadsdata } from './getSelvstendigApiDataFromSøknadsdata';
import { getUtenlandskNæringApiDataFromSøknadsdata } from './getUtenlandskNæringApiDataFromSøknadsdata';
import { getUtenlansoppholdApiDataFromSøknadsdata } from './getUtenlandsoppholdApiDataFromSøknadsdata';
import { getOmBarnetApiDataFromSøknadsdata } from './getOmBarnetApiDataFromSøknadsdata';

const getVedleggApiData = (vedlegg?: Attachment[]): string[] => {
    if (!vedlegg || vedlegg.length === 0) {
        return [];
    }
    return vedlegg
        .filter(attachmentIsUploadedAndIsValidFileFormat)
        .map(({ url }) => (url ? getAttachmentURLBackend(url) : ''));
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

export const getApiDataFromSøknadsdata = (
    søkerNorskIdent: string,
    søknadsdata: Søknadsdata,
): SøknadApiData | undefined => {
    const { id, omBarnet, legeerklæring, tidsrom, arbeidssituasjon, arbeidstid, medlemskap } = søknadsdata;

    const { søknadsperiode, dagerMedPleie } = tidsrom || {};

    if (
        !id ||
        !omBarnet ||
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
        søkerNorskIdent,
        id,
        språk,
        harForståttRettigheterOgPlikter: søknadsdata.velkommen?.harForståttRettigheterOgPlikter === true,
        omBarnet: getOmBarnetApiDataFromSøknadsdata(omBarnet),
        vedleggUrls: getVedleggApiData(legeerklæring.vedlegg),
        dagerMedPleie: getDagerMedPleieApiData(søknadsdata),
        fraOgMed: dateToISODate(periodeFra),
        tilOgMed: dateToISODate(periodeTil),
        utenlandsoppholdIPerioden: getUtenlansoppholdApiDataFromSøknadsdata(språk, tidsrom),
        arbeidsgivere: getArbeidsgivereApiDataFromSøknadsdata(
            søknadsperiode,
            dagerMedPleie,
            arbeidsgivere,
            arbeidstid?.arbeidsgivere,
        ),
        frilans: getFrilansApiDataFromSøknadsdata(søknadsperiode, dagerMedPleie, frilans, arbeidstid?.frilans),
        selvstendigNæringsdrivende: getSelvstendigApiDataFromSøknadsdata(
            søknadsperiode,
            dagerMedPleie,
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
