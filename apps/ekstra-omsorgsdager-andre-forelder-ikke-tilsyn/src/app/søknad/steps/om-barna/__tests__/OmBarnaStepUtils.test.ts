import { Søknadsdata } from '../../../../types/søknadsdata/Søknadsdata';
import { getOmBarnaSøknadsdataFromFormValues, getOmBarnaStepInitialValues } from '../OmBarnaStepUtils';

describe('getOmBarnaStepInitialValues function', () => {
    it('should return default values from  søknadsdata if no formValues are provided', () => {
        const søknadsdata: Søknadsdata = {
            id: '12345',
            omBarna: {
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
            },
        };

        expect(getOmBarnaStepInitialValues(søknadsdata)).toEqual({
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
        });
    });

    it('should return formValues if they are provided', () => {
        const søknadsdata: Søknadsdata = {
            id: '12345',
            omBarna: {
                type: 'andreBarn',
                andreBarn: [
                    {
                        navn: 'Barn 1',
                        fnr: '01010112345',
                    },
                ],
            },
        };
        const formValues = {
            andreBarn: [
                {
                    navn: 'Barn 1',
                    fnr: '01010112345',
                },
            ],
        };

        expect(getOmBarnaStepInitialValues(søknadsdata, formValues)).toEqual({
            andreBarn: [
                {
                    navn: 'Barn 1',
                    fnr: '01010112345',
                },
            ],
        });
    });

    it('should return default values if omBarna in søknadsdata is not provided', () => {
        const søknadsdata = { id: '12345' };

        expect(getOmBarnaStepInitialValues(søknadsdata)).toEqual({
            andreBarn: [],
        });
    });
});

describe('getOmBarnaSøknadsdataFromFormValues function', () => {
    it('should return OmBarnaSøknadsdata based on provided values', () => {
        const values = {
            andreBarn: [
                {
                    fnr: '12345678901',
                    navn: 'John',
                },
                {
                    fnr: '23456789012',
                    navn: 'Jane',
                },
            ],
        };

        expect(getOmBarnaSøknadsdataFromFormValues(values)).toEqual({
            type: 'andreBarn',
            andreBarn: [
                {
                    fnr: '12345678901',
                    navn: 'John',
                },
                {
                    fnr: '23456789012',
                    navn: 'Jane',
                },
            ],
        });
    });
});
