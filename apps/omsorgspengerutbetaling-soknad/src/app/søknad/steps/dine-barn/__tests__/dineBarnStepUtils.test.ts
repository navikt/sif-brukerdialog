/* eslint-disable @typescript-eslint/no-unused-vars */
import { DineBarnFormValues } from '../DineBarnStep';
import {
    getDineBarnSøknadsdataFromFormValues,
    getHarUtvidetRett,
    getMåDekkeFørste10DagerSelv,
} from '../dineBarnStepUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { AnnetBarn, BarnType } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';
import { RegistrertBarn } from '../../../../types/RegistrertBarn';
import dayjs from 'dayjs';

const date2yearsAgo = dayjs().subtract(2, 'y').startOf('year').toDate();
const date3yearsAgo = dayjs().subtract(3, 'y').startOf('year').toDate();
const date4yearsAgo = dayjs().subtract(4, 'y').startOf('year').toDate();
const date13yearsAgo = dayjs().subtract(13, 'y').startOf('year').toDate();
const date12yearsAgo = dayjs().subtract(12, 'y').startOf('year').toDate();

const registrertBarn2years: RegistrertBarn = {
    aktørId: '1',
    fornavn: 'John',
    etternavn: 'Doe',
    fødselsdato: date2yearsAgo,
};
const registrertBarn3years: RegistrertBarn = {
    aktørId: '1',
    fornavn: 'John',
    etternavn: 'Doe',
    fødselsdato: date3yearsAgo,
};
const registrertBarn4years: RegistrertBarn = {
    aktørId: '1',
    fornavn: 'John',
    etternavn: 'Doe',
    fødselsdato: date4yearsAgo,
};
const registrertBarn13years: RegistrertBarn = {
    aktørId: '1',
    fornavn: 'John',
    etternavn: 'Doe',
    fødselsdato: date13yearsAgo,
};
const andreBarn13years: AnnetBarn = {
    fnr: 'fnr1',
    fødselsdato: date13yearsAgo,
    navn: 'Barn 1',
    type: BarnType.fosterbarn,
};

const andreBarn12years: AnnetBarn = {
    fnr: 'fnr2',
    fødselsdato: date12yearsAgo,
    navn: 'Barn 2',
    type: BarnType.fosterbarn,
};

const ettBarnUnder12: RegistrertBarn[] = [registrertBarn2years];
const toBarnUnder12: RegistrertBarn[] = [registrertBarn2years, registrertBarn3years];
const treBarnUnder12: RegistrertBarn[] = [registrertBarn2years, registrertBarn3years, registrertBarn4years];
// const treBarnMix: RegistrertBarn[] = [registrertBarn2years, registrertBarn3years, registrertBarn13years];
const ettBarnOver12: RegistrertBarn[] = [registrertBarn13years];
// const toBarnOver12: RegistrertBarn[] = [registrertBarn13years, registrertBarn13years];
const treBarnOver12: RegistrertBarn[] = [registrertBarn13years, registrertBarn13years, registrertBarn13years];

