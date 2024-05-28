import { RegistrerteBarn } from '../../app/types';

export const barnMock: RegistrerteBarn[] = [
    {
        fornavn: 'ALFABETISK',
        etternavn: 'FAGGOTT',
        aktørId: '2811762539343',
        fødselsdato: new Date('2019-06-08'),
    },
    {
        fødselsdato: new Date('2020-04-20'),
        fornavn: 'Barn',
        mellomnavn: 'Barne',
        etternavn: 'Barnesen',
        aktørId: '123',
    },
    { fødselsdato: new Date('2015-01-02'), fornavn: 'Mock', etternavn: 'Mocknes', aktørId: '2' },
];
