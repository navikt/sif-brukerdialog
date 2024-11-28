import { dateRangeToISODateRange, dateToISODate } from '@navikt/sif-common-utils';
import { KursApiData, KursperiodeApiData } from '../../types/søknadApiData/SøknadApiData';
import { KursSøknadsdata } from '../../types/søknadsdata/KursSøknadsdata';

export const getKursApiDataFromSøknadsdata = ({
    kursholder: kursholder,
    kursperioder,
}: KursSøknadsdata): KursApiData => {
    const apiData: KursApiData = {
        kursholder,
        perioder: kursperioder.map(
            (p) =>
                <KursperiodeApiData>{
                    avreise: dateToISODate(p.avreise || p.periode.from),
                    hjemkomst: dateToISODate(p.hjemkomst || p.periode.to),
                    kursperiode: dateRangeToISODateRange(p.periode),
                    beskrivelseReisetidHjem: p.beskrivelseReisetidHjem,
                    beskrivelseReisetidTil: p.beskrivelseReisetidTil,
                },
        ),
    };
    return apiData;
};
