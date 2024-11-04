import { ISODateToDate } from '@navikt/sif-common-utils';
import { Opplæringsinstitusjon } from '../types/Opplæringsinstitusjon';
import dayjs from 'dayjs';
import { getTillattSøknadsperiode } from '../utils/søknadsperiodeUtils';
import { getPerioderISøknadsperiodeHvorInstitusjonIkkeErGyldig } from '../søknad/steps/kurs/kursStepUtils';
import axios from 'axios';
import { axiosConfig } from '@navikt/sif-common-api/src/api/apiClient';
import { getK9SakInnsynEnv } from '@navikt/sif-common-env';

const generateRandomPeriod = (startDate: Date, months: number) => {
    const endDate = dayjs(startDate).add(months, 'months').toDate();
    return { from: startDate, to: endDate };
};

export const k9SakApiClient = axios.create({
    ...axiosConfig,
    baseURL: getK9SakInnsynEnv().K9_SAK_INNSYN_FRONTEND_PATH,
});

export const mockOpplæringsinstitusjon: Array<Omit<Opplæringsinstitusjon, 'ugyldigePerioder'>> = [
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
        periode: [],
    },
    {
        uuid: '3',
        navn: 'Evenes syn- og mestringssenter',
        periode: [
            generateRandomPeriod(ISODateToDate('2023-01-01'), 9),
            generateRandomPeriod(ISODateToDate('2024-01-01'), 6),
        ],
    },
    {
        uuid: '4',
        navn: 'Oslo læringssenter',
        periode: [generateRandomPeriod(ISODateToDate('2021-06-01'), 12)],
    },
    {
        uuid: '5',
        navn: 'Bergen utviklingssenter',
        periode: [
            generateRandomPeriod(ISODateToDate('2024-02-01'), 12),
            generateRandomPeriod(ISODateToDate('2024-08-01'), 6),
        ],
    },
    {
        uuid: '6',
        navn: 'Trondheim kompetansesenter',
        periode: [generateRandomPeriod(ISODateToDate('2021-09-01'), 12)],
    },
    {
        uuid: '7',
        navn: 'Stavanger helsesenter',
        periode: [
            generateRandomPeriod(ISODateToDate('2022-05-01'), 12),
            generateRandomPeriod(ISODateToDate('2023-05-01'), 6),
        ],
    },
    {
        uuid: '8',
        navn: 'Drammen veiledningssenter',
        periode: [generateRandomPeriod(ISODateToDate('2021-11-01'), 12)],
    },
    {
        uuid: '9',
        navn: 'Kristiansand opplæringssenter',
        periode: [
            generateRandomPeriod(ISODateToDate('2022-07-01'), 12),
            generateRandomPeriod(ISODateToDate('2023-07-01'), 6),
        ],
    },
    {
        uuid: '10',
        navn: 'Tromsø mestringssenter',
        periode: [generateRandomPeriod(ISODateToDate('2021-02-01'), 12)],
    },
];

export const opplæringsinstitusjonService = {
    fetch: async (): Promise<Opplæringsinstitusjon[]> => {
        const gyldigSøknadsperiode = getTillattSøknadsperiode();
        const response = await k9SakApiClient.get(`/k9sak/opplaringsinstitusjoner`);
        return response.data
            .map((institusjon) => {
                return {
                    ...institusjon,
                    ugyldigePerioder: getPerioderISøknadsperiodeHvorInstitusjonIkkeErGyldig(
                        institusjon.periode!,
                        gyldigSøknadsperiode,
                    ),
                };
            })
            .sort((a, b) => a.navn.localeCompare(b.navn));
    },
};
