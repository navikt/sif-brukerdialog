import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { vi } from 'vitest';
import { SelvstendigFormValues } from '../../../../types/søknad-form-values/SelvstendigFormValues';
import { cleanupSelvstendigArbeidssituasjon } from '../cleanupArbeidssituasjonStep';

const virksomhet = {} as any;
const arbeidsforhold = {} as any;

const formValues: SelvstendigFormValues = {
    harHattInntektSomSN: YesOrNo.YES,
    harFlereVirksomheter: YesOrNo.NO,
    virksomhet,
    arbeidsforhold,
};

vi.mock('@navikt/sif-common-env', () => {
    return { getRequiredEnv: () => '', getCommonEnv: () => {}, getEnv: () => '' };
});

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
        const {
            harHattInntektSomSN,
            harFlereVirksomheter,
            arbeidsforhold: a,
            virksomhet: v,
            ...rest
        } = cleanupSelvstendigArbeidssituasjon(formValues);
        expect(harHattInntektSomSN).toEqual(YesOrNo.YES);
        expect(harFlereVirksomheter).toEqual(YesOrNo.NO);
        expect(a).toBeDefined();
        expect(v).toBeDefined();
        expect(rest).toEqual({});
    });
});
