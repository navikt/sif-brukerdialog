import { dateRangeToISODateRange, dateToISODate } from '@navikt/sif-common-utils';
import { KursApiData, KursperiodeApiData } from '../../types/søknadApiData/SøknadApiData';
import { KursSøknadsdata } from '../../types/søknadsdata/KursSøknadsdata';

export const getKursApiDataFromSøknadsdata = ({
    kursholder,
    kursperioder,
    reisedager,
}: KursSøknadsdata): KursApiData => {
    const apiData: KursApiData = {
        kursholder,
        perioder: kursperioder.map(
            (p) =>
                <KursperiodeApiData>{
                    // avreise: dateToISODate(p.avreise || p.periode.from),
                    // hjemkomst: dateToISODate(p.hjemkomst || p.periode.to),
                    kursperiode: dateRangeToISODateRange(p.periode),
                    // harTaptArbeidstid: p.harTaptArbeidstid,
                    // beskrivelseReisetid: p.beskrivelseReisetid,
                },
        ),
        reisedager:
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
