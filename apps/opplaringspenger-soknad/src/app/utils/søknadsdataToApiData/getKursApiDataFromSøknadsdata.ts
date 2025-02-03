import { dateRangeToISODateRange, dateToISODate } from '@navikt/sif-common-utils';
import { KursApiData } from '../../types/søknadApiData/SøknadApiData';
import { KursSøknadsdata } from '../../types/søknadsdata/KursSøknadsdata';

export const getKursApiDataFromSøknadsdata = ({
    kursholder,
    kursperioder,
    reisedager,
}: KursSøknadsdata): KursApiData => {
    const apiData: KursApiData = {
        kursholder,
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
