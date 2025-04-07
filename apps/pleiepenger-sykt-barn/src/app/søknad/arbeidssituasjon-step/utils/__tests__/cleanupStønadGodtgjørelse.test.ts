import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { StønadGodtgjørelseFormValues } from '../../../../types/søknad-form-values/StønadGodtgjørelseFormValues';
import { cleanupStønadGodtgjørelse } from '../cleanupArbeidssituasjonStep';
import { vi } from 'vitest';

const ISOStartdato = '2021-01-01';
const ISOSluttdato = '2022-01-01';

const formValues: StønadGodtgjørelseFormValues = {
    mottarOmsorgsstønad: YesOrNo.YES,
    mottarStønadGodtgjørelseIHelePerioden: YesOrNo.NO,
    startdato: ISOStartdato,
    sluttdato: ISOSluttdato,
    slutterUnderveis: YesOrNo.YES,
    starterUndeveis: YesOrNo.YES,
};

vi.mock('@navikt/sif-common-env', () => {
    return { getRequiredEnv: () => '', getCommonEnv: () => ({}), getMaybeEnv: () => '' };
});

describe('cleanupStønadGodtgjørelse', () => {
    it('mottar ikke omsorgsstønad eller fosterhjemsgodgjørelse', () => {
        const { mottarOmsorgsstønad, ...rest } = cleanupStønadGodtgjørelse({
            ...formValues,
            mottarOmsorgsstønad: YesOrNo.NO,
        });
        expect(mottarOmsorgsstønad).toEqual(YesOrNo.NO);
        expect(rest).toEqual({});
    });
    describe('mottar omsorgsstønad eller fosterhjemsgodgjørelse', () => {
        it('mottar hele perioden', () => {
            const { mottarOmsorgsstønad, mottarStønadGodtgjørelseIHelePerioden, ...rest } = cleanupStønadGodtgjørelse({
                ...formValues,
                mottarStønadGodtgjørelseIHelePerioden: YesOrNo.YES,
            });
            expect(mottarOmsorgsstønad).toEqual(YesOrNo.YES);
            expect(mottarStønadGodtgjørelseIHelePerioden).toEqual(YesOrNo.YES);
            expect(rest).toEqual({});
        });
        it('starter i perioden', () => {
            const {
                mottarOmsorgsstønad,
                mottarStønadGodtgjørelseIHelePerioden,
                starterUndeveis,
                slutterUnderveis,
                startdato,
                ...rest
            } = cleanupStønadGodtgjørelse({
                ...formValues,
                mottarStønadGodtgjørelseIHelePerioden: YesOrNo.NO,
                starterUndeveis: YesOrNo.YES,
                slutterUnderveis: YesOrNo.NO,
            });
            expect(mottarOmsorgsstønad).toEqual(YesOrNo.YES);
            expect(mottarStønadGodtgjørelseIHelePerioden).toEqual(YesOrNo.NO);
            expect(starterUndeveis).toEqual(YesOrNo.YES);
            expect(slutterUnderveis).toEqual(YesOrNo.NO);
            expect(startdato).toEqual(ISOStartdato);
            expect(rest).toEqual({});
        });
        it('slutter i perioden', () => {
            const {
                mottarOmsorgsstønad,
                mottarStønadGodtgjørelseIHelePerioden,
                sluttdato,
                slutterUnderveis,
                starterUndeveis,
                ...rest
            } = cleanupStønadGodtgjørelse({
                ...formValues,
                mottarStønadGodtgjørelseIHelePerioden: YesOrNo.NO,
                starterUndeveis: YesOrNo.NO,
                slutterUnderveis: YesOrNo.YES,
            });
            expect(mottarOmsorgsstønad).toEqual(YesOrNo.YES);
            expect(mottarStønadGodtgjørelseIHelePerioden).toEqual(YesOrNo.NO);
            expect(starterUndeveis).toEqual(YesOrNo.NO);
            expect(slutterUnderveis).toEqual(YesOrNo.YES);
            expect(sluttdato).toEqual(ISOSluttdato);
            expect(rest).toEqual({});
        });
        it('starter og slutter i perioden', () => {
            const {
                mottarOmsorgsstønad,
                mottarStønadGodtgjørelseIHelePerioden,
                sluttdato,
                startdato,
                slutterUnderveis,
                starterUndeveis,
                ...rest
            } = cleanupStønadGodtgjørelse({
                ...formValues,
                mottarStønadGodtgjørelseIHelePerioden: YesOrNo.NO,
                starterUndeveis: YesOrNo.YES,
                slutterUnderveis: YesOrNo.YES,
            });
            expect(mottarOmsorgsstønad).toEqual(YesOrNo.YES);
            expect(mottarStønadGodtgjørelseIHelePerioden).toEqual(YesOrNo.NO);
            expect(starterUndeveis).toEqual(YesOrNo.YES);
            expect(slutterUnderveis).toEqual(YesOrNo.YES);
            expect(startdato).toEqual(ISOStartdato);
            expect(sluttdato).toEqual(ISOSluttdato);
            expect(rest).toEqual({});
        });
    });
});
