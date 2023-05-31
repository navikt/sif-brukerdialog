import { DateDurationMap, DurationWeekdays, ISODurationToMaybeDuration } from '@navikt/sif-common-utils/lib';
import { ArbeidsgiverApiData, OrganisasjonArbeidsgiverApiData } from '../../types/søknad-api-data/arbeidsgiverApiData';
import { TidEnkeltdagApiData, TimerFasteDagerApiData } from '../../types/søknad-api-data/SøknadApiData';

export const arbeidsgiverHarOrganisasjonsnummer = (a: ArbeidsgiverApiData): a is OrganisasjonArbeidsgiverApiData => {
    return a.organisasjonsnummer !== undefined;
};

export const mapTidEnkeltdagApiDataToDateDurationMap = (tidEnkeltdager: TidEnkeltdagApiData[]): DateDurationMap => {
    const result: DateDurationMap = {};
    tidEnkeltdager.forEach((tidEnkeltdag) => {
        const tid = ISODurationToMaybeDuration(tidEnkeltdag.tid);
        if (tid) {
            result[tidEnkeltdag.dato] = tid;
        }
    });
    return result;
};

export const mapTimerFasteDagerToDurationWeekdays = ({
    mandag,
    tirsdag,
    onsdag,
    torsdag,
    fredag,
}: TimerFasteDagerApiData): DurationWeekdays => {
    return {
        monday: mandag ? ISODurationToMaybeDuration(mandag) : undefined,
        tuesday: tirsdag ? ISODurationToMaybeDuration(tirsdag) : undefined,
        wednesday: onsdag ? ISODurationToMaybeDuration(onsdag) : undefined,
        thursday: torsdag ? ISODurationToMaybeDuration(torsdag) : undefined,
        friday: fredag ? ISODurationToMaybeDuration(fredag) : undefined,
    };
};
