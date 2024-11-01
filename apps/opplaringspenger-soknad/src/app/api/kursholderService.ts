import { Kursholder } from '../types/Kursholder';

const mockKursholder = {
    kursholdere: [
        {
            id: '1',
            navn: 'Hurdal syn- og mestringssenter (ikke godkjent)',
            godkjent: false,
        },
        {
            id: '2',
            navn: 'Solvik syn- og mestringssenter',
            godkjent: true,
        },
        {
            id: '3',
            navn: 'Evenes syn- og mestringssenter',
            godkjent: true,
        },
        {
            id: '4',
            navn: 'Oslo læringssenter',
            godkjent: true,
        },
        {
            id: '5',
            navn: 'Bergen utviklingssenter',
            godkjent: true,
        },
        {
            id: '6',
            navn: 'Trondheim kompetansesenter',
            godkjent: true,
        },
        {
            id: '7',
            navn: 'Stavanger helsesenter',
            godkjent: true,
        },
        {
            id: '8',
            navn: 'Drammen veiledningssenter',
            godkjent: true,
        },
        {
            id: '9',
            navn: 'Kristiansand opplæringssenter',
            godkjent: true,
        },
        {
            id: '10',
            navn: 'Tromsø mestringssenter',
            godkjent: true,
        },
        {
            id: '11',
            navn: 'Sandnes syn- og mestringssenter',
            godkjent: true,
        },
        {
            id: '12',
            navn: 'Ålesund læringssenter',
            godkjent: true,
        },
        {
            id: '13',
            navn: 'Tønsberg utviklingssenter',
            godkjent: true,
        },
        {
            id: '14',
            navn: 'Moss kompetansesenter',
            godkjent: true,
        },
        {
            id: '15',
            navn: 'Bodø helsesenter',
            godkjent: true,
        },
        {
            id: '16',
            navn: 'Arendal veiledningssenter (ikke godkjent)',
            godkjent: false,
        },
        {
            id: '17',
            navn: 'Haugesund opplæringssenter',
            godkjent: true,
        },
        {
            id: '18',
            navn: 'Porsgrunn mestringssenter',
            godkjent: true,
        },
        {
            id: '19',
            navn: 'Hamar syn- og mestringssenter',
            godkjent: true,
        },
        {
            id: '20',
            navn: 'Gjøvik læringssenter',
            godkjent: true,
        },
        {
            id: '21',
            navn: 'Lillehammer utviklingssenter',
            godkjent: true,
        },
        {
            id: '22',
            navn: 'Mo i Rana kompetansesenter',
            godkjent: true,
        },
        {
            id: '23',
            navn: 'Harstad helsesenter',
            godkjent: true,
        },
        {
            id: '24',
            navn: 'Molde veiledningssenter',
            godkjent: true,
        },
        {
            id: '25',
            navn: 'Kongsberg opplæringssenter',
            godkjent: true,
        },
        {
            id: '26',
            navn: 'Horten mestringssenter',
            godkjent: true,
        },
        {
            id: '27',
            navn: 'Lillestrøm syn- og mestringssenter',
            godkjent: true,
        },
        {
            id: '28',
            navn: 'Halden læringssenter',
            godkjent: true,
        },
        {
            id: '29',
            navn: 'Narvik utviklingssenter',
            godkjent: true,
        },
        {
            id: '30',
            navn: 'Alta kompetansesenter',
            godkjent: true,
        },
        {
            id: '31',
            navn: 'Steinkjer helsesenter',
            godkjent: true,
        },
        {
            id: '32',
            navn: 'Elverum veiledningssenter',
            godkjent: true,
        },
        {
            id: '33',
            navn: 'Askøy opplæringssenter',
            godkjent: true,
        },
        {
            id: '34',
            navn: 'Kongsvinger mestringssenter',
            godkjent: true,
        },
        {
            id: '35',
            navn: 'Førde syn- og mestringssenter',
            godkjent: true,
        },
        {
            id: '36',
            navn: 'Ski læringssenter',
            godkjent: true,
        },
        {
            id: '37',
            navn: 'Jessheim utviklingssenter',
            godkjent: true,
        },
        {
            id: '38',
            navn: 'Grimstad kompetansesenter  (ikke godkjent)',
            godkjent: false,
        },
        {
            id: '39',
            navn: 'Larvik helsesenter  (ikke godkjent)',
            godkjent: false,
        },
        {
            id: '40',
            navn: 'Egersund veiledningssenter',
            godkjent: true,
        },
        {
            id: '41',
            navn: 'Namsos opplæringssenter',
            godkjent: true,
        },
        {
            id: '42',
            navn: 'Notodden mestringssenter',
            godkjent: true,
        },
        {
            id: '43',
            navn: 'Røros syn- og mestringssenter',
            godkjent: true,
        },
        {
            id: '44',
            navn: 'Voss læringssenter',
            godkjent: true,
        },
        {
            id: '45',
            navn: 'Flekkefjord utviklingssenter',
            godkjent: true,
        },
        {
            id: '46',
            navn: 'Stjørdal kompetansesenter',
            godkjent: true,
        },
        {
            id: '47',
            navn: 'Verdal helsesenter',
            godkjent: true,
        },
        {
            id: '48',
            navn: 'Svolvær veiledningssenter',
            godkjent: true,
        },
        {
            id: '49',
            navn: 'Fauske opplæringssenter',
            godkjent: true,
        },
        {
            id: '50',
            navn: 'Levanger mestringssenter',
            godkjent: true,
        },
        {
            id: '51',
            navn: 'Brønnøysund syn- og mestringssenter',
            godkjent: true,
        },
        {
            id: '52',
            navn: 'Vadsø læringssenter',
            godkjent: true,
        },
        {
            id: '53',
            navn: 'Hammerfest utviklingssenter',
            godkjent: true,
        },
    ],
};

export const kursholderService = {
    fetch: async (): Promise<Kursholder[]> => {
        try {
            return Promise.resolve(mockKursholder.kursholdere.sort((a, b) => a.navn.localeCompare(b.navn)));
        } catch {
            return Promise.resolve(mockKursholder.kursholdere);
        }
    },
};
