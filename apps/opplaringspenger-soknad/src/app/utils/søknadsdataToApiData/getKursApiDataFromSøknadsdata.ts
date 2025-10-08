import { dateRangeToISODateRange, dateToISODate } from '@navikt/sif-common-utils';
import { Institusjoner } from '../../api/institusjonService';
import { KursApiData } from '../../types/søknadApiData/SøknadApiData';
import { KursSøknadsdata } from '../../types/søknadsdata/KursSøknadsdata';

export const getKursApiDataFromSøknadsdata = (
    { kursholder, kursperioder, reisedager }: KursSøknadsdata,
    institusjoner: Institusjoner,
): KursApiData => {
    const valgtInstitusjon = institusjoner.find((i) => i.navn === kursholder);

    const apiData: KursApiData = {
        kursholder: {
            uuid: valgtInstitusjon?.uuid,
            navn: kursholder,
        },
        kursperioder: kursperioder.map((p) => dateRangeToISODateRange(p.periode)),
        reise:
            reisedager?.reiserUtenforKursdager === true
                ? {
                      reiserUtenforKursdager: true,
                      reisedager: reisedager.reisedager.map((d) => dateToISODate(d.dato)),
                      reisedagerBeskrivelse: reisedager.reisedagerBeskrivelse,
                  }
                : { reiserUtenforKursdager: false },
    };
    return apiData;
};
