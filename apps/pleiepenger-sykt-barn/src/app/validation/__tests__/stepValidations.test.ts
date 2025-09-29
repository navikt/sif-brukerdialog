import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { VelgBarn_AnnetBarnValue } from '@navikt/sif-common-forms-ds';
import dayjs from 'dayjs';
import { Mock, vi } from 'vitest';

import { BarnRelasjon } from '../../types';
import { SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import * as fieldValidations from '../fieldValidations';
import {
    legeerklæringStepIsValid,
    medlemskapStepIsValid,
    opplysningerOmBarnetStepIsValid,
    opplysningerOmTidsromStepIsValid,
    welcomingPageIsValid,
} from '../stepValidations';

vi.mock('./../fieldValidations', () => {
    return {
        validateNavn: vi.fn(() => undefined),
        validateFødselsnummer: vi.fn(() => undefined),
        validateRelasjonTilBarnBeskrivelse: vi.fn(() => undefined),
        validateValgtBarn: vi.fn(() => undefined),
    };
});

vi.mock('@navikt/sif-common-env', () => {
    return {
        getRequiredEnv: () => 'mockedApiUrl',
        getMaybeEnv: () => 'mockedApiUrl',
        getCommonEnv: () => ({}),
        getK9SakInnsynEnv: () => ({}),
    };
});

const formValues: Partial<SøknadFormValues> = {};

describe('stepValidation tests', () => {
    describe('welcomingPageIsValid', () => {
        it(`should be valid if ${SøknadFormField.harForståttRettigheterOgPlikter} is true`, () => {
            formValues[SøknadFormField.harForståttRettigheterOgPlikter] = true;
            expect(welcomingPageIsValid(formValues as SøknadFormValues)).toBe(true);
        });

        it(`should be invalid if ${SøknadFormField.harForståttRettigheterOgPlikter} is undefined or false`, () => {
            formValues[SøknadFormField.harForståttRettigheterOgPlikter] = undefined;
            expect(welcomingPageIsValid(formValues as SøknadFormValues)).toBe(false);
            formValues[SøknadFormField.harForståttRettigheterOgPlikter] = false;
            expect(welcomingPageIsValid(formValues as SøknadFormValues)).toBe(false);
        });
    });

    describe('opplysningerOmBarnetStepIsValid', () => {
        describe(`opplysningerOmBarnetStep test`, () => {
            beforeEach(() => {
                vi.resetAllMocks();
            });

            formValues[SøknadFormField.barnetSøknadenGjelder] = VelgBarn_AnnetBarnValue;
            formValues[SøknadFormField.barnetsNavn] = 'Ola Nordmann';
            formValues[SøknadFormField.barnetsFødselsnummer] = '01010112345';
            formValues[SøknadFormField.relasjonTilBarnet] = BarnRelasjon.FAR;

            it('should be valid if barnetsNavn, barnetsFødselsnummer and are all valid', () => {
                expect(opplysningerOmBarnetStepIsValid(formValues as SøknadFormValues)).toBe(true);
            });

            it(`should be invalid if ${SøknadFormField.barnetsNavn} is invalid`, () => {
                formValues[SøknadFormField.barnetsNavn] = '';
                (fieldValidations.validateNavn as Mock).mockReturnValue('some error message');
                expect(opplysningerOmBarnetStepIsValid(formValues as SøknadFormValues)).toBe(false);
            });

            it(`should be invalid if ${SøknadFormField.barnetsFødselsnummer} is invalid`, () => {
                (fieldValidations.validateFødselsnummer as Mock).mockReturnValue('some error message');
                expect(opplysningerOmBarnetStepIsValid(formValues as SøknadFormValues)).toBe(false);
            });

            it(`should be invalid if ${SøknadFormField.relasjonTilBarnet} is invalid`, () => {
                formValues[SøknadFormField.relasjonTilBarnet] = undefined;
                expect(opplysningerOmBarnetStepIsValid(formValues as SøknadFormValues)).toBe(false);
            });

            it(`should be invalid if ${SøknadFormField.relasjonTilBarnet} is ANNET and ${SøknadFormField.relasjonTilBarnetBeskrivelse} is invalid`, () => {
                (fieldValidations.validateRelasjonTilBarnBeskrivelse as Mock).mockReturnValue('some error message');
                formValues[SøknadFormField.relasjonTilBarnet] = BarnRelasjon.ANNET;
                formValues[SøknadFormField.relasjonTilBarnetBeskrivelse] = undefined;
                expect(opplysningerOmBarnetStepIsValid(formValues as SøknadFormValues)).toBe(false);
            });
        });
    });

    describe('opplysningerOmTidsromStepIsValid', () => {
        const fromDate = dayjs().toISOString();
        const toDate = dayjs().toISOString();
        it(`should be valid if both ${SøknadFormField.periodeFra} and ${SøknadFormField.periodeTil} are defined`, () => {
            formValues[SøknadFormField.periodeFra] = fromDate;
            formValues[SøknadFormField.periodeTil] = toDate;
            expect(opplysningerOmTidsromStepIsValid(formValues as SøknadFormValues)).toBe(true);
        });

        it(`should be invalid if ${SøknadFormField.periodeFra} is undefined`, () => {
            formValues[SøknadFormField.periodeFra] = undefined;
            formValues[SøknadFormField.periodeTil] = toDate;
            expect(opplysningerOmTidsromStepIsValid(formValues as SøknadFormValues)).toBe(false);
        });

        it(`should be invalid if ${SøknadFormField.periodeTil} is undefined`, () => {
            formValues[SøknadFormField.periodeFra] = fromDate;
            formValues[SøknadFormField.periodeTil] = undefined;
            expect(opplysningerOmTidsromStepIsValid(formValues as SøknadFormValues)).toBe(false);
        });
    });

    describe('medlemskapStepIsValid', () => {
        it('should be valid if both harBoddUtenforNorgeSiste12Mnd and skalBoUtenforNorgeNeste12Mnd are either answered with YES or NO', () => {
            formValues[SøknadFormField.harBoddUtenforNorgeSiste12Mnd] = YesOrNo.YES;
            formValues[SøknadFormField.skalBoUtenforNorgeNeste12Mnd] = YesOrNo.YES;
            expect(medlemskapStepIsValid(formValues as SøknadFormValues)).toBe(true);
            formValues[SøknadFormField.harBoddUtenforNorgeSiste12Mnd] = YesOrNo.NO;
            formValues[SøknadFormField.skalBoUtenforNorgeNeste12Mnd] = YesOrNo.NO;
            expect(medlemskapStepIsValid(formValues as SøknadFormValues)).toBe(true);
            formValues[SøknadFormField.harBoddUtenforNorgeSiste12Mnd] = YesOrNo.YES;
            formValues[SøknadFormField.skalBoUtenforNorgeNeste12Mnd] = YesOrNo.NO;
            expect(medlemskapStepIsValid(formValues as SøknadFormValues)).toBe(true);
            formValues[SøknadFormField.harBoddUtenforNorgeSiste12Mnd] = YesOrNo.NO;
            formValues[SøknadFormField.skalBoUtenforNorgeNeste12Mnd] = YesOrNo.YES;
            expect(medlemskapStepIsValid(formValues as SøknadFormValues)).toBe(true);
        });

        it(`should be invalid if ${SøknadFormField.harBoddUtenforNorgeSiste12Mnd} is UNANSWERED`, () => {
            formValues[SøknadFormField.harBoddUtenforNorgeSiste12Mnd] = YesOrNo.UNANSWERED;
            formValues[SøknadFormField.skalBoUtenforNorgeNeste12Mnd] = YesOrNo.YES;
            expect(medlemskapStepIsValid(formValues as SøknadFormValues)).toBe(false);
            formValues[SøknadFormField.skalBoUtenforNorgeNeste12Mnd] = YesOrNo.NO;
            expect(medlemskapStepIsValid(formValues as SøknadFormValues)).toBe(false);
        });

        it(`should be invalid if ${SøknadFormField.skalBoUtenforNorgeNeste12Mnd} is UNANSWERED`, () => {
            formValues[SøknadFormField.skalBoUtenforNorgeNeste12Mnd] = YesOrNo.UNANSWERED;
            formValues[SøknadFormField.harBoddUtenforNorgeSiste12Mnd] = YesOrNo.YES;
            expect(medlemskapStepIsValid(formValues as SøknadFormValues)).toBe(false);
            formValues[SøknadFormField.harBoddUtenforNorgeSiste12Mnd] = YesOrNo.NO;
            expect(medlemskapStepIsValid(formValues as SøknadFormValues)).toBe(false);
        });
    });

    describe('legeerklæringStepIsValid', () => {
        it('should always be valid', () => {
            expect(legeerklæringStepIsValid()).toBe(true);
        });
    });
});
