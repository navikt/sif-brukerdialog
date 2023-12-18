import { DineBarnFormValues } from '../DineBarnStep';
import {
    cleanHarUtvidetRettFor,
    getDineBarnStepInitialValues,
    getDineBarnSøknadsdataFromFormValues,
    minstEtBarn12årIårellerYngre,
} from '../dineBarnStepUtils';
import { DineBarnSøknadsdata, Søknadsdata } from '../../../../types/søknadsdata/Søknadsdata';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { AnnetBarn, BarnType } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';
import { RegistrertBarn } from '../../../../types/RegistrertBarn';
import dayjs from 'dayjs';
import { TempFormValues } from '../../../../types/SøknadContextState';
import { StepId } from '../../../../types/StepId';

const date13yearsAgo = dayjs().subtract(13, 'y').startOf('year').toDate();
const date12yearsAgo = dayjs().subtract(12, 'y').startOf('year').toDate();

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

describe('dineBarnStepUtils', () => {
    describe('getDineBarnStepInitialValues', () => {
        it('should return default values when formValues is not provided', () => {
            const søknadsdata = {
                dineBarn: undefined,
            };

            const expected: DineBarnFormValues = {
                andreBarn: undefined,
                harDekketTiFørsteDagerSelv: undefined,
                harUtvidetRett: YesOrNo.UNANSWERED,
                harUtvidetRettFor: [],
            };

            const result = getDineBarnStepInitialValues(søknadsdata);
            expect(result).toEqual(expected);
        });

        it('should return tempFormData when provided', () => {
            const søknadsdata = {
                dineBarn: undefined,
            };

            const tempFormData: Partial<DineBarnFormValues> = {
                andreBarn: [],
                harDekketTiFørsteDagerSelv: true,
                harUtvidetRett: YesOrNo.YES,
                harUtvidetRettFor: ['fnr1', 'fnr2'],
            };

            const tempFormValues: TempFormValues = {
                stepId: StepId.DINE_BARN,
                values: tempFormData,
            };

            const result = getDineBarnStepInitialValues(søknadsdata, tempFormValues);
            expect(result).toEqual(tempFormData);
        });

        it('should return values based on dineBarn type "minstEtt12årEllerYngre"', () => {
            const søknadsdata = {
                dineBarn: {
                    type: 'minstEtt12årEllerYngre',
                    andreBarn: [andreBarn13years, andreBarn12years],
                    harDekketTiFørsteDagerSelv: true,
                },
            };

            const expected: DineBarnFormValues = {
                andreBarn: søknadsdata.dineBarn.andreBarn,
                harDekketTiFørsteDagerSelv: søknadsdata.dineBarn.harDekketTiFørsteDagerSelv,
                harUtvidetRett: YesOrNo.UNANSWERED,
                harUtvidetRettFor: [],
            };

            const result = getDineBarnStepInitialValues(søknadsdata as Søknadsdata);
            expect(result).toEqual(expected);
        });

        it('should return values based on dineBarn type "alleBarnEldre12år"', () => {
            const søknadsdata = {
                dineBarn: {
                    type: 'alleBarnEldre12år',
                    andreBarn: [andreBarn13years, andreBarn13years],
                    harDekketTiFørsteDagerSelv: true,
                    harUtvidetRett: YesOrNo.YES,
                    harUtvidetRettFor: ['fnr1'],
                },
            };

            const expected: DineBarnFormValues = {
                andreBarn: søknadsdata.dineBarn.andreBarn,
                harDekketTiFørsteDagerSelv: undefined,
                harUtvidetRett: YesOrNo.YES,
                harUtvidetRettFor: ['fnr1'],
            };

            const result = getDineBarnStepInitialValues(søknadsdata as Søknadsdata);
            expect(result).toEqual(expected);
        });
    });

    describe('getDineBarnSøknadsdataFromFormValues', () => {
        it('should return søknadsdata for "minstEtt12årEllerYngre" type with valid values', () => {
            const values: DineBarnFormValues = {
                andreBarn: [andreBarn12years],
                harDekketTiFørsteDagerSelv: true,
                harUtvidetRett: YesOrNo.UNANSWERED,
                harUtvidetRettFor: [],
            };

            const registrerteBarn: RegistrertBarn[] = [];

            const expected: DineBarnSøknadsdata = {
                type: 'minstEtt12årEllerYngre',
                andreBarn: values.andreBarn as AnnetBarn[],
                harDekketTiFørsteDagerSelv: true,
            };

            const result = getDineBarnSøknadsdataFromFormValues(values, { registrerteBarn });
            expect(result).toEqual(expected);
        });

        it('should return søknadsdata for "alleBarnEldre12år" type with valid values', () => {
            const values: DineBarnFormValues = {
                andreBarn: [andreBarn13years],
                harDekketTiFørsteDagerSelv: false,
                harUtvidetRett: YesOrNo.YES,
                harUtvidetRettFor: ['fnr1'],
            };

            const registrerteBarn: RegistrertBarn[] = [];

            const expected: DineBarnSøknadsdata = {
                type: 'alleBarnEldre12år',
                andreBarn: values.andreBarn as AnnetBarn[],
                harUtvidetRett: YesOrNo.YES,
                harUtvidetRettFor: values.harUtvidetRettFor,
            };

            const result = getDineBarnSøknadsdataFromFormValues(values, { registrerteBarn });
            expect(result).toEqual(expected);
        });

        it('should return undefined if harDekketTiFørsteDagerSelv is not true', () => {
            const values: DineBarnFormValues = {
                andreBarn: [andreBarn12years],
                harDekketTiFørsteDagerSelv: false,
                harUtvidetRett: YesOrNo.UNANSWERED,
                harUtvidetRettFor: [],
            };

            const registrerteBarn: RegistrertBarn[] = [];

            const result = getDineBarnSøknadsdataFromFormValues(values, { registrerteBarn });
            expect(result).toBeUndefined();
        });

        it('should return undefined if harUtvidetRett is not YES or harUtvidetRettFor is undefined or empty', () => {
            const values: DineBarnFormValues = {
                andreBarn: [andreBarn13years],
                harDekketTiFørsteDagerSelv: true,
                harUtvidetRett: YesOrNo.NO,
                harUtvidetRettFor: [],
            };

            const registrerteBarn: RegistrertBarn[] = [];

            const result = getDineBarnSøknadsdataFromFormValues(values, { registrerteBarn });
            expect(result).toBeUndefined();
        });

        it('should return undefined if registrerteBarn and andreBarn are empty', () => {
            const values: DineBarnFormValues = {
                andreBarn: [],
                harDekketTiFørsteDagerSelv: true,
                harUtvidetRett: YesOrNo.UNANSWERED,
                harUtvidetRettFor: [],
            };

            const registrerteBarn: RegistrertBarn[] = [];

            const result = getDineBarnSøknadsdataFromFormValues(values, { registrerteBarn });
            expect(result).toBeUndefined();
        });

        it('should return undefined if registrerteBarn and andreBarn are empty', () => {
            const values: DineBarnFormValues = {
                andreBarn: [],
                harDekketTiFørsteDagerSelv: true,
                harUtvidetRett: YesOrNo.UNANSWERED,
                harUtvidetRettFor: [],
            };

            const registrerteBarn: RegistrertBarn[] = [];

            const result = getDineBarnSøknadsdataFromFormValues(values, { registrerteBarn });
            expect(result).toBeUndefined();
        });

        it('should return undefined if no barn satisfies the condition for "minstEtt12årEllerYngre" type', () => {
            const values: DineBarnFormValues = {
                andreBarn: [andreBarn13years, andreBarn13years],
                harDekketTiFørsteDagerSelv: true,
                harUtvidetRett: YesOrNo.UNANSWERED,
                harUtvidetRettFor: [],
            };

            const registrerteBarn: RegistrertBarn[] = [registrertBarn13years];

            const result = getDineBarnSøknadsdataFromFormValues(values, { registrerteBarn });
            expect(result).toBeUndefined();
        });

        it('should return undefined if harDekketTiFørsteDagerSelv is not true', () => {
            const values: DineBarnFormValues = {
                andreBarn: [andreBarn13years],
                harDekketTiFørsteDagerSelv: false,
                harUtvidetRett: YesOrNo.UNANSWERED,
                harUtvidetRettFor: [],
            };

            const registrerteBarn: RegistrertBarn[] = [];

            const result = getDineBarnSøknadsdataFromFormValues(values, { registrerteBarn });
            expect(result).toBeUndefined();
        });
    });

    describe('minstEtBarn12årIårellerYngre', () => {
        it('should return true if at least one registered or other child is 12 years old or younger', () => {
            const registrertBarn: RegistrertBarn[] = [
                { aktørId: '1', fornavn: 'John', etternavn: 'Doe', fødselsdato: date13yearsAgo },
                { aktørId: '2', fornavn: 'Jane', etternavn: 'Smith', fødselsdato: date12yearsAgo },
            ];
            const andreBarn: AnnetBarn[] = [
                { fnr: '1234567890', navn: 'Child1', fødselsdato: date13yearsAgo },
                { fnr: '0987654321', navn: 'Child2', fødselsdato: date12yearsAgo },
            ];

            const result = minstEtBarn12årIårellerYngre(registrertBarn, andreBarn);
            expect(result).toBe(true);
        });

        it('should return true if there is at least one registered child who is 12 years old or younger', () => {
            const registrertBarn: RegistrertBarn[] = [
                { aktørId: '1', fornavn: 'John', etternavn: 'Doe', fødselsdato: date13yearsAgo },
                { aktørId: '2', fornavn: 'Jane', etternavn: 'Smith', fødselsdato: date12yearsAgo },
            ];
            const andreBarn: AnnetBarn[] = [];

            const result = minstEtBarn12årIårellerYngre(registrertBarn, andreBarn);
            expect(result).toBe(true);
        });

        it('should return true if there is at least one other child who is 12 years old or younger', () => {
            const registrertBarn: RegistrertBarn[] = [];
            const andreBarn: AnnetBarn[] = [
                { fnr: '1234567890', navn: 'Child1', fødselsdato: date13yearsAgo },
                { fnr: '0987654321', navn: 'Child2', fødselsdato: date12yearsAgo },
            ];

            const result = minstEtBarn12årIårellerYngre(registrertBarn, andreBarn);
            expect(result).toBe(true);
        });

        it('should return false if all registered and other children are older than 12 years', () => {
            const registrertBarn: RegistrertBarn[] = [
                { aktørId: '1', fornavn: 'John', etternavn: 'Doe', fødselsdato: date13yearsAgo },
                { aktørId: '2', fornavn: 'Jane', etternavn: 'Smith', fødselsdato: date13yearsAgo },
            ];
            const andreBarn: AnnetBarn[] = [
                { fnr: '1234567890', navn: 'Child1', fødselsdato: date13yearsAgo },
                { fnr: '0987654321', navn: 'Child2', fødselsdato: date13yearsAgo },
            ];

            const result = minstEtBarn12årIårellerYngre(registrertBarn, andreBarn);
            expect(result).toBe(false);
        });

        it('should return undefined if no registered or other children are provided', () => {
            const registrertBarn: RegistrertBarn[] = [];
            const andreBarn: AnnetBarn[] = [];

            const result = minstEtBarn12årIårellerYngre(registrertBarn, andreBarn);
            expect(result).toBeUndefined();
        });

        it('should return undefined if both registered and other children arrays are empty', () => {
            const registrertBarn: RegistrertBarn[] = [];
            const andreBarn: AnnetBarn[] = [];

            const result = minstEtBarn12årIårellerYngre(registrertBarn, andreBarn);
            expect(result).toBeUndefined();
        });
    });

    describe('cleanHarUtvidetRettFor', () => {
        it('filters harUtvidetRettFor array based on andreBarn and registrerteBarn', () => {
            const harUtvidetRettFor = ['12345678', '87654321', '98765432'];
            const andreBarn = [
                { fnr: '12345678', navn: 'John', fødselsdato: date13yearsAgo, type: BarnType.fosterbarn },
                { fnr: '23456789', navn: 'Jane', fødselsdato: date13yearsAgo, type: BarnType.fosterbarn },
            ];
            const registrerteBarn = [
                { aktørId: '87654321', fornavn: 'Alice', etternavn: 'Doe', fødselsdato: date13yearsAgo },
                { aktørId: '76543210', fornavn: 'Bob', etternavn: 'Doe', fødselsdato: date13yearsAgo },
            ];
            const expectedResult = ['12345678', '87654321'];

            const result = cleanHarUtvidetRettFor(harUtvidetRettFor, andreBarn, registrerteBarn);

            expect(result).toEqual(expectedResult);
        });

        it('returns an empty array if harUtvidetRettFor is empty', () => {
            const harUtvidetRettFor = [];
            const andreBarn = [
                { fnr: '12345678', navn: 'John', fødselsdato: date13yearsAgo, type: BarnType.fosterbarn },
                { fnr: '23456789', navn: 'Jane', fødselsdato: date13yearsAgo, type: BarnType.fosterbarn },
            ];
            const registrerteBarn = [
                { aktørId: '87654321', fornavn: 'Alice', etternavn: 'Doe', fødselsdato: date13yearsAgo },
                { aktørId: '76543210', fornavn: 'Bob', etternavn: 'Doe', fødselsdato: date13yearsAgo },
            ];
            const expectedResult: string[] = [];

            const result = cleanHarUtvidetRettFor(harUtvidetRettFor, andreBarn, registrerteBarn);

            expect(result).toEqual(expectedResult);
        });

        it('returns an empty array if andreBarn and registrerteBarn are empty', () => {
            const harUtvidetRettFor = ['12345678', '87654321', '98765432'];
            const andreBarn: AnnetBarn[] = [];
            const registrerteBarn: RegistrertBarn[] = [];
            const expectedResult: string[] = [];

            const result = cleanHarUtvidetRettFor(harUtvidetRettFor, andreBarn, registrerteBarn);

            expect(result).toEqual(expectedResult);
        });

        it('returns an empty array when harUtvidetRettFor does not match andreBarn or registrerteBarn', () => {
            const harUtvidetRettFor = ['12345678', '87654321', '98765432'];
            const andreBarn = [
                { fnr: '11111111', navn: 'John', fødselsdato: date13yearsAgo, type: BarnType.fosterbarn },
                { fnr: '22222222', navn: 'Jane', fødselsdato: date13yearsAgo, type: BarnType.fosterbarn },
            ];
            const registrerteBarn = [
                { aktørId: '33333333', fornavn: 'Alice', etternavn: 'Doe', fødselsdato: date13yearsAgo },
                { aktørId: '44444444', fornavn: 'Bob', etternavn: 'Doe', fødselsdato: date13yearsAgo },
            ];

            const result = cleanHarUtvidetRettFor(harUtvidetRettFor, andreBarn, registrerteBarn);

            expect(result).toEqual([]);
        });

        it('returns the filtered array of harUtvidetRettFor that match andreBarn and registrerteBarn', () => {
            const harUtvidetRettFor = ['12345678', '87654321', '98765432', '55555555', '66666666'];
            const andreBarn = [
                { fnr: '12345678', navn: 'John', fødselsdato: date13yearsAgo, type: BarnType.fosterbarn },
                { fnr: '87654321', navn: 'Alice', fødselsdato: date13yearsAgo, type: BarnType.fosterbarn },
                { fnr: '55555555', navn: 'Bob', fødselsdato: date13yearsAgo, type: BarnType.fosterbarn },
            ];
            const registrerteBarn = [
                { aktørId: '98765432', fornavn: 'Jane', etternavn: 'Doe', fødselsdato: date13yearsAgo },
                { aktørId: '66666666', fornavn: 'Eve', etternavn: 'Doe', fødselsdato: date13yearsAgo },
            ];
            const expectedResult = ['12345678', '87654321', '98765432', '55555555', '66666666'];

            const result = cleanHarUtvidetRettFor(harUtvidetRettFor, andreBarn, registrerteBarn);

            expect(result).toEqual(expectedResult);
        });
    });
});
