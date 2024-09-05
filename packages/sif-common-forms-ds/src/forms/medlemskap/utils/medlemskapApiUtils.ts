import { getCountryName } from '@navikt/sif-common-formik-ds/src/utils/countryUtils';
import { BostedUtland } from '@navikt/sif-common-forms-ds';
import { dateToISODate } from '@navikt/sif-common-utils';
import { BostedUtlandApiData, MedlemskapApiData } from '../types';
import { MedlemskapSøknadsdata } from '../types/MedlemskapSøknadsdata';

const mapBostedUtlandToApiData = (opphold: BostedUtland, locale: string): BostedUtlandApiData => ({
    landnavn: getCountryName(opphold.landkode, locale),
    landkode: opphold.landkode,
    fraOgMed: dateToISODate(opphold.fom),
    tilOgMed: dateToISODate(opphold.tom),
});

export const getMedlemskapApiDataFromSøknadsdata = (
    locale: string,
    medlemskapSøknadsdata?: MedlemskapSøknadsdata,
): MedlemskapApiData => {
    if (medlemskapSøknadsdata === undefined) {
        throw Error('medlemskapSøknadsdata undefined');
    }

    switch (medlemskapSøknadsdata?.type) {
        case 'harIkkeBoddSkalIkkeBo':
            return {
                harBoddIUtlandetSiste12Mnd: false,
                utenlandsoppholdSiste12Mnd: [],
                skalBoIUtlandetNeste12Mnd: false,
                utenlandsoppholdNeste12Mnd: [],
            };
        case 'harBoddSkalBo':
            return {
                harBoddIUtlandetSiste12Mnd: true,
                utenlandsoppholdSiste12Mnd: medlemskapSøknadsdata.utenlandsoppholdSiste12Mnd.map((opphold) =>
                    mapBostedUtlandToApiData(opphold, locale),
                ),
                skalBoIUtlandetNeste12Mnd: true,
                utenlandsoppholdNeste12Mnd: medlemskapSøknadsdata.utenlandsoppholdNeste12Mnd.map((opphold) =>
                    mapBostedUtlandToApiData(opphold, locale),
                ),
            };

        case 'harBodd':
            return {
                harBoddIUtlandetSiste12Mnd: medlemskapSøknadsdata.harBoddUtenforNorgeSiste12Mnd,
                utenlandsoppholdSiste12Mnd: medlemskapSøknadsdata.utenlandsoppholdSiste12Mnd.map((opphold) =>
                    mapBostedUtlandToApiData(opphold, locale),
                ),
                skalBoIUtlandetNeste12Mnd: false,
                utenlandsoppholdNeste12Mnd: [],
            };
        case 'skalBo':
            return {
                harBoddIUtlandetSiste12Mnd: medlemskapSøknadsdata.harBoddUtenforNorgeSiste12Mnd,
                utenlandsoppholdSiste12Mnd: [],
                skalBoIUtlandetNeste12Mnd: medlemskapSøknadsdata.skalBoUtenforNorgeNeste12Mnd,
                utenlandsoppholdNeste12Mnd: medlemskapSøknadsdata.utenlandsoppholdNeste12Mnd.map((opphold) =>
                    mapBostedUtlandToApiData(opphold, locale),
                ),
            };
    }
};
