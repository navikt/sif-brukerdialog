import { RegistrertBarn } from '@navikt/sif-common-api';
import { getVedleggApiData } from '@navikt/sif-common-core-ds/src';
import { Locale } from '@navikt/sif-common-core-ds/src/types/Locale';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { getMedlemskapApiDataFromSøknadsdata } from '@navikt/sif-common-forms-ds/src';
import { dateToISODate } from '@navikt/sif-common-utils';
import { appLogger } from '@sif/apm';

import { ÅrsakManglerIdentitetsnummer } from '../../types';
import {
    DataBruktTilUtledningAnnetData,
    SøknadApiData,
    SøknadApiDataVersjon,
} from '../../types/søknad-api-data/SøknadApiData';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getValidSpråk } from '../sprakUtils';
import { getArbeidsgivereApiDataFromSøknadsdata } from './getArbeidsgivereApiDataFromSøknadsdata';
import { getBarnApiDataFromSøknadsdata } from './getBarnApiDataFromSøknadsdata';
import { getBeredskapApiDataFromSøknadsdata } from './getBeredskapApiDataFromSøknadsdata';
import { getFerieuttakIPeriodenApiDataFromSøknadsdata } from './getFerieuttakIPeriodenApiDataFromSøknadsdata';
import { getFosterhjemsgodtgjørelseApiDataFromSøknadsdata } from './getFosterhjemsgodtgjørelseApiDataFromSøknadsdata';
import { getFrilansApiDataFromSøknadsdata } from './getFrilansApiDataFromSøknadsdata';
import { getNattevåkApiDataFromSøknadsdata } from './getNattevåkApiDataFromSøknadsdata';
import { getOmsorgsstønadApiDataFromSøknadsdata } from './getOmsorgsstønadApiDataFromSøknadsdata';
import { getOmsorgstilbudApiDataFromSøknadsdata } from './getOmsorgstibudApiDataFromSøknadsdata';
import { getOpptjeningIUtlandetSøknadsdata } from './getOpptjeningIUtlandetSøknadsdata';
import { getSelvstendigApiDataFromSøknadsdata } from './getSelvstendigApiDataFromSøknadsdata';
import { getUtenlandskNæringSøknadsdata } from './getUtenlandskNæringSøknadsdata';
import { getUtenlandsoppholdIPeriodenApiDataFromSøknadsdata } from './getUtenlandsoppholdIPeriodenFromSøknadsdata';

export const getFødselsattesterSomSendesInn = (barn: Søknadsdata['barn']): Vedlegg[] =>
    barn?.type === 'annetBarnUtenFnr' &&
    barn.årsakManglerIdentitetsnummer === ÅrsakManglerIdentitetsnummer.BARNET_BOR_I_UTLANDET
        ? (barn.fødselsattest ?? [])
        : [];

export const getApiDataFromSøknadsdata = (
    søkerNorskIdent: string,
    barn: RegistrertBarn[],
    søknadsdata: Søknadsdata,
    harBekreftetOpplysninger: boolean,
    dataBruktTilUtledningAnnetData: DataBruktTilUtledningAnnetData,
    locale: Locale,
): SøknadApiData | undefined => {
    const { søknadsperiode, harForståttRettigheterOgPlikter } = søknadsdata;

    if (søknadsperiode) {
        try {
            const sprak = getValidSpråk(locale);
            const apiData: SøknadApiData = {
                søkerNorskIdent,
                språk: sprak,
                apiDataVersjon: SøknadApiDataVersjon,
                harForståttRettigheterOgPlikter:
                    harForståttRettigheterOgPlikter !== undefined ? harForståttRettigheterOgPlikter : false,
                harBekreftetOpplysninger: harBekreftetOpplysninger !== undefined ? harBekreftetOpplysninger : false,
                ...getBarnApiDataFromSøknadsdata(barn, søknadsdata.barn),
                fødselsattestVedleggUrls: getVedleggApiData(getFødselsattesterSomSendesInn(søknadsdata.barn)),
                fraOgMed: dateToISODate(søknadsperiode.from),
                tilOgMed: dateToISODate(søknadsperiode.to),
                ...getUtenlandsoppholdIPeriodenApiDataFromSøknadsdata(sprak, søknadsdata.utenlandsoppholdIPerioden),
                ferieuttakIPerioden: getFerieuttakIPeriodenApiDataFromSøknadsdata(søknadsdata.ferieuttakIPerioden),
                arbeidsgivere: getArbeidsgivereApiDataFromSøknadsdata(
                    søknadsdata.arbeidssituasjon?.arbeidsgivere,
                    søknadsdata.arbeidstidIPerioden,
                ),
                frilans: getFrilansApiDataFromSøknadsdata({
                    arbeidssituasjon: søknadsdata?.arbeidssituasjon?.frilans,
                    arbeidstid: søknadsdata.arbeidstidIPerioden?.frilans,
                }),
                selvstendigNæringsdrivende: getSelvstendigApiDataFromSøknadsdata(
                    søknadsdata.arbeidssituasjon?.selvstendig,
                    søknadsdata.arbeidstidIPerioden?.selvstendig,
                    locale,
                ),
                ...getOmsorgsstønadApiDataFromSøknadsdata(søknadsdata.omsorgsstønad),
                ...getFosterhjemsgodtgjørelseApiDataFromSøknadsdata(søknadsdata.fosterhjemsgodtgjørelse),
                opptjeningIUtlandet: getOpptjeningIUtlandetSøknadsdata(
                    sprak,
                    søknadsdata.arbeidssituasjon?.opptjeningUtland,
                ),
                utenlandskNæring: getUtenlandskNæringSøknadsdata(sprak, søknadsdata.arbeidssituasjon?.utenlandskNæring),
                harVærtEllerErVernepliktig: søknadsdata.harVærtEllerErVernepliktig,
                ...getOmsorgstilbudApiDataFromSøknadsdata(søknadsperiode, søknadsdata.omsorgstibud),
                ...getNattevåkApiDataFromSøknadsdata(søknadsdata.nattevåk),
                ...getBeredskapApiDataFromSøknadsdata(søknadsdata.beredskap),
                medlemskap: getMedlemskapApiDataFromSøknadsdata(sprak, søknadsdata.medlemskap),
                vedlegg: søknadsdata.legeerklæring !== undefined ? getVedleggApiData(søknadsdata.legeerklæring) : [],
                dataBruktTilUtledning: JSON.stringify(dataBruktTilUtledningAnnetData),
            };

            return apiData;
        } catch (e) {
            appLogger.logException(e, { context: 'getApiDataFromSøknadsdata failed' });
            throw e;
        }
    } else {
        appLogger.logError('getApiDataFromSøknadsdata failed - empty periode');
        return undefined;
    }
};
