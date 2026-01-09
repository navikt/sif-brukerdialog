import { dateRangeToISODateRange, dateToISODate, durationToISODuration } from '@navikt/sif-common-utils';

import { Institusjoner } from '../../api/institusjonService';
import { EnkeltdagEllerPeriode } from '../../søknad/steps/kurs/KursStepForm';
import { Kursdag } from '../../types/Kursdag';
import { KursApiData, KursdagApiData } from '../../types/søknadApiData/SøknadApiData';
import { KursSøknadsdata } from '../../types/søknadsdata/KursSøknadsdata';

const getKursdagApiDataFromKursdag = (kursdag: Kursdag): KursdagApiData => ({
    dato: dateToISODate(kursdag.dato),
    tidKurs: durationToISODuration(kursdag.tidKurs),
    tidReise: kursdag.tidReise ? durationToISODuration(kursdag.tidReise) : undefined,
});

export const getKursApiDataFromSøknadsdata = (
    { kursholder, kursperioder, kursdager, reisedager, enkeltdagEllerPeriode }: KursSøknadsdata,
    institusjoner: Institusjoner,
): KursApiData => {
    const valgtInstitusjon = institusjoner.find((i) => i.navn === kursholder);
    const gjelderPerioder = enkeltdagEllerPeriode === EnkeltdagEllerPeriode.PERIODE;

    const apiData: KursApiData = {
        kursholder: {
            uuid: valgtInstitusjon?.uuid,
            navn: kursholder,
        },
        enkeltdagEllerPeriode,
        kursperioder: gjelderPerioder ? kursperioder.map((p) => dateRangeToISODateRange(p.periode)) : [],
        kursdager: !gjelderPerioder ? kursdager.map(getKursdagApiDataFromKursdag) : [],
        reise: gjelderPerioder
            ? reisedager?.reiserUtenforKursdager === true
                ? {
                      reiserUtenforKursdager: true,
                      reisedager: reisedager.reisedager.map((d) => dateToISODate(d.dato)),
                      reisedagerBeskrivelse: reisedager.reisedagerBeskrivelse,
                  }
                : { reiserUtenforKursdager: false }
            : undefined,
    };
    return apiData;
};
