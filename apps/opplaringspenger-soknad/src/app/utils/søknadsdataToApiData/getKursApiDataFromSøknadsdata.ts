import { dateRangeToISODateRange, dateToISODate } from '@navikt/sif-common-utils';
import { KursApiData } from '../../types/søknadApiData/SøknadApiData';
import { KursSøknadsdata } from '../../types/søknadsdata/KursSøknadsdata';
import { Institusjoner } from '../../api/institusjonService';

export const getKursApiDataFromSøknadsdata = (
    { kursholder, kursperioder, reisedager }: KursSøknadsdata,
    _institusjoner: Institusjoner,
): KursApiData => {
    /**
     * Backend støtter ikke uuid enda, så vi sender fortsatt inn navn
    const valgtInstitusjon = institusjoner.find((i) => i.navn === kursholder);
     */

    const apiData: KursApiData = {
        kursholder,
        // Ref kommentar over
        // kursholder: {
        //     uuid: valgtInstitusjon?.uuid,
        //     navn: kursholder,
        // },
        kursperioder: kursperioder.map((p) => dateRangeToISODateRange(p.periode)),
        reise:
            reisedager.reiserUtenforKursdager === true
                ? {
                      reiserUtenforKursdager: true,
                      reisedager: reisedager.reisedager.map((d) => dateToISODate(d.dato)),
                      reisedagerBeskrivelse: reisedager.reisedagerBeskrivelse,
                  }
                : { reiserUtenforKursdager: false },
    };
    return apiData;
};
