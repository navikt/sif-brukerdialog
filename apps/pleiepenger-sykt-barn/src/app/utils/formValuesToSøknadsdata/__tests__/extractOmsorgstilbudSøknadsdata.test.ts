import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { OmsorgstilbudFormValues } from '../../../types/søknad-form-values/OmsorgtilbudFormValues';
import { YesOrNoOrDoNotKnow } from '../../../types/YesOrNoOrDoNotKnow';
import { extractOmsorgstibudSøknadsdata } from '../extractOmsorgstibudSøknadsdata';

const omsorgstilbud: OmsorgstilbudFormValues = {
    erIOmsorgstilbudFortid: YesOrNoOrDoNotKnow.YES,
    enkeltdager: { '2021-02-01': { hours: '1', minutes: '0' } },
    erLiktHverUke: YesOrNo.NO,
};

describe('extractOmsorgstibudSøknadsdata', () => {
    it('returnerer erIOmsorgstilbudEnkeltDager dersom erLiktHverUke === NO,', () => {
        const result = extractOmsorgstibudSøknadsdata(omsorgstilbud);
        expect(result).toBeDefined();
        expect(result?.type).toEqual('erIOmsorgstilbudEnkeltDager');
    });

    it('returnerer erIOmsorgstilbudFasteDager dersom erLiktHverUke === NO,', () => {
        const result = extractOmsorgstibudSøknadsdata({
            ...omsorgstilbud,
            fasteDager: {
                friday: { hours: '1', minutes: '0' },
            },
            enkeltdager: undefined,
            erLiktHverUke: YesOrNo.YES,
        });
        expect(result).toBeDefined();
        expect(result?.type).toEqual('erIOmsorgstilbudFasteDager');
    });

    it('returnerer undefined dersom erIOmsorgstilbud === NO', () => {
        const result = extractOmsorgstibudSøknadsdata({
            ...omsorgstilbud,
            erIOmsorgstilbudFortid: YesOrNoOrDoNotKnow.NO,
        });
        expect(result).toBeUndefined();
    });

    it('returnerer undefined dersom omsorgstilbud er undefined', () => {
        const result = extractOmsorgstibudSøknadsdata(undefined);
        expect(result).toBeUndefined();
    });
});
