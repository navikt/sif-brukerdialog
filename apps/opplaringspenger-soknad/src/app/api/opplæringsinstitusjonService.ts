import { ISODateToDate } from '@navikt/sif-common-utils';
import { Opplæringsinstitusjon } from '../types/Opplæringsinstitusjon';
import dayjs from 'dayjs';

const generateRandomPeriod = (startDate: Date, months: number) => {
    const endDate = dayjs(startDate).add(months, 'months').toDate();
    return { from: startDate, to: endDate };
};

const mockOpplæringsinstitusjon = {
    opplæringsinstitusjoner: <Opplæringsinstitusjon[]>[
        {
            uuid: '1',
            navn: 'Hurdal syn- og mestringssenter',
            periode: [
                generateRandomPeriod(ISODateToDate('2021-01-01'), 12),
                generateRandomPeriod(ISODateToDate('2024-01-01'), 12),
            ],
        },
        {
            uuid: '2',
            navn: 'Solvik syn- og mestringssenter',
            godkjent: true,
            periode: [],
        },
        {
            uuid: '3',
            navn: 'Evenes syn- og mestringssenter',
            godkjent: true,
            periode: [
                generateRandomPeriod(ISODateToDate('2023-01-01'), 9),
                generateRandomPeriod(ISODateToDate('2024-01-01'), 6),
            ],
        },
        {
            uuid: '4',
            navn: 'Oslo læringssenter',
            godkjent: true,
            periode: [generateRandomPeriod(ISODateToDate('2021-06-01'), 12)],
        },
        {
            uuid: '5',
            navn: 'Bergen utviklingssenter',
            godkjent: true,
            periode: [
                generateRandomPeriod(ISODateToDate('2024-02-01'), 12),
                generateRandomPeriod(ISODateToDate('2024-08-01'), 6),
            ],
        },
        {
            uuid: '6',
            navn: 'Trondheim kompetansesenter',
            godkjent: true,
            periode: [generateRandomPeriod(ISODateToDate('2021-09-01'), 12)],
        },
        {
            uuid: '7',
            navn: 'Stavanger helsesenter',
            godkjent: true,
            periode: [
                generateRandomPeriod(ISODateToDate('2022-05-01'), 12),
                generateRandomPeriod(ISODateToDate('2023-05-01'), 6),
            ],
        },
        {
            uuid: '8',
            navn: 'Drammen veiledningssenter',
            godkjent: true,
            periode: [generateRandomPeriod(ISODateToDate('2021-11-01'), 12)],
        },
        {
            uuid: '9',
            navn: 'Kristiansand opplæringssenter',
            godkjent: true,
            periode: [
                generateRandomPeriod(ISODateToDate('2022-07-01'), 12),
                generateRandomPeriod(ISODateToDate('2023-07-01'), 6),
            ],
        },
        {
            uuid: '10',
            navn: 'Tromsø mestringssenter',
            godkjent: true,
            periode: [generateRandomPeriod(ISODateToDate('2021-02-01'), 12)],
        },
    ],
};

export const opplæringsinstitusjonService = {
    fetch: async (): Promise<Opplæringsinstitusjon[]> => {
        try {
            return Promise.resolve(
                mockOpplæringsinstitusjon.opplæringsinstitusjoner.sort((a, b) => a.navn.localeCompare(b.navn)),
            );
        } catch {
            return Promise.resolve(mockOpplæringsinstitusjon.opplæringsinstitusjoner);
        }
    },
};
