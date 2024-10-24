import { getAttachmentsApiData } from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { dateToISODate } from '@navikt/sif-common-utils';
import { FlereSokereApiData, SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { KursSøknadsdata, Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { YesOrNoDontKnow } from '../../types/YesOrNoDontKnow';
import { getArbeidsgivereApiDataFromSøknadsdata } from './getArbeidsgivereApiDataFromSøknadsdata';
import { getFrilansApiDataFromSøknadsdata } from './getFrilansApiDataFromSøknadsdata';
import { getMedlemskapApiDataFromSøknadsdata } from './getMedlemskapApiDataFromSøknadsdata';
import { getOmBarnetApiDataFromSøknadsdata } from './getOmBarnetApiDataFromSøknadsdata';
import { getOpptjeningUtlandApiDataFromSøknadsdata } from './getOpptjeningUtlandApiDataFromSøknadsdata';
import { getSelvstendigApiDataFromSøknadsdata } from './getSelvstendigApiDataFromSøknadsdata';
import { getUtenlandskNæringApiDataFromSøknadsdata } from './getUtenlandskNæringApiDataFromSøknadsdata';
import { getKursApiDataFromSøknadsdata } from './getKursApiDataFromSøknadsdata';
import { DataBruktTilUtledning } from '../../types/DataBruktTilUtledning';

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

export const getDataBruktTilUtledningApiData = (kurs: KursSøknadsdata): DataBruktTilUtledning => {
    const { søknadsdatoer } = kurs;
    return {
        kursdager: søknadsdatoer.map((dato) => dateToISODate(dato)),
    };
};

export const getApiDataFromSøknadsdata = (
    søkerNorskIdent: string,
    søknadsdata: Søknadsdata,
): SøknadApiData | undefined => {
    const { id, omBarnet, legeerklæring, kurs, arbeidssituasjon, medlemskap, arbeidstid } = søknadsdata;

    const { søknadsperiode } = kurs || {};

    if (!id || !omBarnet || !legeerklæring || !kurs || !arbeidssituasjon || !medlemskap || !søknadsperiode) {
        return undefined;
    }

    const { arbeidsgivere, frilans, selvstendig } = arbeidssituasjon;
    const valgteDatoer = kurs.søknadsdatoer;

    if (frilans === undefined || selvstendig === undefined) {
        return undefined;
    }

    const språk = 'nb';

    return {
        søkerNorskIdent,
        id,
        språk,
        harForståttRettigheterOgPlikter: søknadsdata.velkommen?.harForståttRettigheterOgPlikter === true,
        omBarnet: getOmBarnetApiDataFromSøknadsdata(omBarnet),
        vedleggUrls: getAttachmentsApiData(legeerklæring.vedlegg),
        søknadsperiode: {
            fraOgMed: dateToISODate(søknadsperiode.from),
            tilOgMed: dateToISODate(søknadsperiode.to),
        },
        kurs: getKursApiDataFromSøknadsdata(kurs),
        arbeidsgivere: getArbeidsgivereApiDataFromSøknadsdata(
            søknadsperiode,
            valgteDatoer,
            kurs.arbeiderIKursperiode,
            arbeidsgivere,
            arbeidstid?.arbeidsgivere,
        ),
        frilans: getFrilansApiDataFromSøknadsdata(frilans),
        selvstendigNæringsdrivende: getSelvstendigApiDataFromSøknadsdata(selvstendig),
        opptjeningIUtlandet: getOpptjeningUtlandApiDataFromSøknadsdata(språk, arbeidssituasjon.opptjeningUtland),
        utenlandskNæring: getUtenlandskNæringApiDataFromSøknadsdata(språk, arbeidssituasjon.utenlandskNæring),
        harVærtEllerErVernepliktig: arbeidssituasjon.vernepliktig
            ? arbeidssituasjon.vernepliktig.type === 'harVærtEllerErVernepliktigYes'
            : undefined,
        medlemskap: getMedlemskapApiDataFromSøknadsdata(språk, medlemskap),
        harBekreftetOpplysninger: søknadsdata.oppsummering?.harBekreftetOpplysninger === true,
        dataBruktTilUtledning: søknadsdata.kurs
            ? JSON.stringify(getDataBruktTilUtledningApiData(søknadsdata.kurs))
            : '',
    };
};
