import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { ISODateToDate, dateToISODate } from '@navikt/sif-common-utils';
import { barnMockData } from '../../../../../test-mock-data/barn';
import {
    getAlderILøpetAvÅr,
    getBarnAlderInfo,
    getDineBarnScenario,
    getHarUtvidetRett,
    getMåDekkeFørsteTiDagerSelv,
    kanFortsetteFraDineBarnStep,
    nYearsAgo,
} from '../dineBarnStepUtils';
import { DineBarnScenario } from '../../../../types/DineBarnScenario';

const {
    ettBarnOver13,
    ettBarnUnder13,
    toBarnUnder13,
    treBarnOver13,
    treBarnUnder13,
    toBarnUnderOgEttBarnOver,
    treBarnUnderOgEttBarnOver,
} = barnMockData;

describe('dineBarnStepUtils', () => {
    describe('nYearsAgo', () => {
        it('trekker fra riktig og returnerer første januar det året', () => {
            const thisYear = new Date().getFullYear();
            expect(dateToISODate(nYearsAgo(2))).toEqual(`${thisYear - 2}-01-01`);
            expect(dateToISODate(nYearsAgo(1))).toEqual(`${thisYear - 1}-01-01`);
            expect(dateToISODate(nYearsAgo(5))).toEqual(`${thisYear - 5}-01-01`);
        });
    });

    describe('getAlderILøpetAvÅr', () => {
        it('født år 1.1.2001, blir 12 i år 2012', () => {
            const result = getAlderILøpetAvÅr(2012, ISODateToDate('2001-01-01'));
            expect(result).toEqual(11);
        });
        it('født år 31.12.2001, blir 12 i år 2012', () => {
            const result = getAlderILøpetAvÅr(2012, ISODateToDate('2001-12-31'));
            expect(result).toEqual(11);
        });
        it('født år 1.1.2000, blir 12 i år 2012', () => {
            const result = getAlderILøpetAvÅr(2012, ISODateToDate('2000-01-01'));
            expect(result).toEqual(12);
        });
        it('født år 31.12.1999, blir 13 i år 2012', () => {
            const result = getAlderILøpetAvÅr(2012, ISODateToDate('1999-12-31'));
            expect(result).toEqual(13);
        });
        it('født år 31.12.1998, blir 14 i år 2012', () => {
            const result = getAlderILøpetAvÅr(2012, ISODateToDate('1998-12-31'));
            expect(result).toEqual(14);
        });
    });

    describe('getBarnAlderInfo', () => {
        it('returnerer riktig når en har ett barn under 13', () => {
            const result = getBarnAlderInfo(ettBarnUnder13);
            expect(result.under13).toEqual(1);
            expect(result.over13).toEqual(0);
            expect(result.kunBarnOver13).toBeFalsy();
            expect(result.kunBarnUnder13).toBeTruthy();
            expect(result.totalt).toEqual(1);
        });
        it('returnerer riktig når en har to barn under 13 og ett barn over 13', () => {
            const result = getBarnAlderInfo(toBarnUnderOgEttBarnOver);
            expect(result.under13).toEqual(2);
            expect(result.over13).toEqual(1);
            expect(result.kunBarnOver13).toBeFalsy();
            expect(result.kunBarnUnder13).toBeFalsy();
            expect(result.totalt).toEqual(3);
        });
        it('returnerer riktig når en har tre barn over 13', () => {
            const result = getBarnAlderInfo(treBarnOver13);
            expect(result.under13).toEqual(0);
            expect(result.over13).toEqual(3);
            expect(result.kunBarnOver13).toBeTruthy();
            expect(result.kunBarnUnder13).toBeFalsy();
            expect(result.totalt).toEqual(3);
        });
    });

    describe('getDineBarnScenario', () => {
        it(`returnerer ${DineBarnScenario.ETT_ELLER_TO_UNDER_13} når en har ett barn under 13`, () => {
            const result = getDineBarnScenario(ettBarnUnder13);
            expect(result).toEqual(DineBarnScenario.ETT_ELLER_TO_UNDER_13);
        });
        it(`returnerer ${DineBarnScenario.ETT_ELLER_TO_UNDER_13} når en har to barn under 13`, () => {
            const result = getDineBarnScenario(toBarnUnder13);
            expect(result).toEqual(DineBarnScenario.ETT_ELLER_TO_UNDER_13);
        });
        it(`returnerer ${DineBarnScenario.ETT_ELLER_TO_UNDER_13} når en har to barn under 13 og ett barn over 13`, () => {
            const result = getDineBarnScenario(toBarnUnderOgEttBarnOver);
            expect(result).toEqual(DineBarnScenario.ETT_ELLER_TO_UNDER_13);
        });
        it(`returnerer ${DineBarnScenario.KUN_OVER_13} når en har tre barn over 13`, () => {
            const result = getDineBarnScenario(treBarnOver13);
            expect(result).toEqual(DineBarnScenario.KUN_OVER_13);
        });
        it(`returnerer ${DineBarnScenario.TRE_ELLER_FLERE_UNDER_13} når en har tre barn under 13`, () => {
            const result = getDineBarnScenario(treBarnUnder13);
            expect(result).toEqual(DineBarnScenario.TRE_ELLER_FLERE_UNDER_13);
        });
        it(`returnerer ${DineBarnScenario.TRE_ELLER_FLERE_UNDER_13} når en har tre barn under 13 og tre barn over 13`, () => {
            const result = getDineBarnScenario([...treBarnUnder13, ...treBarnOver13]);
            expect(result).toEqual(DineBarnScenario.TRE_ELLER_FLERE_UNDER_13);
        });
    });

    describe('getHarUtvidetRett', () => {
        describe('har ikke utvidet rett', () => {
            it('når en har to eller færre barn og ikke har kronisk/langvarig sykdom eller aleneomsorg', () => {
                expect(getHarUtvidetRett(ettBarnUnder13, YesOrNo.UNANSWERED, YesOrNo.UNANSWERED)).toBeFalsy();
                expect(getHarUtvidetRett(toBarnUnder13, YesOrNo.UNANSWERED, YesOrNo.UNANSWERED)).toBeFalsy();
            });
            it('når en har ett barn over 13 år og aleneomsorg men ikke kronisk', () => {
                expect(getHarUtvidetRett(ettBarnOver13, YesOrNo.NO, YesOrNo.YES)).toBeFalsy();
            });
            it('når en har flere barn over 13 år og ikke aleneomsorg eller kronisk', () => {
                expect(getHarUtvidetRett(ettBarnOver13, YesOrNo.UNANSWERED, YesOrNo.UNANSWERED)).toBeFalsy();
            });
        });

        describe('bare barn under 12 år', () => {
            it('når en ikke utvidet rett pga kronisk/langvarig sykdom eller aleneomsorg', () => {
                expect(getHarUtvidetRett(ettBarnUnder13, YesOrNo.UNANSWERED, YesOrNo.UNANSWERED)).toBeFalsy();
                expect(getHarUtvidetRett(toBarnUnder13, YesOrNo.UNANSWERED, YesOrNo.UNANSWERED)).toBeFalsy();
                expect(getHarUtvidetRett(treBarnUnder13, YesOrNo.UNANSWERED, YesOrNo.UNANSWERED)).toBeTruthy();
            });
            it('når en har utvidet rett pga kronisk/langvarig sykdom', () => {
                expect(getHarUtvidetRett(ettBarnUnder13, YesOrNo.YES, YesOrNo.UNANSWERED)).toBeTruthy();
            });
            it('når en har utvidet rett pga aleneomsorg', () => {
                expect(getHarUtvidetRett(ettBarnUnder13, YesOrNo.NO, YesOrNo.YES)).toBeTruthy();
                expect(getHarUtvidetRett(toBarnUnder13, YesOrNo.NO, YesOrNo.YES)).toBeTruthy();
                expect(getHarUtvidetRett(treBarnUnder13, YesOrNo.NO, YesOrNo.YES)).toBeTruthy();
            });
        });

        describe('bare barn over 13 år', () => {
            it('når en ikke har utvidet rett pga kronisk/langvarig sykdom eller aleneomsorg', () => {
                expect(getHarUtvidetRett(treBarnOver13, YesOrNo.UNANSWERED, YesOrNo.UNANSWERED)).toBeFalsy();
            });
            it('når en har utvidet rett pga kronisk/langvarig sykdom', () => {
                expect(getHarUtvidetRett(treBarnOver13, YesOrNo.YES, YesOrNo.UNANSWERED)).toBeTruthy();
            });
            it('når en har utvidet rett pga aleneomsorg', () => {
                expect(getHarUtvidetRett(treBarnOver13, YesOrNo.NO, YesOrNo.YES)).toBeTruthy();
            });
        });
        describe('flere enn 2 barn under og noen over 13 år', () => {
            it('når en ikke har utvidet rett pga kronisk/langvarig sykdom eller aleneomsorg', () => {
                expect(
                    getHarUtvidetRett(treBarnUnderOgEttBarnOver, YesOrNo.UNANSWERED, YesOrNo.UNANSWERED),
                ).toBeTruthy();
            });
            it('når en har utvidet rett pga kronisk/langvarig sykdom', () => {
                expect(getHarUtvidetRett(treBarnUnderOgEttBarnOver, YesOrNo.YES, YesOrNo.UNANSWERED)).toBeTruthy();
            });
            it('når en har utvidet rett pga aleneomsorg', () => {
                expect(getHarUtvidetRett(treBarnUnderOgEttBarnOver, YesOrNo.NO, YesOrNo.YES)).toBeTruthy();
            });
        });
    });

    describe('getMåDekkeFørsteTiDagerSelv', () => {
        it('Må ikke dekke når alle barn er over 13 år og minst ett har kronisk/langvarig sykdom', () => {
            expect(getMåDekkeFørsteTiDagerSelv(treBarnOver13, YesOrNo.YES)).toBeFalsy();
        });
        it('Må dekke når alle barn er over 13 år men ingen har kronisk/langvarig sykdom', () => {
            expect(getMåDekkeFørsteTiDagerSelv(treBarnOver13, YesOrNo.NO)).toBeTruthy();
        });
        it('Må dekke når ett barn over 13 har kronisk, men har også ett barn under 12', () => {
            expect(getMåDekkeFørsteTiDagerSelv([...ettBarnUnder13, ...ettBarnOver13], YesOrNo.YES)).toBeTruthy();
        });
        it('Må dekke når alle er under 12', () => {
            expect(getMåDekkeFørsteTiDagerSelv(treBarnUnder13, YesOrNo.YES)).toBeTruthy();
        });
    });

    describe('kanFortsetteFraDineBarnStep', () => {
        it('kan ikke fortsette hvis en kun har barn over 13 år og ikke har syktBarn', () => {
            const result = kanFortsetteFraDineBarnStep(treBarnOver13, { harSyktBarn: YesOrNo.NO });
            expect(result).toBeFalsy();
        });
        it('kan fortsette hvis en kun har barn over 13 år og har syktBarn', () => {
            const result = kanFortsetteFraDineBarnStep(treBarnOver13, { harSyktBarn: YesOrNo.YES });
            expect(result).toBeTruthy();
        });
    });
});
