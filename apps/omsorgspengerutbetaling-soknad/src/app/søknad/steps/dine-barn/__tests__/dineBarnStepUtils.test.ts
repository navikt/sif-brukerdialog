import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { dateToISODate } from '@navikt/sif-common-utils';
import { barnMockData } from '../../../../../test-mock-data/barn';
import {
    getBarnAlderInfo,
    getDineBarnScenario,
    getHarUtvidetRett,
    getMåDekkeFørsteTiDagerSelv,
    kanFortsetteFraDineBarnStep,
    nYearsAgo,
} from '../dineBarnStepUtils';
import { DineBarnScenario } from '../../../../types/DineBarnScenario';

const { ettBarnOver13, ettBarnUnder13, toBarnUnder13, treBarnOver13, treBarnUnder13, toBarnUnderOgEttBarnOver } =
    barnMockData;

describe('dineBarnStepUtils', () => {
    describe('nYearsAgo', () => {
        it('trekker fra riktig og returnerer første januar det året', () => {
            const thisYear = new Date().getFullYear();
            expect(dateToISODate(nYearsAgo(2))).toEqual(`${thisYear - 2}-01-01`);
            expect(dateToISODate(nYearsAgo(1))).toEqual(`${thisYear - 1}-01-01`);
            expect(dateToISODate(nYearsAgo(5))).toEqual(`${thisYear - 5}-01-01`);
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

    // describe('getDineBarnSøknadsdataFromFormValues', () => {
    //     const values: DineBarnFormValues = {
    //         andreBarn: [],
    //     };
    //     it('returnerer undefined for harDekketTiFørsteDagerSelv dersom bruker ikke må dekke dette', () => {
    //         const result = getDineBarnSøknadsdataFromFormValues(
    //             { ...values, harSyktBarn: YesOrNo.YES, harDekketTiFørsteDagerSelv: YesOrNo.NO },
    //             { registrerteBarn: barnMockData.treBarnOver13 },
    //         );
    //         expect(result?.harDekketTiFørsteDagerSelv).toBeUndefined();
    //     });
    //     it('returnerer defined for harDekketTiFørsteDagerSelv dersom bruker må dekke dette', () => {
    //         const result = getDineBarnSøknadsdataFromFormValues(
    //             { ...values, harSyktBarn: YesOrNo.YES, harDekketTiFørsteDagerSelv: YesOrNo.YES },
    //             { registrerteBarn: barnMockData.ettBarnUnder13 },
    //         );
    //         expect(result?.harDekketTiFørsteDagerSelv).toBeDefined();
    //     });
    // });

    // describe('getDineBarnStepInitialValues', () => {
    // it('should return default values when formValues is not provided', () => {
    //     const søknadsdata = {
    //         dineBarn: undefined,
    //     };
    //     const expected: DineBarnFormValues = {
    //         andreBarn: undefined,
    //         harDekketTiFørsteDagerSelv: undefined,
    //         harSyktBarn: YesOrNo.UNANSWERED,
    //
    //     };
    //     const result = getDineBarnStepInitialValues(søknadsdata);
    //     expect(result).toEqual(expected);
    // });
    // it('should return tempFormData when provided', () => {
    //     const søknadsdata = {
    //         dineBarn: undefined,
    //     };
    //     const tempFormData: Partial<DineBarnFormValues> = {
    //         andreBarn: [],
    //         harDekketTiFørsteDagerSelv: YesOrNo.YES,
    //         harSyktBarn: YesOrNo.YES,
    //     };
    //     const tempFormValues: TempFormValues = {
    //         stepId: StepId.DINE_BARN,
    //         values: tempFormData,
    //     };
    //     const result = getDineBarnStepInitialValues(søknadsdata, tempFormValues);
    //     expect(result).toEqual(tempFormData);
    // });
    // it('should return values based on dineBarn type "minstEtt12årEllerYngre"', () => {
    //     const søknadsdata = {
    //         dineBarn: {
    //             type: 'minstEtt12årEllerYngre',
    //             andreBarn: [andreBarn13years, andreBarn12years],
    //             harDekketTiFørsteDagerSelv: YesOrNo.YES,
    //         },
    //     };
    //     const expected: DineBarnFormValues = {
    //         andreBarn: søknadsdata.dineBarn.andreBarn,
    //         harDekketTiFørsteDagerSelv: søknadsdata.dineBarn.harDekketTiFørsteDagerSelv,
    //         harSyktBarn: YesOrNo.UNANSWERED,
    //
    //     };
    //     const result = getDineBarnStepInitialValues(søknadsdata as Søknadsdata);
    //     expect(result).toEqual(expected);
    // });
    // it('should return values based on dineBarn type "alleBarnEldre12år"', () => {
    //     const søknadsdata = {
    //         dineBarn: {
    //             type: 'alleBarnEldre12år',
    //             andreBarn: [andreBarn13years, andreBarn13years],
    //             harDekketTiFørsteDagerSelv: YesOrNo.YES,
    //             harSyktBarn: YesOrNo.YES,
    //         },
    //     };
    //     const expected: DineBarnFormValues = {
    //         andreBarn: søknadsdata.dineBarn.andreBarn,
    //         harDekketTiFørsteDagerSelv: undefined,
    //         harSyktBarn: YesOrNo.YES,
    //     };
    //     const result = getDineBarnStepInitialValues(søknadsdata as Søknadsdata);
    //     expect(result).toEqual(expected);
    // });
    // });

    // describe('getDineBarnSøknadsdataFromFormValues', () => {
    //     // it('should return søknadsdata for "minstEtt12årEllerYngre" type with valid values', () => {
    //     //     const values: DineBarnFormValues = {
    //     //         andreBarn: [andreBarn12years],
    //     //         harDekketTiFørsteDagerSelv: YesOrNo.YES,
    //     //         harSyktBarn: YesOrNo.UNANSWERED,
    //     //     };

    //     //     const registrerteBarn: RegistrertBarn[] = [];

    //     //     const expected: DineBarnSøknadsdata = {
    //     //         type: 'minstEtt12årEllerYngre',
    //     //         andreBarn: values.andreBarn as AnnetBarn[],
    //     //         harDekketTiFørsteDagerSelv: YesOrNo.YES,
    //     //     };

    //     //     const result = getDineBarnSøknadsdataFromFormValues(values, { registrerteBarn });
    //     //     expect(result).toEqual(expected);
    //     // });

    //     // it('should return søknadsdata for "alleBarnEldre12år" type with valid values', () => {
    //     //     const values: DineBarnFormValues = {
    //     //         andreBarn: [andreBarn13years],
    //     //         harDekketTiFørsteDagerSelv: YesOrNo.NO,
    //     //         harSyktBarn: YesOrNo.YES,
    //     //     };

    //     //     const registrerteBarn: RegistrertBarn[] = [];

    //     //     const expected: DineBarnSøknadsdata = {
    //     //         andreBarn: values.andreBarn as AnnetBarn[],
    //     //         harSyktBarn: true,

    //     //     };

    //     //     const result = getDineBarnSøknadsdataFromFormValues(values, { registrerteBarn });
    //     //     expect(result).toEqual(expected);
    //     // });

    //     // it('should return undefined if harDekketTiFørsteDagerSelv is not true', () => {
    //     //     const values: DineBarnFormValues = {
    //     //         andreBarn: [andreBarn12years],
    //     //         harDekketTiFørsteDagerSelv: YesOrNo.NO,
    //     //         harSyktBarn: YesOrNo.UNANSWERED,
    //     //     };

    //     //     const registrerteBarn: RegistrertBarn[] = [];

    //     //     const result = getDineBarnSøknadsdataFromFormValues(values, { registrerteBarn });
    //     //     expect(result).toBeUndefined();
    //     // });

    //     it('should return undefined if registrerteBarn and andreBarn are empty', () => {
    //         const values: DineBarnFormValues = {
    //             andreBarn: [],
    //             harDekketTiFørsteDagerSelv: YesOrNo.YES,
    //             harSyktBarn: YesOrNo.UNANSWERED,
    //         };

    //         const registrerteBarn: RegistrertBarn[] = [];

    //         const result = getDineBarnSøknadsdataFromFormValues(values, { registrerteBarn });
    //         expect(result).toBeUndefined();
    //     });

    //     it('should return undefined if registrerteBarn and andreBarn are empty', () => {
    //         const values: DineBarnFormValues = {
    //             andreBarn: [],
    //             harDekketTiFørsteDagerSelv: YesOrNo.YES,
    //             harSyktBarn: YesOrNo.UNANSWERED,
    //         };

    //         const registrerteBarn: RegistrertBarn[] = [];

    //         const result = getDineBarnSøknadsdataFromFormValues(values, { registrerteBarn });
    //         expect(result).toBeUndefined();
    //     });

    //     it('should return undefined if no barn satisfies the condition for "minstEtt12årEllerYngre" type', () => {
    //         const values: DineBarnFormValues = {
    //             andreBarn: [andreBarn13years, andreBarn13years],
    //             harDekketTiFørsteDagerSelv: YesOrNo.YES,
    //             harSyktBarn: YesOrNo.UNANSWERED,
    //         };

    //         const registrerteBarn: RegistrertBarn[] = [registrertBarn13years];

    //         const result = getDineBarnSøknadsdataFromFormValues(values, { registrerteBarn });
    //         expect(result).toBeUndefined();
    //     });

    //     it('should return undefined if harDekketTiFørsteDagerSelv is not true', () => {
    //         const values: DineBarnFormValues = {
    //             andreBarn: [andreBarn13years],
    //             harDekketTiFørsteDagerSelv: YesOrNo.NO,
    //             harSyktBarn: YesOrNo.UNANSWERED,
    //         };

    //         const registrerteBarn: RegistrertBarn[] = [];

    //         const result = getDineBarnSøknadsdataFromFormValues(values, { registrerteBarn });
    //         expect(result).toBeUndefined();
    //     });
    // });

    // describe('minstEtBarn12årIårellerYngre', () => {
    //     it('should return true if at least one registered or other child is 12 years old or younger', () => {
    //         const registrertBarn: RegistrertBarn[] = [
    //             { aktørId: '1', fornavn: 'John', etternavn: 'Doe', fødselsdato: date13yearsAgo },
    //             { aktørId: '2', fornavn: 'Jane', etternavn: 'Smith', fødselsdato: date12yearsAgo },
    //         ];
    //         const andreBarn: AnnetBarn[] = [
    //             { fnr: '1234567890', navn: 'Child1', fødselsdato: date13yearsAgo },
    //             { fnr: '0987654321', navn: 'Child2', fødselsdato: date12yearsAgo },
    //         ];

    //         const result = minstEtBarn12årIårellerYngre(registrertBarn, andreBarn);
    //         expect(result).toBe(true);
    //     });

    //     it('should return true if there is at least one registered child who is 12 years old or younger', () => {
    //         const registrertBarn: RegistrertBarn[] = [
    //             { aktørId: '1', fornavn: 'John', etternavn: 'Doe', fødselsdato: date13yearsAgo },
    //             { aktørId: '2', fornavn: 'Jane', etternavn: 'Smith', fødselsdato: date12yearsAgo },
    //         ];
    //         const andreBarn: AnnetBarn[] = [];

    //         const result = minstEtBarn12årIårellerYngre(registrertBarn, andreBarn);
    //         expect(result).toBe(true);
    //     });

    //     it('should return true if there is at least one other child who is 12 years old or younger', () => {
    //         const registrertBarn: RegistrertBarn[] = [];
    //         const andreBarn: AnnetBarn[] = [
    //             { fnr: '1234567890', navn: 'Child1', fødselsdato: date13yearsAgo },
    //             { fnr: '0987654321', navn: 'Child2', fødselsdato: date12yearsAgo },
    //         ];

    //         const result = minstEtBarn12årIårellerYngre(registrertBarn, andreBarn);
    //         expect(result).toBe(true);
    //     });

    //     it('should return false if all registered and other children are older than 12 years', () => {
    //         const registrertBarn: RegistrertBarn[] = [
    //             { aktørId: '1', fornavn: 'John', etternavn: 'Doe', fødselsdato: date13yearsAgo },
    //             { aktørId: '2', fornavn: 'Jane', etternavn: 'Smith', fødselsdato: date13yearsAgo },
    //         ];
    //         const andreBarn: AnnetBarn[] = [
    //             { fnr: '1234567890', navn: 'Child1', fødselsdato: date13yearsAgo },
    //             { fnr: '0987654321', navn: 'Child2', fødselsdato: date13yearsAgo },
    //         ];

    //         const result = minstEtBarn12årIårellerYngre(registrertBarn, andreBarn);
    //         expect(result).toBe(false);
    //     });

    //     it('should return undefined if no registered or other children are provided', () => {
    //         const registrertBarn: RegistrertBarn[] = [];
    //         const andreBarn: AnnetBarn[] = [];

    //         const result = minstEtBarn12årIårellerYngre(registrertBarn, andreBarn);
    //         expect(result).toBeUndefined();
    //     });

    //     it('should return undefined if both registered and other children arrays are empty', () => {
    //         const registrertBarn: RegistrertBarn[] = [];
    //         const andreBarn: AnnetBarn[] = [];

    //         const result = minstEtBarn12årIårellerYngre(registrertBarn, andreBarn);
    //         expect(result).toBeUndefined();
    //     });
    // });

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
    });

    describe('getMåDekkeFørsteTiDagerSelv', () => {
        it('Må ikke dekke når alle barn er over 13 år og minst ett har kronisk/langvarig sykdom', () => {
            expect(getMåDekkeFørsteTiDagerSelv(treBarnOver13, YesOrNo.YES)).toBeFalsy();
        });
        it('Må dekke når alle barn er over 13 år men ingen har kronisk/langvarig sykdom', () => {
            expect(getMåDekkeFørsteTiDagerSelv(treBarnOver13, YesOrNo.NO)).toBeTruthy();
        });
        it('Må dekke når ett barn over 13 har kronisk, men har også ett barn under 12 ', () => {
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
