import { Utenlandsopphold } from '@navikt/sif-common-forms-ds/lib';
import {
    UtenlandsoppholdIPeriodenApi,
    UtenlandsoppholdIPeriodenApiData,
} from '../../types/søknadApiData/SøknadApiData';
import { TidsromSøknadsdata } from '../../types/søknadsdata/TidsromSøknadsdata';
import { dateToISODate } from '@navikt/sif-common-utils/lib';
import { getCountryName } from '@navikt/sif-common-formik-ds/lib';

export const getUtenlansoppholdApiDataFromSøknadsdata = (
    locale: string,
    tidsrom: TidsromSøknadsdata,
): UtenlandsoppholdIPeriodenApi => {
    if (tidsrom.type === 'tidsromKunMedUtenlandsopphold' || tidsrom.type === 'tidsromMedUtenlandsoppholdMedFerie') {
        const { skalOppholdeSegIUtlandetIPerioden, utenlandsoppholdIPerioden } = tidsrom;

        return {
            skalOppholdeSegIUtlandetIPerioden,
            opphold: utenlandsoppholdIPerioden.map((o) => getUtenlandsoppholdIPeriodenApiData(o, locale)),
        };
    }

    return {
        skalOppholdeSegIUtlandetIPerioden: false,
        opphold: [],
    };
};

export const getUtenlandsoppholdIPeriodenApiData = (
    opphold: Utenlandsopphold,
    locale: string,
): UtenlandsoppholdIPeriodenApiData => {
    const apiData: UtenlandsoppholdIPeriodenApiData = {
        landnavn: getCountryName(opphold.landkode, locale),
        landkode: opphold.landkode,
        fraOgMed: dateToISODate(opphold.fom),
        tilOgMed: dateToISODate(opphold.tom),
    };

    return apiData;
};
