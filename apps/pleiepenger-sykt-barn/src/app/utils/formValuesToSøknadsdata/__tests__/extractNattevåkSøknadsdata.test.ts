import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { extractNattevåkSøknadsdata } from '../extractNattevåkSøknadsdata';
import { YesOrNoOrDoNotKnow } from '../../../types/YesOrNoOrDoNotKnow';

describe('extractNattevåkSøknadsdata', () => {
    it('returnerer type harNattevåk og harNattevåk === true', () => {
        const result = extractNattevåkSøknadsdata({
            omsorgstilbud: { erIOmsorgstilbudFremtid: YesOrNoOrDoNotKnow.YES },
            harNattevåk: YesOrNo.YES,
            harNattevåk_ekstrainfo: 'Tekst',
        });
        expect(result).toBeDefined();
        expect(result?.harNattevåk).toEqual(true);
        expect(result?.type).toEqual('harNattevåk');
    });

    it('returnerer type harIkkeNattevåk og harNattevåk === false', () => {
        const result = extractNattevåkSøknadsdata({
            omsorgstilbud: { erIOmsorgstilbudFremtid: YesOrNoOrDoNotKnow.YES },
            harNattevåk: YesOrNo.NO,
        });
        expect(result).toBeDefined();
        expect(result?.type).toEqual('harIkkeNattevåk');
    });

    it('returnerer undefined hvis bruker skal ikke svare på beredskap og nattevåk med Omsorgstibud === undefined', () => {
        const result = extractNattevåkSøknadsdata({
            harNattevåk: YesOrNo.YES,
            harNattevåk_ekstrainfo: 'Tekst',
        });
        expect(result).toBeUndefined();
    });

    it('returnerer undefined hvis bruker skal ikke svare på beredskap og nattevåk med Omsorgstibud.erIOmsorgstilbud === NO', () => {
        const result = extractNattevåkSøknadsdata({
            omsorgstilbud: {
                erIOmsorgstilbudFremtid: YesOrNoOrDoNotKnow.NO,
                erIOmsorgstilbudFortid: YesOrNoOrDoNotKnow.NO,
            },
            harNattevåk: YesOrNo.YES,
            harNattevåk_ekstrainfo: 'Tekst',
        });
        expect(result).toBeUndefined();
    });
});
