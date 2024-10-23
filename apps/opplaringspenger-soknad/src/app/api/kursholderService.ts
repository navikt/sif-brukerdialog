import { Kursholder } from '../types/Kursholder';

const mockKursholder = {
    kursholdere: [
        {
            id: '1',
            navn: 'Hurdal syn- og mestringssenter',
        },
        {
            id: '2',
            navn: 'Solvik syn- og mestringssenter',
        },
        {
            id: '3',
            navn: 'Evenes syn- og mestringssenter',
        },
        {
            id: '4',
            navn: 'Oslo læringssenter',
        },
        {
            id: '5',
            navn: 'Bergen utviklingssenter',
        },
        {
            id: '6',
            navn: 'Trondheim kompetansesenter',
        },
        {
            id: '7',
            navn: 'Stavanger helsesenter',
        },
        {
            id: '8',
            navn: 'Drammen veiledningssenter',
        },
        {
            id: '9',
            navn: 'Kristiansand opplæringssenter',
        },
        {
            id: '10',
            navn: 'Tromsø mestringssenter',
        },
        {
            id: '11',
            navn: 'Sandnes syn- og mestringssenter',
        },
        {
            id: '12',
            navn: 'Ålesund læringssenter',
        },
        {
            id: '13',
            navn: 'Tønsberg utviklingssenter',
        },
        {
            id: '14',
            navn: 'Moss kompetansesenter',
        },
        {
            id: '15',
            navn: 'Bodø helsesenter',
        },
        {
            id: '16',
            navn: 'Arendal veiledningssenter',
        },
        {
            id: '17',
            navn: 'Haugesund opplæringssenter',
        },
        {
            id: '18',
            navn: 'Porsgrunn mestringssenter',
        },
        {
            id: '19',
            navn: 'Hamar syn- og mestringssenter',
        },
        {
            id: '20',
            navn: 'Gjøvik læringssenter',
        },
        {
            id: '21',
            navn: 'Lillehammer utviklingssenter',
        },
        {
            id: '22',
            navn: 'Mo i Rana kompetansesenter',
        },
        {
            id: '23',
            navn: 'Harstad helsesenter',
        },
        {
            id: '24',
            navn: 'Molde veiledningssenter',
        },
        {
            id: '25',
            navn: 'Kongsberg opplæringssenter',
        },
        {
            id: '26',
            navn: 'Horten mestringssenter',
        },
        {
            id: '27',
            navn: 'Lillestrøm syn- og mestringssenter',
        },
        {
            id: '28',
            navn: 'Halden læringssenter',
        },
        {
            id: '29',
            navn: 'Narvik utviklingssenter',
        },
        {
            id: '30',
            navn: 'Alta kompetansesenter',
        },
        {
            id: '31',
            navn: 'Steinkjer helsesenter',
        },
        {
            id: '32',
            navn: 'Elverum veiledningssenter',
        },
        {
            id: '33',
            navn: 'Askøy opplæringssenter',
        },
        {
            id: '34',
            navn: 'Kongsvinger mestringssenter',
        },
        {
            id: '35',
            navn: 'Førde syn- og mestringssenter',
        },
        {
            id: '36',
            navn: 'Ski læringssenter',
        },
        {
            id: '37',
            navn: 'Jessheim utviklingssenter',
        },
        {
            id: '38',
            navn: 'Grimstad kompetansesenter',
        },
        {
            id: '39',
            navn: 'Larvik helsesenter',
        },
        {
            id: '40',
            navn: 'Egersund veiledningssenter',
        },
        {
            id: '41',
            navn: 'Namsos opplæringssenter',
        },
        {
            id: '42',
            navn: 'Notodden mestringssenter',
        },
        {
            id: '43',
            navn: 'Røros syn- og mestringssenter',
        },
        {
            id: '44',
            navn: 'Voss læringssenter',
        },
        {
            id: '45',
            navn: 'Flekkefjord utviklingssenter',
        },
        {
            id: '46',
            navn: 'Stjørdal kompetansesenter',
        },
        {
            id: '47',
            navn: 'Verdal helsesenter',
        },
        {
            id: '48',
            navn: 'Svolvær veiledningssenter',
        },
        {
            id: '49',
            navn: 'Fauske opplæringssenter',
        },
        {
            id: '50',
            navn: 'Levanger mestringssenter',
        },
        {
            id: '51',
            navn: 'Brønnøysund syn- og mestringssenter',
        },
        {
            id: '52',
            navn: 'Vadsø læringssenter',
        },
        {
            id: '53',
            navn: 'Hammerfest utviklingssenter',
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