describe('dineBarnStepUtils', () => {
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

    describe('getDineBarnSøknadsdataFromFormValues', () => {
        // it('should return søknadsdata for "minstEtt12årEllerYngre" type with valid values', () => {
        //     const values: DineBarnFormValues = {
        //         andreBarn: [andreBarn12years],
        //         harDekketTiFørsteDagerSelv: YesOrNo.YES,
        //         harSyktBarn: YesOrNo.UNANSWERED,
        //     };

        //     const registrerteBarn: RegistrertBarn[] = [];

        //     const expected: DineBarnSøknadsdata = {
        //         type: 'minstEtt12årEllerYngre',
        //         andreBarn: values.andreBarn as AnnetBarn[],
        //         harDekketTiFørsteDagerSelv: YesOrNo.YES,
        //     };

        //     const result = getDineBarnSøknadsdataFromFormValues(values, { registrerteBarn });
        //     expect(result).toEqual(expected);
        // });

        // it('should return søknadsdata for "alleBarnEldre12år" type with valid values', () => {
        //     const values: DineBarnFormValues = {
        //         andreBarn: [andreBarn13years],
        //         harDekketTiFørsteDagerSelv: YesOrNo.NO,
        //         harSyktBarn: YesOrNo.YES,
        //     };

        //     const registrerteBarn: RegistrertBarn[] = [];

        //     const expected: DineBarnSøknadsdata = {
        //         andreBarn: values.andreBarn as AnnetBarn[],
        //         harSyktBarn: true,

        //     };

        //     const result = getDineBarnSøknadsdataFromFormValues(values, { registrerteBarn });
        //     expect(result).toEqual(expected);
        // });

        it('should return undefined if harDekketTiFørsteDagerSelv is not true', () => {
            const values: DineBarnFormValues = {
                andreBarn: [andreBarn12years],
                harDekketTiFørsteDagerSelv: YesOrNo.NO,
                harSyktBarn: YesOrNo.UNANSWERED,
            };

            const registrerteBarn: RegistrertBarn[] = [];

            const result = getDineBarnSøknadsdataFromFormValues(values, { registrerteBarn });
            expect(result).toBeUndefined();
        });

        it('should return undefined if registrerteBarn and andreBarn are empty', () => {
            const values: DineBarnFormValues = {
                andreBarn: [],
                harDekketTiFørsteDagerSelv: YesOrNo.YES,
                harSyktBarn: YesOrNo.UNANSWERED,
            };

            const registrerteBarn: RegistrertBarn[] = [];

            const result = getDineBarnSøknadsdataFromFormValues(values, { registrerteBarn });
            expect(result).toBeUndefined();
        });

        it('should return undefined if registrerteBarn and andreBarn are empty', () => {
            const values: DineBarnFormValues = {
                andreBarn: [],
                harDekketTiFørsteDagerSelv: YesOrNo.YES,
                harSyktBarn: YesOrNo.UNANSWERED,
            };

            const registrerteBarn: RegistrertBarn[] = [];

            const result = getDineBarnSøknadsdataFromFormValues(values, { registrerteBarn });
            expect(result).toBeUndefined();
        });

        it('should return undefined if no barn satisfies the condition for "minstEtt12årEllerYngre" type', () => {
            const values: DineBarnFormValues = {
                andreBarn: [andreBarn13years, andreBarn13years],
                harDekketTiFørsteDagerSelv: YesOrNo.YES,
                harSyktBarn: YesOrNo.UNANSWERED,
            };

            const registrerteBarn: RegistrertBarn[] = [registrertBarn13years];

            const result = getDineBarnSøknadsdataFromFormValues(values, { registrerteBarn });
            expect(result).toBeUndefined();
        });

        it('should return undefined if harDekketTiFørsteDagerSelv is not true', () => {
            const values: DineBarnFormValues = {
                andreBarn: [andreBarn13years],
                harDekketTiFørsteDagerSelv: YesOrNo.NO,
                harSyktBarn: YesOrNo.UNANSWERED,
            };

            const registrerteBarn: RegistrertBarn[] = [];

            const result = getDineBarnSøknadsdataFromFormValues(values, { registrerteBarn });
            expect(result).toBeUndefined();
        });
    });

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
                expect(getHarUtvidetRett(ettBarnUnder12, [], YesOrNo.UNANSWERED, YesOrNo.UNANSWERED)).toBeFalsy();
                expect(getHarUtvidetRett(toBarnUnder12, [], YesOrNo.UNANSWERED, YesOrNo.UNANSWERED)).toBeFalsy();
            });
            it('når en har ett barn over 13 år og aleneomsorg men ikke kronisk', () => {
                expect(getHarUtvidetRett(ettBarnOver12, [], YesOrNo.NO, YesOrNo.YES)).toBeFalsy();
            });
            it('når en har flere barn over 13 år og ikke aleneomsorg eller kronisk', () => {
                expect(getHarUtvidetRett(ettBarnOver12, [], YesOrNo.UNANSWERED, YesOrNo.UNANSWERED)).toBeFalsy();
            });
        });
        describe('bare barn under 12 år', () => {
            it('ikke utvidet rett pga kronisk/langvarig sykdom eller aleneomsorg', () => {
                expect(getHarUtvidetRett(ettBarnUnder12, [], YesOrNo.UNANSWERED, YesOrNo.UNANSWERED)).toBeFalsy();
                expect(getHarUtvidetRett(toBarnUnder12, [], YesOrNo.UNANSWERED, YesOrNo.UNANSWERED)).toBeFalsy();
                expect(getHarUtvidetRett(treBarnUnder12, [], YesOrNo.UNANSWERED, YesOrNo.UNANSWERED)).toBeTruthy();
            });
            it('utvidet rett pga kronisk/langvarig sykdom', () => {
                expect(getHarUtvidetRett(ettBarnUnder12, [], YesOrNo.YES, YesOrNo.UNANSWERED)).toBeTruthy();
            });
            it('utvidet rett pga aleneomsorg', () => {
                expect(getHarUtvidetRett(ettBarnUnder12, [], YesOrNo.NO, YesOrNo.YES)).toBeTruthy();
                expect(getHarUtvidetRett(toBarnUnder12, [], YesOrNo.NO, YesOrNo.YES)).toBeTruthy();
                expect(getHarUtvidetRett(treBarnUnder12, [], YesOrNo.NO, YesOrNo.YES)).toBeTruthy();
            });
        });
        describe('bare barn over 13 år', () => {
            it('ikke utvidet rett pga kronisk/langvarig sykdom eller aleneomsorg', () => {
                expect(getHarUtvidetRett(treBarnOver12, [], YesOrNo.UNANSWERED, YesOrNo.UNANSWERED)).toBeFalsy();
            });
            it('utvidet rett pga kronisk/langvarig sykdom', () => {
                expect(getHarUtvidetRett(treBarnOver12, [], YesOrNo.YES, YesOrNo.UNANSWERED)).toBeTruthy();
            });
            it('utvidet rett pga aleneomsorg', () => {
                expect(getHarUtvidetRett(treBarnOver12, [], YesOrNo.NO, YesOrNo.YES)).toBeTruthy();
            });
        });
    });

    describe('getMåDekkeFørste10DagerSelv', () => {
        it('Må ikke dekke når alle barn er over 13 år og minst ett har kronisk/langvarig sykdom', () => {
            expect(getMåDekkeFørste10DagerSelv(treBarnOver12, [], YesOrNo.YES)).toBeFalsy();
        });
        it('Må dekke når alle barn er over 13 år men ingen har kronisk/langvarig sykdom', () => {
            expect(getMåDekkeFørste10DagerSelv(treBarnOver12, [], YesOrNo.NO)).toBeTruthy();
        });
        it('Må dekke når ett barn over 13 har kronisk, men har også ett barn under 12 ', () => {
            expect(getMåDekkeFørste10DagerSelv([...ettBarnUnder12, ...ettBarnOver12], [], YesOrNo.YES)).toBeTruthy();
        });
        it('Må dekke når alle er under 12', () => {
            expect(getMåDekkeFørste10DagerSelv(treBarnUnder12, [], YesOrNo.YES)).toBeTruthy();
        });
    });
});
