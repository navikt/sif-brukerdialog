import { YesOrNo } from '@sif/rhf';

import { BarnSøknadsdata } from '@app/types/Soknadsdata';

import { toBarnFormValues, toBarnSøknadsdata } from '../barnStegUtils';

describe('toBarnFormValues', () => {
    it('skal mappe informasjonStemmer=true til YesOrNo.YES', () => {
        const søknadsdata: BarnSøknadsdata = { informasjonStemmer: true };

        expect(toBarnFormValues(søknadsdata)).toEqual({ informasjonStemmer: YesOrNo.YES });
    });

    it('skal mappe informasjonStemmer=false til YesOrNo.NO', () => {
        const søknadsdata: BarnSøknadsdata = { informasjonStemmer: false };

        expect(toBarnFormValues(søknadsdata)).toEqual({ informasjonStemmer: YesOrNo.NO });
    });

    it('skal returnere tomt objekt når søknadsdata mangler', () => {
        expect(toBarnFormValues(undefined)).toEqual({});
    });
});

describe('toBarnSøknadsdata', () => {
    it('skal mappe YesOrNo.YES til informasjonStemmer=true', () => {
        expect(toBarnSøknadsdata({ informasjonStemmer: YesOrNo.YES })).toEqual({ informasjonStemmer: true });
    });

    it('skal mappe YesOrNo.NO til informasjonStemmer=false', () => {
        expect(toBarnSøknadsdata({ informasjonStemmer: YesOrNo.NO })).toEqual({ informasjonStemmer: false });
    });

    it('skal mappe ubesvart til informasjonStemmer=false', () => {
        expect(toBarnSøknadsdata({})).toEqual({ informasjonStemmer: false });
    });
});
