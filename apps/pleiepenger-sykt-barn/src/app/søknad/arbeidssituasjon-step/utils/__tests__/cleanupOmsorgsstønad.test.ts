import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { vi } from 'vitest';

import { OmsorgsstønadFormValues } from '../../../../types/søknad-form-values/OmsorgsstønadFormValues';
import { cleanupOmsorgsstønad } from '../cleanupOmsorgsstønad';

const ISOStartdato = '2021-01-01';
const ISOSluttdato = '2022-01-01';

const formValues: OmsorgsstønadFormValues = {
    mottarOmsorgsstønad: YesOrNo.YES,
    mottarOmsorgsstønadIHelePerioden: YesOrNo.NO,
    startdato: ISOStartdato,
    sluttdato: ISOSluttdato,
    slutterUnderveis: YesOrNo.YES,
    starterUndeveis: YesOrNo.YES,
    antallTimer: '10',
};

vi.mock('@navikt/sif-common-env', () => {
    return { getRequiredEnv: () => '', getCommonEnv: () => ({}), getMaybeEnv: () => '' };
});

describe('cleanupOmsorgsstønad', () => {
    it('mottar ikke omsorgsstønad', () => {
        const { mottarOmsorgsstønad, ...rest } = cleanupOmsorgsstønad({
            ...formValues,
            mottarOmsorgsstønad: YesOrNo.NO,
        });
        expect(mottarOmsorgsstønad).toEqual(YesOrNo.NO);
        expect(rest).toEqual({});
    });
    describe('mottar omsorgsstønad', () => {
        it('mottar hele perioden', () => {
            const { mottarOmsorgsstønad, mottarOmsorgsstønadIHelePerioden, antallTimer, ...rest } =
                cleanupOmsorgsstønad({
                    ...formValues,
                    mottarOmsorgsstønadIHelePerioden: YesOrNo.YES,
                });
            expect(mottarOmsorgsstønad).toEqual(YesOrNo.YES);
            expect(mottarOmsorgsstønadIHelePerioden).toEqual(YesOrNo.YES);
            expect(antallTimer).toEqual('10');
            expect(rest).toEqual({});
        });
        it('starter i perioden', () => {
            const {
                mottarOmsorgsstønad,
                mottarOmsorgsstønadIHelePerioden,
                starterUndeveis,
                slutterUnderveis,
                startdato,
                antallTimer,
                ...rest
            } = cleanupOmsorgsstønad({
                ...formValues,
                mottarOmsorgsstønadIHelePerioden: YesOrNo.NO,
                starterUndeveis: YesOrNo.YES,
                slutterUnderveis: YesOrNo.NO,
            });
            expect(mottarOmsorgsstønad).toEqual(YesOrNo.YES);
            expect(mottarOmsorgsstønadIHelePerioden).toEqual(YesOrNo.NO);
            expect(starterUndeveis).toEqual(YesOrNo.YES);
            expect(slutterUnderveis).toEqual(YesOrNo.NO);
            expect(startdato).toEqual(ISOStartdato);
            expect(antallTimer).toEqual('10');
            expect(rest).toEqual({});
        });
        it('slutter i perioden', () => {
            const {
                mottarOmsorgsstønad,
                mottarOmsorgsstønadIHelePerioden,
                sluttdato,
                slutterUnderveis,
                starterUndeveis,
                antallTimer,
                ...rest
            } = cleanupOmsorgsstønad({
                ...formValues,
                mottarOmsorgsstønadIHelePerioden: YesOrNo.NO,
                starterUndeveis: YesOrNo.NO,
                slutterUnderveis: YesOrNo.YES,
            });
            expect(mottarOmsorgsstønad).toEqual(YesOrNo.YES);
            expect(mottarOmsorgsstønadIHelePerioden).toEqual(YesOrNo.NO);
            expect(starterUndeveis).toEqual(YesOrNo.NO);
            expect(slutterUnderveis).toEqual(YesOrNo.YES);
            expect(sluttdato).toEqual(ISOSluttdato);
            expect(antallTimer).toEqual('10');
            expect(rest).toEqual({});
        });
        it('starter og slutter i perioden', () => {
            const {
                mottarOmsorgsstønad,
                mottarOmsorgsstønadIHelePerioden,
                sluttdato,
                startdato,
                slutterUnderveis,
                starterUndeveis,
                antallTimer,
                ...rest
            } = cleanupOmsorgsstønad({
                ...formValues,
                mottarOmsorgsstønadIHelePerioden: YesOrNo.NO,
                starterUndeveis: YesOrNo.YES,
                slutterUnderveis: YesOrNo.YES,
            });
            expect(mottarOmsorgsstønad).toEqual(YesOrNo.YES);
            expect(mottarOmsorgsstønadIHelePerioden).toEqual(YesOrNo.NO);
            expect(starterUndeveis).toEqual(YesOrNo.YES);
            expect(slutterUnderveis).toEqual(YesOrNo.YES);
            expect(startdato).toEqual(ISOStartdato);
            expect(sluttdato).toEqual(ISOSluttdato);
            expect(antallTimer).toEqual('10');
            expect(rest).toEqual({});
        });
    });
});
