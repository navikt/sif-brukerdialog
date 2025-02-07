import { RegistrertBarn } from '@navikt/sif-common-api';
import { OmBarnaSøknadsdata } from '../../../types/søknadsdata/OmBarnaSøknadsdata';
import { getOmBarnaApiDataFromSøknadsdata, OmBarnaToApiData } from '../getOmBarnaApiDataFromSøknadsdata';

describe('getOmBarnaApiDataFromSøknadsdata', () => {
    it('should map andreBarn to ApiBarn', () => {
        const omBarna: OmBarnaSøknadsdata = {
            type: 'andreBarn',
            andreBarn: [
                {
                    navn: 'Barn 1',
                    fnr: '01010112345',
                },
                {
                    navn: 'Barn 2',
                    fnr: '02020212345',
                },
            ],
        };

        const expectedOutput: OmBarnaToApiData = {
            barn: [
                {
                    navn: 'Barn 1',
                    aktørId: undefined,
                    norskIdentifikator: '01010112345',
                },
                {
                    navn: 'Barn 2',
                    aktørId: undefined,
                    norskIdentifikator: '02020212345',
                },
            ],
        };

        expect(getOmBarnaApiDataFromSøknadsdata(omBarna, [])).toEqual(expectedOutput);
    });

    it('should map registrertBarn to ApiBarn', () => {
        const omBarna1: OmBarnaSøknadsdata = {
            type: 'andreBarn',
            andreBarn: [],
        };

        const registrertBarn: RegistrertBarn[] = [
            {
                fornavn: 'Barn',
                etternavn: '1',
                mellomnavn: 'Mellomnavn',
                aktørId: '1234567890123',
                fødselsdato: new Date(''),
            },
            {
                fornavn: 'Barn',
                etternavn: '2',
                mellomnavn: '',
                aktørId: '1234567890124',
                fødselsdato: new Date(''),
            },
        ];

        const expectedOutput: OmBarnaToApiData = {
            barn: [
                {
                    navn: 'Barn Mellomnavn 1',
                    aktørId: '1234567890123',
                    norskIdentifikator: undefined,
                },
                {
                    navn: 'Barn 2',
                    aktørId: '1234567890124',
                    norskIdentifikator: undefined,
                },
            ],
        };

        expect(getOmBarnaApiDataFromSøknadsdata(omBarna1, registrertBarn)).toEqual(expectedOutput);
    });

    it('should map both andreBarn and registrertBarn to ApiBarn', () => {
        const omBarna2: OmBarnaSøknadsdata = {
            type: 'andreBarn',
            andreBarn: [
                {
                    navn: 'Barn 1',
                    fnr: '01010112345',
                },
            ],
        };

        const registrertBarn: RegistrertBarn[] = [
            {
                fornavn: 'Barn',
                etternavn: '2',
                mellomnavn: '',
                aktørId: '1234567890124',
                fødselsdato: new Date(''),
            },
        ];

        const expectedOutput: OmBarnaToApiData = {
            barn: [
                {
                    navn: 'Barn 1',
                    aktørId: undefined,
                    norskIdentifikator: '01010112345',
                },
                {
                    navn: 'Barn 2',
                    aktørId: '1234567890124',
                    norskIdentifikator: undefined,
                },
            ],
        };

        expect(getOmBarnaApiDataFromSøknadsdata(omBarna2, registrertBarn)).toEqual(expectedOutput);
    });
});
