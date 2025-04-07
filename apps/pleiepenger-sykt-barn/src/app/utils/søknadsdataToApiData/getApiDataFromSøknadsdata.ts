import { RegistrertBarn } from '@navikt/sif-common-api';
import { getVedleggApiData } from '@navikt/sif-common-core-ds/src';
import { Locale } from '@navikt/sif-common-core-ds/src/types/Locale';
import { getMedlemskapApiDataFromSøknadsdata } from '@navikt/sif-common-forms-ds/src';
import { dateToISODate } from '@navikt/sif-common-utils';
import { ÅrsakManglerIdentitetsnummer } from '../../types';
import {
    DataBruktTilUtledningAnnetData,
    SøknadApiData,
    SøknadApiDataVersjon,
} from '../../types/søknad-api-data/SøknadApiData';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import appSentryLogger from '../appSentryLogger';
import { getValidSpråk } from '../sprakUtils';
import { getArbeidsgivereApiDataFromSøknadsdata } from './getArbeidsgivereApiDataFromSøknadsdata';
import { getBarnApiDataFromSøknadsdata } from './getBarnApiDataFromSøknadsdata';
import { getBeredskapApiDataFromSøknadsdata } from './getBeredskapApiDataFromSøknadsdata';
import { getFerieuttakIPeriodenApiDataFromSøknadsdata } from './getFerieuttakIPeriodenApiDataFromSøknadsdata';
import { getFrilansApiDataFromSøknadsdata } from './getFrilansApiDataFromSøknadsdata';
import { getNattevåkApiDataFromSøknadsdata } from './getNattevåkApiDataFromSøknadsdata';
import { getOmsorgstilbudApiDataFromSøknadsdata } from './getOmsorgstibudApiDataFromSøknadsdata';
import { getOpptjeningIUtlandetSøknadsdata } from './getOpptjeningIUtlandetSøknadsdata';
import { getSelvstendigApiDataFromSøknadsdata } from './getSelvstendigApiDataFromSøknadsdata';
import { getUtenlandskNæringSøknadsdata } from './getUtenlandskNæringSøknadsdata';
import { getUtenlandsoppholdIPeriodenApiDataFromSøknadsdata } from './getUtenlandsoppholdIPeriodenFromSøknadsdata';
import { getOmsorgsstønadApiDataFromSøknadsdata } from './getOmsorgsstønadApiDataFromSøknadsdata';

export const getApiDataFromSøknadsdata = (
    søkerNorskIdent: string,
    barn: RegistrertBarn[],
    søknadsdata: Søknadsdata,
    harBekreftetOpplysninger: boolean,
    dataBruktTilUtledningAnnetData: DataBruktTilUtledningAnnetData,
    locale: Locale = 'nb',
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
                fødselsattestVedleggUrls:
                    søknadsdata.barn &&
                    søknadsdata.barn.type === 'annetBarnUtenFnr' &&
                    søknadsdata.barn.årsakManglerIdentitetsnummer ===
                        ÅrsakManglerIdentitetsnummer.BARNET_BOR_I_UTLANDET &&
                    søknadsdata.barn.fødselsattest
                        ? getVedleggApiData(søknadsdata.barn.fødselsattest)
                        : [],
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
            appSentryLogger.logError('getApiDataFromSøknadsdata failed', e as any);
            throw e;
        }
    } else {
        appSentryLogger.logError('getApiDataFromSøknadsdata failed - empty periode', JSON.stringify(søknadsperiode));
        return undefined;
    }
};
