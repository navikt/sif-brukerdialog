import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { extractNattevåkOgBeredskapFormValues } from '../extractNattevåkOgBeredskapFormValues';

describe('extractNattevåkOgBeredskapFormValues', () => {
    it('returnerer riktig når det er nattevåk og beredskap', () => {
        const result = extractNattevåkOgBeredskapFormValues({
            nattevåk: { harNattevåk: true, tilleggsinformasjon: 'nattevåk' },
            beredskap: { beredskap: true, tilleggsinformasjon: 'beredskap' },
        });
        expect(result.harBeredskap).toEqual(YesOrNo.YES);
        expect(result.harNattevåk).toEqual(YesOrNo.YES);
        expect(result.harBeredskap_ekstrainfo).toEqual('beredskap');
        expect(result.harNattevåk_ekstrainfo).toEqual('nattevåk');
    });
    it('returnerer riktig når det ikke er nattevåk og beredskap', () => {
        const result = extractNattevåkOgBeredskapFormValues({
            nattevåk: { harNattevåk: false },
            beredskap: { beredskap: false },
        });
        expect(result.harBeredskap).toEqual(YesOrNo.NO);
        expect(result.harNattevåk).toEqual(YesOrNo.NO);
        expect(result.harBeredskap_ekstrainfo).toBeUndefined();
        expect(result.harNattevåk_ekstrainfo).toBeUndefined();
    });
    it('returnerer riktig når nattevåk og beredskap er undefined', () => {
        const result = extractNattevåkOgBeredskapFormValues({});
        expect(result.harBeredskap).toEqual(YesOrNo.NO);
        expect(result.harNattevåk).toEqual(YesOrNo.NO);
    });
});
