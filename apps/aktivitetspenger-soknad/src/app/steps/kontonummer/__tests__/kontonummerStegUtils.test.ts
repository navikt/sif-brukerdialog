import { YesOrNo } from '@sif/rhf';

import { KontonummerSøknadsdata } from '@app/types/Soknadsdata';

import { toKontonummerFormValues, toKontonummerSøknadsdata } from '../kontonummerStegUtils';

describe('toKontonummerFormValues', () => {
    it('skal mappe kontonummerErRiktig=true til YesOrNo.YES', () => {
        const søknadsdata: KontonummerSøknadsdata = { kontonummerErRiktig: true };

        expect(toKontonummerFormValues(søknadsdata)).toEqual({ kontonummerErRiktig: YesOrNo.YES });
    });

    it('skal mappe kontonummerErRiktig=false til YesOrNo.NO', () => {
        const søknadsdata: KontonummerSøknadsdata = { kontonummerErRiktig: false };

        expect(toKontonummerFormValues(søknadsdata)).toEqual({ kontonummerErRiktig: YesOrNo.NO });
    });

    it('skal returnere tomt objekt når søknadsdata mangler', () => {
        expect(toKontonummerFormValues(undefined)).toEqual({});
    });
});

describe('toKontonummerSøknadsdata', () => {
    it('skal mappe YesOrNo.YES til kontonummerErRiktig=true', () => {
        expect(toKontonummerSøknadsdata({ kontonummerErRiktig: YesOrNo.YES })).toEqual({
            kontonummerErRiktig: true,
        });
    });

    it('skal mappe YesOrNo.NO til kontonummerErRiktig=false', () => {
        expect(toKontonummerSøknadsdata({ kontonummerErRiktig: YesOrNo.NO })).toEqual({
            kontonummerErRiktig: false,
        });
    });

    it('skal mappe ubesvart til kontonummerErRiktig=false', () => {
        expect(toKontonummerSøknadsdata({})).toEqual({ kontonummerErRiktig: false });
    });
});
