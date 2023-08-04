import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { SelvstendigFormData } from '../../../../types/SelvstendigFormData';
import { cleanupSelvstendigArbeidssituasjon } from '../cleanupArbeidssituasjonStep';

const virksomhet = {} as any;
const arbeidsforhold = {} as any;

const formValues: SelvstendigFormData = {
    harHattInntektSomSN: YesOrNo.YES,
    harFlereVirksomheter: YesOrNo.NO,
    virksomhet,
    arbeidsforhold,
};

describe('cleanupSelvstendigArbeidssituasjon', () => {
    it('er ikke selvstendig næringsdrivende', () => {
        const { harHattInntektSomSN, ...rest } = cleanupSelvstendigArbeidssituasjon({
            ...formValues,
            harHattInntektSomSN: YesOrNo.NO,
        });
        expect(harHattInntektSomSN).toEqual(YesOrNo.NO);
        expect(rest).toEqual({});
    });
    it('er selvstendig næringsdrivende', () => {
        const { harHattInntektSomSN, harFlereVirksomheter, arbeidsforhold, virksomhet, ...rest } =
            cleanupSelvstendigArbeidssituasjon(formValues);
        expect(harHattInntektSomSN).toEqual(YesOrNo.YES);
        expect(harFlereVirksomheter).toEqual(YesOrNo.NO);
        expect(virksomhet).toBeDefined();
        expect(arbeidsforhold).toBeDefined();
        expect(rest).toEqual({});
    });
});
