import { dateRangeToISODateRange, dateToISODate } from '@navikt/sif-common-utils';
import { KursApiData } from '../../types/søknadApiData/SøknadApiData';
import { KursSøknadsdata } from '../../types/søknadsdata/KursSøknadsdata';

export const getKursApiDataFromSøknadsdata = ({ kursholder, kursperioder }: KursSøknadsdata): KursApiData => {
    const apiData: KursApiData = {
        kursholder: kursholder === 'annen' ? 'annen' : { ...kursholder },
        perioder: kursperioder.map((p) => ({
            fraOgMed: p.periode.from,
            tilOgMed: p.periode.to,
            avreise: dateToISODate(p.avreise || p.periode.from),
            hjemkomst: dateToISODate(p.hjemkomst || p.periode.to),
            kursperiode: dateRangeToISODateRange(p.periode),
            beskrivelseReisetidHjem: p.beskrivelseReisetidHjem,
            BeskrivelseReisetidTil: p.beskrivelseReisetidTil,
        })),
    };
    return apiData;
};
