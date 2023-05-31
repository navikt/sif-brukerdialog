import { UtenlandskNæring } from '@navikt/sif-common-forms-ds/lib/forms/utenlandsk-næring';
import { ISODateToDate } from '@navikt/sif-common-utils/lib';
import { UtenlandskNæringApiData } from '../../types/søknad-api-data/SøknadApiData';

export const mapUtenlandskNæringApiDataToUtenlandskNæring = ({
    fraOgMed,
    tilOgMed,
    land,
    navnPåVirksomheten,
    organisasjonsnummer,
    næringstype,
}: UtenlandskNæringApiData): UtenlandskNæring => {
    return {
        fraOgMed: ISODateToDate(fraOgMed),
        tilOgMed: tilOgMed ? ISODateToDate(tilOgMed) : undefined,
        erPågående: tilOgMed === undefined,
        land: land.landkode,
        navnPåVirksomheten,
        id: organisasjonsnummer,
        identifikasjonsnummer: organisasjonsnummer,
        næringstype,
    };
};
