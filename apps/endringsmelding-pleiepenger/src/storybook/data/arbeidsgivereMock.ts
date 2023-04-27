import { Arbeidsgiver, ArbeidsgiverType } from '../../app/types/Arbeidsgiver';

export const arbeidsgivereMock: Arbeidsgiver[] = [
    {
        type: ArbeidsgiverType.ORGANISASJON,
        navn: 'Dykkert svømmeutstyr',
        organisasjonsnummer: '805824352',
        ansattFom: new Date('2008-10-01'),
    },
    {
        type: ArbeidsgiverType.ORGANISASJON,
        navn: 'Flaks og fly',
        organisasjonsnummer: '839942907',
        ansattFom: new Date('2008-10-01'),
    },
];
