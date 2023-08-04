import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import dayjs from 'dayjs';
import { SøknadFormValues, SøknadFormField } from '../../types/_SøknadFormValues';
import * as fieldValidations from '../fieldValidations';
import {
    arbeidssituasjonStepIsValid,
    legeerklæringStepIsValid,
    medlemskapStepIsValid,
    opplysningerOmBarnetStepIsValid,
    opplysningerOmTidsromStepIsValid,
    welcomingPageIsValid,
} from '../stepValidations';

import Mock = jest.Mock;

jest.mock('./../fieldValidations', () => {
    return {
        validateNavn: jest.fn(() => undefined),
        validateFødselsnummer: jest.fn(() => undefined),
        validateValgtBarn: jest.fn(() => undefined),
    };
});

jest.mock('@navikt/sif-common-formik-ds/lib/validation', () => ({
    getDateValidator: () => () => undefined,
    getFødselsnummerValidator: () => () => undefined,
    getStringValidator: () => () => undefined,
}));

jest.mock('./../../utils/featureToggleUtils', () => {
    return { isFeatureEnabled: () => false, Feature: {} };
});

const formData: Partial<SøknadFormValues> = {};

describe('stepValidation tests', () => {
    describe('welcomingPageIsValid', () => {
        it(`should be valid if ${SøknadFormField.harForståttRettigheterOgPlikter} is true`, () => {
            formData[SøknadFormField.harForståttRettigheterOgPlikter] = true;
            expect(welcomingPageIsValid(formData as SøknadFormValues)).toBe(true);
        });

        it(`should be invalid if ${SøknadFormField.harForståttRettigheterOgPlikter} is undefined or false`, () => {
            formData[SøknadFormField.harForståttRettigheterOgPlikter] = undefined;
            expect(welcomingPageIsValid(formData as SøknadFormValues)).toBe(false);
            formData[SøknadFormField.harForståttRettigheterOgPlikter] = false;
            expect(welcomingPageIsValid(formData as SøknadFormValues)).toBe(false);
        });
    });

    describe('opplysningerOmBarnetStepIsValid', () => {
        describe(`opplysningerOmBarnetStep test`, () => {
            beforeEach(() => {
                jest.resetAllMocks();
            });

            it('should be valid if barnetsNavn, barnetsFødselsnummer and are all valid', () => {
                expect(opplysningerOmBarnetStepIsValid(formData as SøknadFormValues)).toBe(true);
            });

            it(`should be invalid if ${SøknadFormField.barnetsNavn} is invalid`, () => {
                (fieldValidations.validateNavn as Mock).mockReturnValue('some error message');
                expect(opplysningerOmBarnetStepIsValid(formData as SøknadFormValues)).toBe(false);
            });

            it(`should be invalid if ${SøknadFormField.barnetsFødselsnummer} is invalid`, () => {
                (fieldValidations.validateFødselsnummer as Mock).mockReturnValue('some error message');
                expect(opplysningerOmBarnetStepIsValid(formData as SøknadFormValues)).toBe(false);
            });
        });
    });

    describe('opplysningerOmTidsromStepIsValid', () => {
        const fromDate = dayjs().toISOString();
        const toDate = dayjs().toISOString();
        it(`should be valid if both ${SøknadFormField.periodeFra} and ${SøknadFormField.periodeTil} are defined`, () => {
            formData[SøknadFormField.periodeFra] = fromDate;
            formData[SøknadFormField.periodeTil] = toDate;
            expect(opplysningerOmTidsromStepIsValid(formData as SøknadFormValues)).toBe(true);
        });

        it(`should be invalid if ${SøknadFormField.periodeFra} is undefined`, () => {
            formData[SøknadFormField.periodeFra] = undefined;
            formData[SøknadFormField.periodeTil] = toDate;
            expect(opplysningerOmTidsromStepIsValid(formData as SøknadFormValues)).toBe(false);
        });

        it(`should be invalid if ${SøknadFormField.periodeTil} is undefined`, () => {
            formData[SøknadFormField.periodeFra] = fromDate;
            formData[SøknadFormField.periodeTil] = undefined;
            expect(opplysningerOmTidsromStepIsValid(formData as SøknadFormValues)).toBe(false);
        });
    });

    describe('opplysningerOmTidsromStepIsValid', () => {
        it('should always be valid', () => {
            expect(arbeidssituasjonStepIsValid()).toBe(true);
        });
    });

    describe('medlemskapStepIsValid', () => {
        it('should be valid if both harBoddUtenforNorgeSiste12Mnd and skalBoUtenforNorgeNeste12Mnd are either answered with YES or NO', () => {
            formData[SøknadFormField.harBoddUtenforNorgeSiste12Mnd] = YesOrNo.YES;
            formData[SøknadFormField.skalBoUtenforNorgeNeste12Mnd] = YesOrNo.YES;
            expect(medlemskapStepIsValid(formData as SøknadFormValues)).toBe(true);
            formData[SøknadFormField.harBoddUtenforNorgeSiste12Mnd] = YesOrNo.NO;
            formData[SøknadFormField.skalBoUtenforNorgeNeste12Mnd] = YesOrNo.NO;
            expect(medlemskapStepIsValid(formData as SøknadFormValues)).toBe(true);
            formData[SøknadFormField.harBoddUtenforNorgeSiste12Mnd] = YesOrNo.YES;
            formData[SøknadFormField.skalBoUtenforNorgeNeste12Mnd] = YesOrNo.NO;
            expect(medlemskapStepIsValid(formData as SøknadFormValues)).toBe(true);
            formData[SøknadFormField.harBoddUtenforNorgeSiste12Mnd] = YesOrNo.NO;
            formData[SøknadFormField.skalBoUtenforNorgeNeste12Mnd] = YesOrNo.YES;
            expect(medlemskapStepIsValid(formData as SøknadFormValues)).toBe(true);
        });

        it(`should be invalid if ${SøknadFormField.harBoddUtenforNorgeSiste12Mnd} is UNANSWERED`, () => {
            formData[SøknadFormField.harBoddUtenforNorgeSiste12Mnd] = YesOrNo.UNANSWERED;
            formData[SøknadFormField.skalBoUtenforNorgeNeste12Mnd] = YesOrNo.YES;
            expect(medlemskapStepIsValid(formData as SøknadFormValues)).toBe(false);
            formData[SøknadFormField.skalBoUtenforNorgeNeste12Mnd] = YesOrNo.NO;
            expect(medlemskapStepIsValid(formData as SøknadFormValues)).toBe(false);
        });

        it(`should be invalid if ${SøknadFormField.skalBoUtenforNorgeNeste12Mnd} is UNANSWERED`, () => {
            formData[SøknadFormField.skalBoUtenforNorgeNeste12Mnd] = YesOrNo.UNANSWERED;
            formData[SøknadFormField.harBoddUtenforNorgeSiste12Mnd] = YesOrNo.YES;
            expect(medlemskapStepIsValid(formData as SøknadFormValues)).toBe(false);
            formData[SøknadFormField.harBoddUtenforNorgeSiste12Mnd] = YesOrNo.NO;
            expect(medlemskapStepIsValid(formData as SøknadFormValues)).toBe(false);
        });
    });

    describe('legeerklæringStepIsValid', () => {
        it('should always be valid', () => {
            expect(legeerklæringStepIsValid()).toBe(true);
        });
    });
});
