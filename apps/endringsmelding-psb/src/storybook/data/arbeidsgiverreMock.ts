import { Arbeidsgiver, ArbeidsgiverType } from '../../app/types/Arbeidsgiver';

export const arbeidsgivereMock: Arbeidsgiver[] = [
    {
        type: ArbeidsgiverType.ORGANISASJON,
        navn: 'Dykkert svømmeutstyr',
        id: '805824352',
        ansattFom: new Date('2008-10-01'),
    },
    { type: ArbeidsgiverType.ORGANISASJON, navn: 'Flaks og fly', id: '839942907', ansattFom: new Date('2008-10-01') },
];
