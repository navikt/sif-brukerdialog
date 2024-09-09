import { BostedUtland, Utenlandsopphold, UtenlandsoppholdEnkel } from '@navikt/sif-common-forms-ds';
import { dateToISODate } from '@navikt/sif-common-utils';
import { UtenlandsoppholdApiData } from '../../types/søknadApiData/SøknadApiData';
import { countryIsMemberOfEøsOrEfta, getCountryName } from '@navikt/sif-common-formik-ds/src/utils/countryUtils';
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
    medlemskapSøknadsdata?: MedlemskapSøknadsdata,
): UtenlandsoppholdApiData[] => {
    if (medlemskapSøknadsdata === undefined) {
        throw Error('medlemskapSøknadsdata undefined');
    }

    switch (medlemskapSøknadsdata?.type) {
        case 'harIkkeBoddSkalIkkeBo':
            return [];
        case 'harBoddSkalBo':
            return settInnBosteder(
                medlemskapSøknadsdata.harBoddUtenforNorgeSiste12Mnd,
                medlemskapSøknadsdata.utenlandsoppholdSiste12Mnd,
                medlemskapSøknadsdata.skalBoUtenforNorgeNeste12Mnd,
                medlemskapSøknadsdata.utenlandsoppholdNeste12Mnd,
                locale,
            );

        case 'harBodd':
            return settInnBosteder(
                medlemskapSøknadsdata.harBoddUtenforNorgeSiste12Mnd,
                medlemskapSøknadsdata.utenlandsoppholdSiste12Mnd,
                medlemskapSøknadsdata.skalBoUtenforNorgeNeste12Mnd,
                [],
                locale,
            );
        case 'skalBo':
            return settInnBosteder(
                medlemskapSøknadsdata.harBoddUtenforNorgeSiste12Mnd,
                [],
                medlemskapSøknadsdata.skalBoUtenforNorgeNeste12Mnd,
                medlemskapSøknadsdata.utenlandsoppholdNeste12Mnd,
                locale,
            );
    }
};

const settInnBosteder = (
    harBoddUtenforNorgeSiste12Mnd: boolean,
    utenlandsoppholdSiste12Mnd: UtenlandsoppholdEnkel[],
    skalBoUtenforNorgeNeste12Mnd: boolean,
    utenlandsoppholdNeste12Mnd: UtenlandsoppholdEnkel[],
    locale: string,
): UtenlandsoppholdApiData[] => {
    const mappedSiste12Mnd = harBoddUtenforNorgeSiste12Mnd
        ? utenlandsoppholdSiste12Mnd.map((utenlandsopphold: Utenlandsopphold) => {
              return mapBostedUtlandToApiData(utenlandsopphold, locale);
          })
        : [];

    const mappedNeste12Mnd = skalBoUtenforNorgeNeste12Mnd
        ? utenlandsoppholdNeste12Mnd.map((utenlandsopphold: Utenlandsopphold) => {
              return mapBostedUtlandToApiData(utenlandsopphold, locale);
          })
        : [];

    return [...mappedSiste12Mnd, ...mappedNeste12Mnd];
};
