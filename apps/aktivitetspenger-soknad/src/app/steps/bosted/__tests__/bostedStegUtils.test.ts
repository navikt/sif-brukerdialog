import { YesOrNo } from '@sif/rhf';

import { BostedSøknadsdata } from '../../../types/Soknadsdata';

import { toBostedFormValues, toBostedSøknadsdata } from '../bostedStegUtils';

describe('toBostedFormValues', () => {
    it('skal mappe erBosattITrondheim=true til YesOrNo.YES', () => {
        const søknadsdata: BostedSøknadsdata = { erBosattITrondheim: true };

        expect(toBostedFormValues(søknadsdata)).toEqual({ erBosattITrondheim: YesOrNo.YES });
    });

    it('skal mappe erBosattITrondheim=false til YesOrNo.NO', () => {
        const søknadsdata: BostedSøknadsdata = { erBosattITrondheim: false };

        expect(toBostedFormValues(søknadsdata)).toEqual({ erBosattITrondheim: YesOrNo.NO });
    });

    it('skal returnere tomt objekt når søknadsdata mangler', () => {
        expect(toBostedFormValues(undefined)).toEqual({});
    });
});

describe('toBostedSøknadsdata', () => {
    it('skal mappe YesOrNo.YES til erBosattITrondheim=true', () => {
        expect(toBostedSøknadsdata({ erBosattITrondheim: YesOrNo.YES })).toEqual({ erBosattITrondheim: true });
    });

    it('skal mappe YesOrNo.NO til erBosattITrondheim=false', () => {
        expect(toBostedSøknadsdata({ erBosattITrondheim: YesOrNo.NO })).toEqual({ erBosattITrondheim: false });
    });

    it('skal mappe ubesvart til erBosattITrondheim=false', () => {
        expect(toBostedSøknadsdata({})).toEqual({ erBosattITrondheim: false });
    });
});
