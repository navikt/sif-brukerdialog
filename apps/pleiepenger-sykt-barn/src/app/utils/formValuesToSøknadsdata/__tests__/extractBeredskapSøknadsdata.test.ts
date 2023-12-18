import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { extractBeredskapSøknadsdata } from '../extractBeredskapSøknadsdata';
import { YesOrNoOrDoNotKnow } from '../../../types/YesOrNoOrDoNotKnow';

describe('extractBeredskapSøknadsdata', () => {
    it('returnerer type harBeredskap og harBeredskap === true', () => {
        const result = extractBeredskapSøknadsdata({
            omsorgstilbud: { erIOmsorgstilbudFremtid: YesOrNoOrDoNotKnow.YES },
            harBeredskap: YesOrNo.YES,
            harBeredskap_ekstrainfo: 'Tekst',
        });
        expect(result).toBeDefined();
        expect(result?.harBeredskap).toEqual(true);
        expect(result?.type).toEqual('harBeredskap');
    });

    it('returnerer type harIkkeBeredskap og harBeredskap === false', () => {
        const result = extractBeredskapSøknadsdata({
            omsorgstilbud: { erIOmsorgstilbudFremtid: YesOrNoOrDoNotKnow.YES },
            harBeredskap: YesOrNo.NO,
        });
        expect(result).toBeDefined();
        expect(result?.type).toEqual('harIkkeBeredskap');
    });

    it('returnerer undefined hvis bruker skal ikke svare på beredskap og nattevåk med Omsorgstibud === undefined', () => {
        const result = extractBeredskapSøknadsdata({
            harBeredskap: YesOrNo.YES,
            harBeredskap_ekstrainfo: 'Tekst',
        });
        expect(result).toBeUndefined();
    });

    it('returnerer undefined hvis bruker skal ikke svare på beredskap og nattevåk med Omsorgstibud.erIOmsorgstilbud === NO', () => {
        const result = extractBeredskapSøknadsdata({
            omsorgstilbud: {
                erIOmsorgstilbudFremtid: YesOrNoOrDoNotKnow.NO,
                erIOmsorgstilbudFortid: YesOrNoOrDoNotKnow.NO,
            },
            harBeredskap: YesOrNo.YES,
            harBeredskap_ekstrainfo: 'Tekst',
        });
        expect(result).toBeUndefined();
    });
});
