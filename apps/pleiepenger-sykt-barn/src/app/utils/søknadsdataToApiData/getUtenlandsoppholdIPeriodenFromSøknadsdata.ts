import { Locale } from '@navikt/sif-common-core-ds/src/types/Locale';
import { SøknadApiData } from '../../types/søknad-api-data/SøknadApiData';
import { UtenlandsoppholdIPeriodenSøknadsdata } from '../../types/søknadsdata/UtenlandsoppholdIPeriodenSøknadsdata';
import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { dateToISODate } from '@navikt/sif-common-utils';
import { countryIsMemberOfEøsOrEfta, getCountryName } from '@navikt/sif-common-formik-ds';
import { DateTidsperiode } from '@navikt/sif-common-forms-ds/src/forms/tidsperiode';
import { Utenlandsopphold } from '@navikt/sif-common-forms-ds/src/forms/utenlandsopphold/types';
import {
    PeriodeApiData,
    UtenlandsoppholdIPeriodenApiData,
    UtenlandsoppholdUtenforEøsIPeriodenApiData,
} from '../../types/søknad-api-data/SøknadApiData';
import { sortItemsByFomTom } from '../../local-sif-common-pleiepenger/utils';

const mapBarnInnlagtPeriodeToApiFormat = (periode: DateTidsperiode): PeriodeApiData => {
    return {
        fraOgMed: dateToISODate(periode.fom),
        tilOgMed: dateToISODate(periode.tom),
    };
};

export type UtenlandsoppholdIPerioden = Pick<SøknadApiData, 'utenlandsoppholdIPerioden'>;

export const mapUtenlandsoppholdIPeriodenApiData = (
    opphold: Utenlandsopphold,
    locale: string,
): UtenlandsoppholdIPeriodenApiData | UtenlandsoppholdUtenforEøsIPeriodenApiData => {
    const erUtenforEØS: boolean = countryIsMemberOfEøsOrEfta(opphold.landkode) === false;
    const apiData: UtenlandsoppholdIPeriodenApiData = {
        landnavn: getCountryName(opphold.landkode, locale),
        landkode: opphold.landkode,
        fraOgMed: dateToISODate(opphold.fom),
        tilOgMed: dateToISODate(opphold.tom),
    };

    if (erUtenforEØS) {
        const erBarnetInnlagt = opphold.erBarnetInnlagt === YesOrNo.YES;

        if (erBarnetInnlagt) {
        }

        const perioderBarnetErInnlagt = erBarnetInnlagt
            ? opphold.barnInnlagtPerioder.sort(sortItemsByFomTom).map(mapBarnInnlagtPeriodeToApiFormat)
            : [];

        const periodeopphold: UtenlandsoppholdUtenforEøsIPeriodenApiData = {
            ...apiData,
            erUtenforEøs: erUtenforEØS,
            erBarnetInnlagt,
            perioderBarnetErInnlagt: erBarnetInnlagt
                ? opphold.barnInnlagtPerioder.sort(sortItemsByFomTom).map(mapBarnInnlagtPeriodeToApiFormat)
                : [],
            erSammenMedBarnet: !erBarnetInnlagt ? opphold.erSammenMedBarnet === YesOrNo.YES : undefined,
            årsak: erBarnetInnlagt ? opphold.årsak : null,
        };
        return periodeopphold;
    }
    return apiData;
};

export const getUtenlandsoppholdIPeriodenApiDataFromSøknadsdata = (
    locale: Locale,
    utenlandsoppholdIPerioden?: UtenlandsoppholdIPeriodenSøknadsdata,
): UtenlandsoppholdIPerioden => {
    if (utenlandsoppholdIPerioden === undefined) {
        throw Error('utenlandsoppholdIPeriodenSøknadsdata undefined');
    }

    switch (utenlandsoppholdIPerioden?.type) {
        case 'skalOppholdeSegIUtlandet':
            const { opphold } = utenlandsoppholdIPerioden;

            if (opphold.length === 0) {
                throw Error('utenlandsopphold er tomt');
            }
            return {
                utenlandsoppholdIPerioden: {
                    skalOppholdeSegIUtlandetIPerioden: true,
                    opphold: opphold.map((o) => mapUtenlandsoppholdIPeriodenApiData(o, locale)),
                },
            };
        case 'skalIkkeOppholdeSegIUtlandet':
            return {
                utenlandsoppholdIPerioden: {
                    skalOppholdeSegIUtlandetIPerioden: false,
                    opphold: [],
                },
            };
    }
};
