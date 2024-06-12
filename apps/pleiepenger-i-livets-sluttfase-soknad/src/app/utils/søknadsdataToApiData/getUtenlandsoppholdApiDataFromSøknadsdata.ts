import { getCountryName } from '@navikt/sif-common-formik-ds';
import { UtenlandsoppholdEnkel } from '@navikt/sif-common-forms-ds';
import { dateToISODate } from '@navikt/sif-common-utils';
import {
    UtenlandsoppholdIPeriodenApi,
    UtenlandsoppholdIPeriodenApiData,
} from '../../types/søknadApiData/SøknadApiData';
import { TidsromSøknadsdata } from '../../types/søknadsdata/TidsromSøknadsdata';

export const getUtenlansoppholdApiDataFromSøknadsdata = (
    locale: string,
    tidsrom: TidsromSøknadsdata,
): UtenlandsoppholdIPeriodenApi => {
    if (tidsrom.type === 'tidsromMedUtenlandsopphold') {
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
    opphold: UtenlandsoppholdEnkel,
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
