import { UtenlandskNæringApiData } from '../../types/søknad-api-data/SøknadApiData';
import { UtenlandskNæringSøknadsdata } from '../../types/søknadsdata/UtenlandskNæringSøknadsdata';
import { getCountryName } from '@navikt/sif-common-formik-ds/src';
import { dateToISODate } from '@navikt/sif-common-utils';

export const getUtenlandskNæringSøknadsdata = (
    locale: string,
    utenlandskNæring?: UtenlandskNæringSøknadsdata,
): UtenlandskNæringApiData[] => {
    if (utenlandskNæring?.type === 'harUtenlandskNæring') {
        const apiData: UtenlandskNæringApiData[] = utenlandskNæring.utenlandskNæring.map((næring) => ({
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

    if (utenlandskNæring?.type === 'harIkkeUtenlandskNæring') {
        return [];
    }

    return [];
};
