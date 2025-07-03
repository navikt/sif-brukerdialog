import { RegistrertBarn } from '@navikt/sif-common-api';
import { getVedleggApiData, Locale } from '@navikt/sif-common-core-ds/src';
import { dateToISODate } from '@navikt/sif-common-utils';
import { Institusjoner } from '../../api/institusjonService';
import { DataBruktTilUtledning } from '../../types/DataBruktTilUtledning';
import { FlereSokereApiData, SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { KursSøknadsdata, Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { YesOrNoDontKnow } from '../../types/YesOrNoDontKnow';
import { getArbeidsgivereApiDataFromSøknadsdata } from './getArbeidsgivereApiDataFromSøknadsdata';
import { getFerieuttakIPeriodenApiDataFromSøknadsdata } from './getFerieuttakIPeriodenApiDataFromSøknadsdata';
import { getFrilansApiDataFromSøknadsdata } from './getFrilansApiDataFromSøknadsdata';
import { getKursApiDataFromSøknadsdata } from './getKursApiDataFromSøknadsdata';
import { getMedlemskapApiDataFromSøknadsdata } from './getMedlemskapApiDataFromSøknadsdata';
import { getOmBarnetApiDataFromSøknadsdata } from './getOmBarnetApiDataFromSøknadsdata';
import { getOpptjeningUtlandApiDataFromSøknadsdata } from './getOpptjeningUtlandApiDataFromSøknadsdata';
import { getSelvstendigApiDataFromSøknadsdata } from './getSelvstendigApiDataFromSøknadsdata';
import { getUtenlandskNæringApiDataFromSøknadsdata } from './getUtenlandskNæringApiDataFromSøknadsdata';
import { getUtenlansoppholdApiDataFromSøknadsdata } from './getUtenlandsoppholdIPeriodenApiData';

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

export const getDataBruktTilUtledningApiData = (_kurs: KursSøknadsdata): DataBruktTilUtledning => {
    return {};
};

export const getApiDataFromSøknadsdata = (
    søkerNorskIdent: string,
    søknadsdata: Søknadsdata,
    registrerteBarn: RegistrertBarn[],
    institusjoner: Institusjoner,
    locale: Locale,
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

    const språk = locale;

    return {
        søkerNorskIdent,
        id,
        språk,
        harForståttRettigheterOgPlikter: søknadsdata.velkommen?.harForståttRettigheterOgPlikter === true,
        barn: getOmBarnetApiDataFromSøknadsdata(registrerteBarn, omBarnet),
        vedlegg: getVedleggApiData(legeerklæring.vedlegg),
        skalEttersendeVedlegg: legeerklæring.skalEttersendeVedlegg,
        vedleggSomSkalEttersendes: legeerklæring.skalEttersendeVedlegg
            ? legeerklæring.vedleggSomSkalEttersendes?.sort().reverse() // Hack for å ANNET sist :)
            : undefined,
        fraOgMed: dateToISODate(søknadsperiode.from),
        tilOgMed: dateToISODate(søknadsperiode.to),
        kurs: getKursApiDataFromSøknadsdata(kurs, institusjoner),
        ferieuttakIPerioden: getFerieuttakIPeriodenApiDataFromSøknadsdata(kurs.ferieuttakIPerioden),
        utenlandsoppholdIPerioden: getUtenlansoppholdApiDataFromSøknadsdata(språk, kurs.utenlandsopphold),
        arbeidsgivere: getArbeidsgivereApiDataFromSøknadsdata(
            søknadsperiode,
            valgteDatoer,
            arbeidsgivere,
            arbeidstid?.arbeidsgivere,
        ),
        frilans: getFrilansApiDataFromSøknadsdata({
            søknadsperiode,
            dagerMedOpplæring: valgteDatoer,
            frilans,
            arbeidIPeriode: arbeidstid?.frilans,
        }),
        selvstendigNæringsdrivende: getSelvstendigApiDataFromSøknadsdata({
            søknadsperiode,
            dagerMedOpplæring: valgteDatoer,
            selvstendig,
            arbeidIperiode: arbeidstid?.selvstendig,
        }),
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
