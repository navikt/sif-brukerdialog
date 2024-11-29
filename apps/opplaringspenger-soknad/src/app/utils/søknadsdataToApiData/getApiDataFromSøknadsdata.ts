import { dateToISODate } from '@navikt/sif-common-utils';
import { FlereSokereApiData, SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { KursSøknadsdata, Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { YesOrNoDontKnow } from '../../types/YesOrNoDontKnow';
import { getArbeidsgivereApiDataFromSøknadsdata } from './getArbeidsgivereApiDataFromSøknadsdata';
import { getFrilansApiDataFromSøknadsdata } from './getFrilansApiDataFromSøknadsdata';
import { getMedlemskapApiDataFromSøknadsdata } from './getMedlemskapApiDataFromSøknadsdata';
import { getOpptjeningUtlandApiDataFromSøknadsdata } from './getOpptjeningUtlandApiDataFromSøknadsdata';
import { getSelvstendigApiDataFromSøknadsdata } from './getSelvstendigApiDataFromSøknadsdata';
import { getUtenlandskNæringApiDataFromSøknadsdata } from './getUtenlandskNæringApiDataFromSøknadsdata';
import { getKursApiDataFromSøknadsdata } from './getKursApiDataFromSøknadsdata';
import { DataBruktTilUtledning } from '../../types/DataBruktTilUtledning';
import { getOmBarnetApiDataFromSøknadsdata } from './getOmBarnetApiDataFromSøknadsdata';
import { RegistrertBarn } from '@navikt/sif-common-api';
import { getVedleggApiData } from '@navikt/sif-common-core-ds/src';
import { getFerieuttakIPeriodenApiDataFromSøknadsdata } from './getFerieuttakIPeriodenApiDataFromSøknadsdata';

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
    return {
        arbeiderIKursperiode: kurs.arbeiderIKursperiode,
    };
};

export const getApiDataFromSøknadsdata = (
    søkerNorskIdent: string,
    søknadsdata: Søknadsdata,
    registrerteBarn: RegistrertBarn[],
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
        barn: getOmBarnetApiDataFromSøknadsdata(registrerteBarn, omBarnet),
        vedlegg: getVedleggApiData(legeerklæring.vedlegg),
        fraOgMed: dateToISODate(søknadsperiode.from),
        tilOgMed: dateToISODate(søknadsperiode.to),
        kurs: getKursApiDataFromSøknadsdata(kurs),
        ferieuttakIPerioden: getFerieuttakIPeriodenApiDataFromSøknadsdata(kurs.ferieuttakIPerioden),
        utenlandsoppholdIPerioden: { skalOppholdeSegIUtlandetIPerioden: false, opphold: [] },
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
        dataBruktTilUtledningAnnetData: søknadsdata.kurs
            ? JSON.stringify(getDataBruktTilUtledningApiData(søknadsdata.kurs))
            : '',
    };
};
