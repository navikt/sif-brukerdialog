import { getCountryName } from '@navikt/sif-common-formik-ds';
import { UtenlandskNæringApi } from '../../types/søknadApiData/SøknadApiData';
import { UtenlandskNæringSøknadsdata } from '../../types/søknadsdata/UtenlandskNæringSøknadsdata';
import { dateToISODate } from '@navikt/sif-common-utils';

export const getUtenlandskNæringApiDataFromSøknadsdata = (
    locale: string,
    utenlandskNæringSøknadsdata: UtenlandskNæringSøknadsdata,
): UtenlandskNæringApi[] => {
    switch (utenlandskNæringSøknadsdata.type) {
        case 'harIkkeUtenlandskNæring':
            return [];
        case 'harUtenlandskNæring':
            const apiData: UtenlandskNæringApi[] = utenlandskNæringSøknadsdata.utenlandskNæring.map((næring) => ({
                næringstype: næring.næringstype,
                navnPåVirksomheten: næring.navnPåVirksomheten,
                organisasjonsnummer: næring.identifikasjonsnummer ? næring.identifikasjonsnummer : undefined,
                land: {
                    landnavn: getCountryName(næring.land, locale),
                    landkode: næring.land,
                },
                fraOgMed: dateToISODate(næring.fraOgMed),
                tilOgMed: næring.tilOgMed ? dateToISODate(næring.tilOgMed) : undefined,
            }));
            return apiData;
    }
};
