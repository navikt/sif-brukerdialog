import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { getYesOrNoFromBoolean, yesOrNoIsAnswered } from '../yesOrNoUtils';

describe('yesOrNoUtils', () => {
    describe('yesOrNoIsAnswered', () => {
        it(`returnerer false når svar = ${YesOrNo.UNANSWERED}`, () => {
            expect(yesOrNoIsAnswered(YesOrNo.UNANSWERED)).toBeFalsy();
        });
        it(`returnerer false når svar = undefined`, () => {
            expect(yesOrNoIsAnswered()).toBeFalsy();
        });
        it(`returnerer true når svar = ${YesOrNo.YES}`, () => {
            expect(yesOrNoIsAnswered(YesOrNo.YES)).toBeTruthy();
        });
        it(`returnerer true når svar = ${YesOrNo.NO}`, () => {
            expect(yesOrNoIsAnswered(YesOrNo.NO)).toBeTruthy();
        });
    });

    describe('getYesOrNoFromBoolean', () => {
        it(`returnerer ${YesOrNo.UNANSWERED} når bool er undefined`, () => {
            expect(getYesOrNoFromBoolean()).toEqual(YesOrNo.UNANSWERED);
        });
        it(`returnerer ${YesOrNo.YES} når bool er true`, () => {
            expect(getYesOrNoFromBoolean(true)).toEqual(YesOrNo.YES);
        });
        it(`returnerer ${YesOrNo.NO} når bool er false`, () => {
            expect(getYesOrNoFromBoolean(false)).toEqual(YesOrNo.NO);
        });
    });
});
