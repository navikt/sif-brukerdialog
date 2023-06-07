import { BostedUtland } from '@navikt/sif-common-forms-ds/lib';
import { dateToISODate } from '@navikt/sif-common-utils';
import { MedlemskapApiData, UtenlandsoppholdApiData } from '../../types/søknadApiData/SøknadApiData';
import { countryIsMemberOfEøsOrEfta, getCountryName } from '@navikt/sif-common-formik-ds/lib/utils/countryUtils';
import { MedlemskapSøknadsdata } from '../../types/søknadsdata/MedlemskapSøknadsdata';

export const mapBostedUtlandToApiData = (opphold: BostedUtland, locale: string): UtenlandsoppholdApiData => ({
    landnavn: getCountryName(opphold.landkode, locale),
    landkode: opphold.landkode,
    fraOgMed: dateToISODate(opphold.fom),
    tilOgMed: dateToISODate(opphold.tom),
    erEØSLand: countryIsMemberOfEøsOrEfta(opphold.landkode),
});

export const getMedlemskapApiDataFromSøknadsdata = (
    locale: string,
    medlemskapSøknadsdata?: MedlemskapSøknadsdata
): MedlemskapApiData => {
    if (medlemskapSøknadsdata === undefined) {
        throw Error('medlemskapSøknadsdata undefined');
    }

    switch (medlemskapSøknadsdata?.type) {
        case 'harIkkeBoddSkalIkkeBo':
            return {
                harBoddIUtlandetSiste12Mnd: medlemskapSøknadsdata.harBoddUtenforNorgeSiste12Mnd,
                utenlandsoppholdSiste12Mnd: [],
                skalBoIUtlandetNeste12Mnd: medlemskapSøknadsdata.skalBoUtenforNorgeNeste12Mnd,
                utenlandsoppholdNeste12Mnd: [],
            };
        case 'harBoddSkalBo':
            return {
                harBoddIUtlandetSiste12Mnd: medlemskapSøknadsdata.harBoddUtenforNorgeSiste12Mnd,
                utenlandsoppholdSiste12Mnd: medlemskapSøknadsdata.utenlandsoppholdSiste12Mnd.map((o) =>
                    mapBostedUtlandToApiData(o, locale)
                ),

                skalBoIUtlandetNeste12Mnd: medlemskapSøknadsdata.skalBoUtenforNorgeNeste12Mnd,
                utenlandsoppholdNeste12Mnd: medlemskapSøknadsdata.utenlandsoppholdNeste12Mnd.map((o) =>
                    mapBostedUtlandToApiData(o, locale)
                ),
            };

        case 'harBodd':
            return {
                harBoddIUtlandetSiste12Mnd: medlemskapSøknadsdata.harBoddUtenforNorgeSiste12Mnd,
                utenlandsoppholdSiste12Mnd: medlemskapSøknadsdata.utenlandsoppholdSiste12Mnd.map((o) =>
                    mapBostedUtlandToApiData(o, locale)
                ),
                skalBoIUtlandetNeste12Mnd: medlemskapSøknadsdata.skalBoUtenforNorgeNeste12Mnd,
                utenlandsoppholdNeste12Mnd: [],
            };
        case 'skalBo':
            return {
                harBoddIUtlandetSiste12Mnd: medlemskapSøknadsdata.harBoddUtenforNorgeSiste12Mnd,
                utenlandsoppholdSiste12Mnd: [],
                skalBoIUtlandetNeste12Mnd: medlemskapSøknadsdata.skalBoUtenforNorgeNeste12Mnd,
                utenlandsoppholdNeste12Mnd: medlemskapSøknadsdata.utenlandsoppholdNeste12Mnd.map((o) =>
                    mapBostedUtlandToApiData(o, locale)
                ),
            };
    }
};
