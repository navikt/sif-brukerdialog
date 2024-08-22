import { Locale } from '@navikt/sif-common-core-ds/src/types/Locale';
import { getCountryName } from '@navikt/sif-common-formik-ds';
import { DateTidsperiode } from '@navikt/sif-common-forms-ds/src/forms/tidsperiode';
import { UtenlandsoppholdUtvidet } from '@navikt/sif-common-forms-ds/src/forms/utenlandsopphold/types';
import { dateToISODate } from '@navikt/sif-common-utils';
import { sortItemsByFomTom } from '../../local-sif-common-pleiepenger/utils';
import {
    PeriodeApiData,
    SøknadApiData,
    UtenlandsoppholdIPeriodenApiData,
} from '../../types/søknad-api-data/SøknadApiData';
import { UtenlandsoppholdIPeriodenSøknadsdata } from '../../types/søknadsdata/UtenlandsoppholdIPeriodenSøknadsdata';

const mapBarnInnlagtPeriodeToApiFormat = (periode: DateTidsperiode): PeriodeApiData => {
    return {
        fraOgMed: dateToISODate(periode.fom),
        tilOgMed: dateToISODate(periode.tom),
    };
};

export type UtenlandsoppholdIPerioden = Pick<SøknadApiData, 'utenlandsoppholdIPerioden'>;

export const mapUtenlandsoppholdIPeriodenApiData = (
    utenlandsopphold: UtenlandsoppholdUtvidet,
    locale: string,
): UtenlandsoppholdIPeriodenApiData => {
    if (utenlandsopphold.erUtenforEØS === false) {
        return {
            landnavn: getCountryName(utenlandsopphold.landkode, locale),
            landkode: utenlandsopphold.landkode,
            fraOgMed: dateToISODate(utenlandsopphold.fom),
            tilOgMed: dateToISODate(utenlandsopphold.tom),
            erUtenforEøs: false,
            erSammenMedBarnet: utenlandsopphold.erSammenMedBarnet,
        };
    }
    const { erBarnetInnlagt, barnInnlagtPerioder, årsak } = utenlandsopphold;

    const perioderBarnetErInnlagt =
        erBarnetInnlagt && barnInnlagtPerioder
            ? barnInnlagtPerioder.sort(sortItemsByFomTom).map(mapBarnInnlagtPeriodeToApiFormat)
            : [];

    return {
        erUtenforEøs: true,
        landnavn: getCountryName(utenlandsopphold.landkode, locale),
        landkode: utenlandsopphold.landkode,
        fraOgMed: dateToISODate(utenlandsopphold.fom),
        tilOgMed: dateToISODate(utenlandsopphold.tom),
        erSammenMedBarnet: utenlandsopphold.erSammenMedBarnet,
        erBarnetInnlagt,
        perioderBarnetErInnlagt,
        årsak: årsak || null,
    };
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
            if (utenlandsoppholdIPerioden.opphold.length === 0) {
                throw Error('utenlandsopphold er tomt');
            }
            return {
                utenlandsoppholdIPerioden: {
                    skalOppholdeSegIUtlandetIPerioden: true,
                    opphold: utenlandsoppholdIPerioden.opphold.map((o) =>
                        mapUtenlandsoppholdIPeriodenApiData(o, locale),
                    ),
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
