import {
    dateRangeUtils,
    decimalDurationToDuration,
    Duration,
    durationToDecimalDuration,
    ISODateRange,
    ISODateRangeToDateRange,
} from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import { Arbeidsuke } from '../../../src/app/types/K9Sak';

const getMockArbeidsuke = (
    isoDateRange: ISODateRange,
    normaltPerDag: Duration = { hours: '7', minutes: '30' },
    faktiskPerDag: Duration = { hours: '2', minutes: '0' }
): Arbeidsuke => {
    const antallDagerMedArbeidstid = dateRangeUtils.getNumberOfDaysInDateRange(
        ISODateRangeToDateRange(isoDateRange),
        true
    );
    const periode = ISODateRangeToDateRange(isoDateRange);
    return {
        isoDateRange,
        periode,
        normalt: {
            uke: decimalDurationToDuration(durationToDecimalDuration(normaltPerDag) * antallDagerMedArbeidstid),
            dag: normaltPerDag,
        },
        faktisk: {
            uke: decimalDurationToDuration(durationToDecimalDuration(faktiskPerDag) * antallDagerMedArbeidstid),
            dag: faktiskPerDag,
        },
        meta: {
            antallDagerMedArbeidstid,
            ukenummer: dayjs(periode.from).isoWeek(),
            årstall: dayjs(periode.from).isoWeekYear(),
        },
    };
};

const ukerEttÅr: ISODateRange[] = [
    '2022-11-03/2022-11-04',
    '2022-11-14/2022-11-18',
    '2022-11-07/2022-11-11',
    '2022-11-21/2022-11-25',
    '2022-11-28/2022-11-30',
];
const ukerFlereÅr: ISODateRange[] = [...ukerEttÅr, '2023-01-02/2023-01-04'];

const arbeidsukerEttÅr: Arbeidsuke[] = ukerEttÅr.map((uke) => getMockArbeidsuke(uke));
const arbeidsukerFlereÅr: Arbeidsuke[] = ukerFlereÅr.map((uke) => getMockArbeidsuke(uke));

export const arbeidsukerMockData = {
    arbeidsuke: arbeidsukerEttÅr[0],
    arbeidsukerEttÅr,
    arbeidsukerFlereÅr,
    getMockArbeidsuke,
};
