import { getCountryName } from '@navikt/sif-common-formik-ds';
import { UtenlandsoppholdEnkel } from '@navikt/sif-common-forms-ds/src';
import { dateToISODate } from '@navikt/sif-common-utils';

import { UtenlandsoppholdApiData, UtenlandsoppholdIPeriodenApiData } from '../../types/søknadApiData/SøknadApiData';
import { UtenlandsoppholdIPeriodenSøknadsdata } from '../../types/søknadsdata/UtenlandsoppholdSøknadsdata';

export const getUtenlansoppholdApiDataFromSøknadsdata = (
    locale: string,
    utenlandsopphold?: UtenlandsoppholdIPeriodenSøknadsdata,
): UtenlandsoppholdIPeriodenApiData => {
    if (!utenlandsopphold || utenlandsopphold.type === 'harIkkeUtenlandsopphold') {
        return {
            skalOppholdeSegIUtlandetIPerioden: false,
            opphold: [],
        };
    }
    return {
        skalOppholdeSegIUtlandetIPerioden: true,
        opphold: utenlandsopphold.utenlandsopphold.map((o) => getUtenlandsoppholdIPeriodenApiData(o, locale)),
    };
};

export const getUtenlandsoppholdIPeriodenApiData = (
    opphold: UtenlandsoppholdEnkel,
    locale: string,
): UtenlandsoppholdApiData => {
    const apiData: UtenlandsoppholdApiData = {
        landnavn: getCountryName(opphold.landkode, locale),
        landkode: opphold.landkode,
        fraOgMed: dateToISODate(opphold.fom),
        tilOgMed: dateToISODate(opphold.tom),
    };

    return apiData;
};
