import { RegistrertBarn } from '@navikt/sif-common-api';
import { ISODateToDate } from '@navikt/sif-common-utils';

export const registrerteBarnMock: RegistrertBarn[] = [
    {
        aktørId: '2488457354096',
        etternavn: 'EPLEKAKE',
        fornavn: 'REALISTISK',
        fødselsdato: ISODateToDate('2015-05-22'),
    },
    {
        aktørId: '2600764688928',
        etternavn: 'JUBILANT',
        fornavn: 'FIRKANTET',
        fødselsdato: ISODateToDate('2020-05-28'),
    },
    {
        aktørId: '2462355701768',
        etternavn: 'KUBBESTOL',
        fornavn: 'PLUTSELIG',
        fødselsdato: ISODateToDate('2016-07-23'),
    },
];
