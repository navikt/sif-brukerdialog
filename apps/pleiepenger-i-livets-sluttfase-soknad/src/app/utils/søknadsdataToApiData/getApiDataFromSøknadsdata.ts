import { attachmentIsUploadedAndIsValidFileFormat } from '@navikt/sif-common-core-ds/lib/utils/attachmentUtils';
import { Attachment } from '../../components/formik-file-uploader/useFormikFileUploader';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getAttachmentURLBackend } from '../attachmentUtilsAuthToken';
import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import { dateToISODate } from '@navikt/sif-common-utils/lib';
import { YesOrNoDontKnow } from '../../types/YesOrNoDontKnow';
import { FlereSokereApiData, SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { getArbeidsgivereApiDataFromSøknadsdata } from './getArbeidsgivereApiDataFromSøknadsdata';
import { getFrilansApiDataFromSøknadsdata } from './getFrilansApiDataFromSøknadsdata';
import { getSelvstendigApiDataFromSøknadsdata } from './getSelvstendigApiDataFromSøknadsdata';
import { getPleietrengendeApiDataFromSøknadsdata } from './getPleietrengendeApiDataFromSøknadsdata';
import { getFerieuttakIPeriodenApiDataFromSøknadsdata } from './getFerieuttakIPeriodenApiDataFromSøknadsdata';
import { getUtenlansoppholdApiDataFromSøknadsdata } from './getUtenlandsoppholdApiDataFromSøknadsdata';
import { getMedlemskapApiDataFromSøknadsdata } from './getMedlemskapApiDataFromSøknadsdata';
import { getOpptjeningUtlandApiDataFromSøknadsdata } from './getOpptjeningUtlandApiDataFromSøknadsdata';
import { getUtenlandskNæringApiDataFromSøknadsdata } from './getUtenlandskNæringApiDataFromSøknadsdata';
import { getDataBruktTilUtledning } from '../getDataBruktTilUtledning';

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

export const getApiDataFromSøknadsdata = (søknadsdata: Søknadsdata): SøknadApiData | undefined => {
    const { id, opplysningerOmPleietrengende, legeerklæring, tidsrom, arbeidssituasjon, arbeidstid, medlemskap } =
        søknadsdata;

    if (!id || !opplysningerOmPleietrengende || !legeerklæring || !tidsrom || !arbeidssituasjon || !medlemskap) {
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

    const søknadsperiode: DateRange = {
        from: periodeFra,
        to: periodeTil,
    };

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
        flereSokere: getFlereSokereApiData(tidsrom.flereSokere),
        fraOgMed: dateToISODate(periodeFra),
        tilOgMed: dateToISODate(periodeTil),
        ferieuttakIPerioden: getFerieuttakIPeriodenApiDataFromSøknadsdata(tidsrom),
        utenlandsoppholdIPerioden: getUtenlansoppholdApiDataFromSøknadsdata(språk, tidsrom),
        arbeidsgivere: getArbeidsgivereApiDataFromSøknadsdata(søknadsperiode, arbeidsgivere, arbeidstid?.arbeidsgivere),
        frilans: getFrilansApiDataFromSøknadsdata(søknadsperiode, frilans, arbeidstid?.frilans),
        selvstendigNæringsdrivende: getSelvstendigApiDataFromSøknadsdata(
            søknadsperiode,
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
