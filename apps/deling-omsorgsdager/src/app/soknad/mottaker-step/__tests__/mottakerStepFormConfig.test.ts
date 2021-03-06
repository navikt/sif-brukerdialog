import { MottakerFormQuestions, MottakerFormQuestionsPayload } from '../mottakerStepFormConfig';
import { initialSoknadFormData } from '../../initialSoknadValues';
import { Mottaker, SoknadFormField } from '../../../types/SoknadFormData';
import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';

describe('mottakerStepFormConfig', () => {
    const payload: MottakerFormQuestionsPayload = {
        ...initialSoknadFormData,
    };
    describe('question inclusion', () => {
        it(`${SoknadFormField.gjelderMidlertidigPgaKorona} is included`, () => {
            const vis = MottakerFormQuestions.getVisbility(payload);
            expect(vis.getIncludedQuestions().length).toBe(1);
            expect(vis.isIncluded(SoknadFormField.gjelderMidlertidigPgaKorona)).toBeTruthy();
        });
        it(`Shows ${SoknadFormField.skalDeleMedAndreForelderSamboerEktefelle} when gjelderKorona`, () => {
            const vis = MottakerFormQuestions.getVisbility({ ...payload, gjelderMidlertidigPgaKorona: YesOrNo.YES });
            expect(vis.getIncludedQuestions().length).toBe(2);
            expect(vis.isIncluded(SoknadFormField.skalDeleMedAndreForelderSamboerEktefelle)).toBeTruthy();
        });
        it(`Shows ${SoknadFormField.skalDeleMedAndreForelderSamboerEktefelle} when gjelderKorona === false`, () => {
            const vis = MottakerFormQuestions.getVisbility({ ...payload, gjelderMidlertidigPgaKorona: YesOrNo.NO });
            expect(vis.getIncludedQuestions().length).toBe(2);
            expect(vis.isIncluded(SoknadFormField.skalDeleMedAndreForelderSamboerEktefelle)).toBeFalsy();
        });
        it(`Shows ${SoknadFormField.mottakerType} when gjelderKorona === false && `, () => {
            const vis = MottakerFormQuestions.getVisbility({ ...payload, gjelderMidlertidigPgaKorona: YesOrNo.NO });
            expect(vis.getIncludedQuestions().length).toBe(2);
            expect(vis.isIncluded(SoknadFormField.mottakerType)).toBeTruthy();
        });
        it(`Hides ${SoknadFormField.mottakerType} when gjelderKorona === true && `, () => {
            const vis = MottakerFormQuestions.getVisbility({ ...payload, gjelderMidlertidigPgaKorona: YesOrNo.YES });
            expect(vis.isIncluded(SoknadFormField.mottakerType)).toBeFalsy();
        });
    });
    describe('overf??re questions', () => {
        const delePayload: MottakerFormQuestionsPayload = {
            ...payload,
            gjelderMidlertidigPgaKorona: YesOrNo.NO,
            mottakerType: Mottaker.ektefelle,
            fnrMottaker: '123',
            navnMottaker: 'abc',
            antallDagerSomSkalOverf??res: '2',
        };
        it(`All questions included if answered correctly and mottakerType === ${Mottaker.ektefelle}`, () => {
            const vis = MottakerFormQuestions.getVisbility(delePayload);
            expect(vis.getIncludedQuestions().length).toBe(5);
            expect(vis.isIncluded(SoknadFormField.gjelderMidlertidigPgaKorona)).toBeTruthy();
            expect(vis.isIncluded(SoknadFormField.mottakerType)).toBeTruthy();
            expect(vis.isIncluded(SoknadFormField.fnrMottaker)).toBeTruthy();
            expect(vis.isIncluded(SoknadFormField.navnMottaker)).toBeTruthy();
            expect(vis.isIncluded(SoknadFormField.antallDagerSomSkalOverf??res)).toBeTruthy();
        });
        it(`All questions included if answered correctly and mottakerType === ${Mottaker.samboer}`, () => {
            const vis = MottakerFormQuestions.getVisbility(delePayload);
            expect(vis.getIncludedQuestions().length).toBe(5);
            expect(vis.isIncluded(SoknadFormField.gjelderMidlertidigPgaKorona)).toBeTruthy();
            expect(vis.isIncluded(SoknadFormField.mottakerType)).toBeTruthy();
            expect(vis.isIncluded(SoknadFormField.fnrMottaker)).toBeTruthy();
            expect(vis.isIncluded(SoknadFormField.navnMottaker)).toBeTruthy();
            expect(vis.isIncluded(SoknadFormField.antallDagerSomSkalOverf??res)).toBeTruthy();
        });
    });
    describe('fordele questions', () => {
        const delePayload: MottakerFormQuestionsPayload = {
            ...payload,
            gjelderMidlertidigPgaKorona: YesOrNo.NO,
            mottakerType: Mottaker.samv??rsforelder,
            fnrMottaker: '123',
            navnMottaker: 'abc',
            antallDagerSomSkalOverf??res: '2',
        };
        it(`All questions included if answered correctly`, () => {
            const vis = MottakerFormQuestions.getVisbility(delePayload);
            expect(vis.getIncludedQuestions().length).toBe(4);
            expect(vis.isIncluded(SoknadFormField.gjelderMidlertidigPgaKorona)).toBeTruthy();
            expect(vis.isIncluded(SoknadFormField.mottakerType)).toBeTruthy();
            expect(vis.isIncluded(SoknadFormField.fnrMottaker)).toBeTruthy();
            expect(vis.isIncluded(SoknadFormField.navnMottaker)).toBeTruthy();
            expect(vis.isIncluded(SoknadFormField.antallDagerSomSkalOverf??res)).toBeFalsy();
        });
    });
    describe('korona questions', () => {
        const delePayload: MottakerFormQuestionsPayload = {
            ...payload,
            gjelderMidlertidigPgaKorona: YesOrNo.YES,
            skalDeleMedAndreForelderSamboerEktefelle: YesOrNo.YES,
            fnrMottaker: '123',
            navnMottaker: 'abc',
            antallDagerSomSkalOverf??res: '2',
        };
        it(`All questions included if answered correctly`, () => {
            const vis = MottakerFormQuestions.getVisbility(delePayload);
            expect(vis.getIncludedQuestions().length).toBe(5);
            expect(vis.isIncluded(SoknadFormField.gjelderMidlertidigPgaKorona)).toBeTruthy();
            expect(vis.isIncluded(SoknadFormField.skalDeleMedAndreForelderSamboerEktefelle)).toBeTruthy();
            expect(vis.isIncluded(SoknadFormField.fnrMottaker)).toBeTruthy();
            expect(vis.isIncluded(SoknadFormField.navnMottaker)).toBeTruthy();
            expect(vis.isIncluded(SoknadFormField.antallDagerSomSkalOverf??res)).toBeTruthy();
        });
        it(`It stops if ${SoknadFormField.skalDeleMedAndreForelderSamboerEktefelle} === NO`, () => {
            const vis = MottakerFormQuestions.getVisbility({
                ...delePayload,
                skalDeleMedAndreForelderSamboerEktefelle: YesOrNo.NO,
            });
            expect(vis.getIncludedQuestions().length).toBe(2);
            expect(vis.isIncluded(SoknadFormField.gjelderMidlertidigPgaKorona)).toBeTruthy();
            expect(vis.isIncluded(SoknadFormField.skalDeleMedAndreForelderSamboerEktefelle)).toBeTruthy();
        });
    });
});
