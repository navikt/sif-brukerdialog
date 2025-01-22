import { ArbeidsgiverMedAnsettelseperioder } from '../../app/types/ArbeidsgiverMedAnsettelseperioder';

export const arbeidsgivereMock: ArbeidsgiverMedAnsettelseperioder[] = [
    {
        key: 'a_805824352',
        navn: 'Dykkert svømmeutstyr',
        organisasjonsnummer: '805824352',
        ansettelsesperioder: [{ from: new Date('2008-10-01') }],
    },
    {
        key: 'a_839942907',
        navn: 'Flaks og fly',
        organisasjonsnummer: '839942907',
        ansettelsesperioder: [{ from: new Date('2008-10-01') }],
    },
];
