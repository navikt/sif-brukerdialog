/* eslint-disable no-console */
import { Panel } from '@navikt/ds-react';
import * as React from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { prettifyDate } from '@navikt/sif-common-utils';
import { getTypedFormComponents } from '../../../lib';
import datepickerUtils from '../../../src/components/formik-datepicker/datepickerUtils';
import TypedFormikWrapper from '../../../src/components/typed-formik-wrapper/TypedFormikWrapper';
import {
    getCheckedValidator,
    getDateRangeValidator,
    getDateValidator,
    getFødselsnummerValidator,
    getNumberValidator,
    getOrgNumberValidator,
    getRequiredFieldValidator,
    getStringValidator,
    getYesOrNoValidator,
    ValidateCheckedError,
    ValidateDateError,
    ValidateDateRangeError,
    ValidateFødselsnummerError,
    ValidateNumberError,
    ValidateOrgNumberError,
    ValidateRequiredFieldError,
    ValidateStringError,
    ValidateYesOrNoError,
} from '../../../src/validation';
import getTimeValidator, { ValidateTimeError } from '../../../src/validation/getTimeValidator';
import getIntlFormErrorHandler from '../../../src/validation/intlFormErrorHandler';
import { ValidationError } from '../../../src/validation/types';
import ValidationErrorList from '../../components/validation-error-list/ValidationErrorList';
import ValidationPanel from '../../components/validation-panel/ValidationPanel';
import { FormFields, FormValues } from './types';

const initialValues: FormValues = {
    liste: [],
};

const Form = getTypedFormComponents<FormFields, FormValues, ValidationError>();

const ValidationExample = () => {
    const intl = useIntl();
    return (
        <>
            <h2>Validering</h2>
            <p>sif-common-formik komponenter med validering</p>

            <TypedFormikWrapper<FormValues>
                initialValues={initialValues}
                onSubmit={(values) => {
                    console.log('FormikWrapperSubmit', values);
                }}
                renderForm={(formik) => {
                    const fromDate = datepickerUtils.getDateFromDateString(formik.values.tidsperiode_fra);
                    const toDate = datepickerUtils.getDateFromDateString(formik.values.tidsperiode_til);
                    return (
                        <Form.Form
                            submitButtonLabel="Ok"
                            includeValidationSummary={true}
                            includeButtons={true}
                            formErrorHandler={getIntlFormErrorHandler(intl)}>
                            <ValidationPanel
                                title="Ja/Nei"
                                code={`
export enum ValidateYesOrNoError {
yesOrNoIsUnanswered = 'yesOrNoIsUnanswered',
}

type YesOrNoValidationResult =
| ValidateYesOrNoError.yesOrNoIsUnanswered
| undefined;

const error = getYesOrNoValidator()(value);
                    `}>
                                <Panel>
                                    <Form.YesOrNoQuestion
                                        name={FormFields.jaNeiSpørsmål}
                                        legend="Har du søkt om andre ytelser i perioden du søker for?"
                                        validate={getYesOrNoValidator()}></Form.YesOrNoQuestion>
                                </Panel>
                                <ValidationErrorList
                                    title="Feilmeldinger"
                                    errors={{
                                        [ValidateYesOrNoError.yesOrNoIsUnanswered]: {
                                            info: 'spørsmål er ikke besvart',
                                            example:
                                                'Du må svare ja eller nei på om du har søkt andre ytelser i perioden du søker for',
                                        },
                                    }}
                                />
                            </ValidationPanel>

                            <ValidationPanel
                                title="Fritekst"
                                code={`
export enum ValidateStringError {
    stringHasNoValue = 'stringHasNoValue',
    stringIsNotAString = 'stringIsNotAString',
    stringIsTooShort = 'stringIsTooShort',
    stringIsTooLong = 'stringIsTooLong',
}

type StringValidationResult =
    | undefined
    | ValidateStringError.stringHasNoValue
    | ValidateStringError.stringIsNotAString
    | ValidateStringError.stringIsTooLong
    | ValidateStringError.stringIsTooShort;

type Options = {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
}

const error = getStringValidator(options)(value);
                                    `}>
                                <Panel>
                                    <Form.TextField
                                        name={FormFields.tekst}
                                        label="Hva er navnet på dagen i dag? Bruk mellom 5 og 20 tegn"
                                        width="l"
                                        validate={getStringValidator({
                                            required: true,
                                            maxLength: 20,
                                            minLength: 5,
                                            disallowUnicodeCharacters: true,
                                        })}></Form.TextField>
                                </Panel>
                                <ValidationErrorList
                                    title="Feilmeldinger"
                                    errors={{
                                        [ValidateStringError.stringHasNoValue]: {
                                            info: 'tomt innhold i felt',
                                            example: 'Skriv inn hvilken dag det er i dag',
                                        },
                                        [ValidateStringError.stringIsNotAString]: {
                                            info: 'feil type data',
                                            example: 'Navnet på dagen i dag er ikke gyldig',
                                        },
                                        [ValidateStringError.stringIsTooLong]: {
                                            info: 'for lang tekst',
                                            example: 'Navnet på dagen i dag kan ikke inneholde flere enn 20 tegn.',
                                        },
                                        [ValidateStringError.stringIsTooShort]: {
                                            info: 'for kort tekst',
                                            example: 'Navnet på dagen i dag må inneholde minst 5 tegn',
                                        },
                                        [ValidateStringError.stringContainsUnicodeChacters]: {
                                            info: 'ugyldig tegn',
                                            example: 'Feltet inneholder ett eller flere ugyldige tegn',
                                        },
                                    }}
                                />
                            </ValidationPanel>
                            <ValidationPanel
                                title="Tall"
                                code={`
export enum ValidateNumberError {
    numberHasNoValue = 'numberHasNoValue',
    numberHasInvalidFormat = 'numberHasInvalidFormat',
    numberIsTooSmall = 'numberIsTooSmall',
    numberIsTooLarge = 'numberIsTooLarge'
    numberHasDecimals = 'numberHasDecimals',
}

type NumberValidationResult =
    | undefined
    | ValidateNumberError.numberHasNoValue
    | ValidateNumberError.numberHasInvalidFormat
    | ValidateNumberError.numberIsTooLarge
    | ValidateNumberError.numberIsTooSmall
    |ValidateNumberError.numberHasDecimals;

interface Options {
    required?: boolean;
    min?: number;
    max?: number;
}

const error = getNumberValidator(options)(value);
                                    `}>
                                <Panel>
                                    <Form.NumberInput
                                        name={FormFields.tall}
                                        label="Hva er næringsinntekten for virksomheten?"
                                        width="s"
                                        validate={getNumberValidator({
                                            required: true,
                                            min: 1999,
                                            max: 2021,
                                            allowDecimals: false,
                                        })}></Form.NumberInput>
                                </Panel>
                                <ValidationErrorList
                                    title="Feilmeldinger"
                                    errors={{
                                        [ValidateNumberError.numberHasNoValue]: {
                                            info: 'tomt innhold i felt',
                                            example: 'Du må oppgi næringsinntekt for virksomheten',
                                        },
                                        [ValidateNumberError.numberHasInvalidFormat]: {
                                            info: 'verdien er ikke et tall',
                                            example:
                                                'Du må oppgi et gyldig tall for næringsinntekten i virksomheten. Et gyldig tall inneholder kun siffer.',
                                        },
                                        [ValidateNumberError.numberIsTooSmall]: {
                                            info: 'for lavt tall',
                                            example: `Tallet du har oppgitt som næringsinntekt for virksomheten er for lavt. Tallet kan ikke være lavere enn 0.`,
                                        },
                                        [ValidateNumberError.numberIsTooLarge]: {
                                            info: 'for stort tall',
                                            example: `Tallet du har oppgitt som næringsinntekt for virksomheten er for høyt. Tallet kan ikke være høyere enn 99999999.`,
                                        },
                                        [ValidateNumberError.numberHasDecimals]: {
                                            info: 'tall inneholder desimaler',
                                            example: `Tallet du har oppgitt inneholder desimaler. Oppgi tallet i heltall.`,
                                        },
                                    }}
                                />
                            </ValidationPanel>
                            <ValidationPanel
                                title="Dato"
                                code={`
export enum ValidateDateError {
    dateHasNoValue = 'dateHasNoValue',
    dateHasInvalidFormat = 'dateHasInvalidFormat',
    dateIsBeforeMin = 'dateIsBeforeMin',
    dateIsAfterMax = 'dateIsAfterMax',
    dateIsNotWeekday = 'dateIsNotWeekday',
}

export type DateValidationResult =
    | ValidateDateError.dateHasNoValue
    | ValidateDateError.dateHasInvalidFormat
    | ValidateDateError.dateIsBeforeMin
    | ValidateDateError.dateIsAfterMax
    | ValidateDateError.dateIsNotWeekday
    | undefined;

export interface DateValidationOptions {
    required?: boolean;
    min?: Date;
    max?: Date;
    onlyWeekdays?: boolean;
}

const error = getDateValidator(options)(value);
`}>
                                <Panel>
                                    <Form.DatePicker
                                        name={FormFields.dato}
                                        label={
                                            'Når startet du i arbeidslivet? Dersom dette var en lørdag eller søndag, velg påfølgende mandag.'
                                        }
                                        dropdownCaption={true}
                                        validate={getDateValidator({
                                            required: true,
                                            min: new Date(2015, 0, 1),
                                            max: new Date(),
                                            onlyWeekdays: true,
                                        })}
                                    />
                                </Panel>
                                <ValidationErrorList
                                    title="Feilmeldinger"
                                    errors={{
                                        [ValidateDateError.dateHasNoValue]: {
                                            info: 'tomt innhold i felt',
                                            example:
                                                'Du må oppgi dato for når du begynte i arbeidslivet. Skriv inn eller velg dato fra datovelgeren.',
                                        },
                                        [ValidateDateError.dateHasInvalidFormat]: {
                                            info: 'ugyldig verdi',
                                            example:
                                                'Du må oppgi dato for når du begynte i arbeidslivet i et gyldig format. Gyldig format er dd.mm.åååå.',
                                        },
                                        [ValidateDateError.dateIsBeforeMin]: {
                                            info: 'dato er for tidlig',
                                            example: `Datoen for når du begynte i arbeidslivet kan ikke være før ${prettifyDate(
                                                new Date(2015, 0, 1),
                                            )}. Skriv inn eller velg dato fra datovelgeren.`,
                                        },
                                        [ValidateDateError.dateIsAfterMax]: {
                                            info: 'dato er for sen',
                                            example:
                                                'Datoen for når du begynte i arbeidslivet kan ikke være etter dagens dato. Skriv inn eller velg dato fra datovelgeren.',
                                        },
                                    }}
                                />
                            </ValidationPanel>
                            <ValidationPanel
                                title="Periodevelger"
                                code={`
export enum ValidateDateRangeError {
    toDateIsBeforeFromDate = 'toDateIsBeforeFromDate',
    fromDateIsAfterToDate = 'fromDateIsAfterToDate',
}

type DateRangeValidationResult =
    | DateValidationResult
    | ValidateDateRangeError.fromDateIsAfterToDate
    | ValidateDateRangeError.toDateIsBeforeFromDate
    | undefined;

interface Options extends DateValidationOptions {
    fromDate?: Date;
    toDate?: Date;
}

const errorFromDate = getDateRangeValidator(options).validateFromDate(value);
const errorToDate = getDateRangeValidator(options).validateToDate(value);
                                `}>
                                <Panel>
                                    <Form.DateRangePicker
                                        legend="Når startet og avsluttet du virksomheten?"
                                        fromInputProps={{
                                            label: 'Startdato',
                                            name: FormFields.tidsperiode_fra,
                                            dayPickerProps: { defaultMonth: new Date(2021, 0, 1) },
                                            validate: getDateRangeValidator({
                                                min: new Date(2021, 0, 1),
                                                max: new Date(2021, 11, 31),
                                                toDate,
                                                required: true,
                                                onlyWeekdays: true,
                                            }).validateFromDate,
                                        }}
                                        toInputProps={{
                                            label: 'Sluttdato',
                                            name: FormFields.tidsperiode_til,
                                            dayPickerProps: { defaultMonth: new Date(2021, 11, 31) },
                                            validate: getDateRangeValidator({
                                                min: new Date(2000, 0, 1),
                                                max: new Date(),
                                                fromDate,
                                                required: true,
                                                onlyWeekdays: true,
                                            }).validateToDate,
                                        }}
                                    />
                                </Panel>
                                <ValidationErrorList
                                    title="Feilmeldinger - Startdato"
                                    errors={{
                                        [ValidateDateError.dateHasNoValue]: {
                                            info: 'ingen verdi',
                                            example:
                                                'Du må oppgi hvilken dato du startet virksomheten. Skriv inn eller velg startdato fra datovelgeren.',
                                        },
                                        [ValidateDateError.dateHasInvalidFormat]: {
                                            info: 'ugyldig verdi',
                                            example:
                                                'Du må oppgi startdato for virksomheten i et gyldig format. Gyldig format er dd.mm.ååå.',
                                        },
                                        [ValidateDateError.dateIsBeforeMin]: {
                                            info: 'dato er for tidlig',
                                            example: `Startdatoen for når du startet virksomheten kan ikke være før ${prettifyDate(
                                                new Date(2000, 0, 1),
                                            )}. Skriv inn eller velg startdato fra datovelgeren.`,
                                        },
                                        [ValidateDateError.dateIsAfterMax]: {
                                            info: 'dato er for sen',
                                            example:
                                                'Startdatoen for når du startet virksomhetem må være før dagens dato. Skriv inn eller velg startdato fra datovelgeren.',
                                        },
                                        [ValidateDateRangeError.fromDateIsAfterToDate]: {
                                            info: 'fra-dato er etter til-dato',
                                            example:
                                                'Startdatoen for når du startet virksomheten må være før sluttdatoen, eller på samme dag som sluttdatoen. Skriv inn eller velg dato fra datovelgeren.',
                                        },
                                    }}
                                />
                                <Block margin="xl">
                                    <ValidationErrorList
                                        title="Feilmeldinger - Sluttdato"
                                        errors={{
                                            [ValidateDateError.dateHasNoValue]: {
                                                info: 'ingen verdi',
                                                example:
                                                    'Du må oppgi hvilken dato du avsluttet virksomheten. Skriv inn eller velg dato fra datovelgeren.',
                                            },
                                            [ValidateDateError.dateHasInvalidFormat]: {
                                                info: 'ugyldig verdi',
                                                example:
                                                    'Du må oppgi hvilken dato du avsluttet virksomheten. Skriv inn eller velg dato fra datovelgeren.',
                                            },
                                            [ValidateDateError.dateIsBeforeMin]: {
                                                info: 'dato er for tidlig',
                                                example: `Sluttdatoen for når du avsluttet virksomheten kan ikke være før ${prettifyDate(
                                                    new Date(2000, 0, 1),
                                                )}. Skriv inn eller velg sluttdato fra datovelgeren.`,
                                            },
                                            [ValidateDateError.dateIsAfterMax]: {
                                                info: 'dato er for sen',
                                                example:
                                                    'Sluttdatoen for når du avsluttet virksomhetem må være før dagens dato. Skriv inn eller velg sluttdato fra datovelgeren.',
                                            },
                                            [ValidateDateRangeError.toDateIsBeforeFromDate]: {
                                                info: 'fra-dato er etter til-dato',
                                                example:
                                                    'Sluttdatoen for når du avsluttet virksomheten kan ikke være før startdatoen. Skriv inn eller velg sluttdato fra datovelgeren.',
                                            },
                                        }}
                                    />
                                </Block>
                            </ValidationPanel>
                            <ValidationPanel
                                title="Norsk fødselsnummer/D-nummer"
                                code={`
export enum ValidateFødselsnummerError {
    fødselsnummerHasNoValue = 'fødselsnummerHasNoValue',
    fødselsnummerIsNot11Chars = 'fødselsnummerIsNot11Chars',
    fødselsnummerIsInvalid = 'fødselsnummerIsInvalid',
    fødselsnummerIsNotAllowed = 'fødselsnummerIsNotAllowed',
}

type FødselsnummerValidationResult =
    | ValidateFødselsnummerError.fødselsnummerHasNoValue
    | ValidateFødselsnummerError.fødselsnummerIsNotAllowed
    | ValidateFødselsnummerError.fødselsnummerIsNot11Chars
    | ValidateFødselsnummerError.fødselsnummerIsInvalid
    | undefined;

interface Options {
    required?: boolean;
    /** Andre fødselsnumre som ikke er gyldig - f.eks søkers fødselsnummer */
    disallowedValues?: string[];
}

const error = getFødselsnummerValidator(options)(value);
`}>
                                <Panel>
                                    <Form.TextField
                                        name={FormFields.fødselsnummer}
                                        width="m"
                                        description={
                                            'Eksempelfødselsnummeret "19081988075" er ditt eget, og er ikke tillatt'
                                        }
                                        label="Hva er barnets fødselsnummer / D-nummer?"
                                        validate={getFødselsnummerValidator({
                                            required: true,
                                            disallowedValues: ['19081988075'],
                                        })}
                                    />
                                </Panel>
                                <ValidationErrorList
                                    title="Feilmeldinger"
                                    errors={{
                                        [ValidateFødselsnummerError.fødselsnummerHasNoValue]: {
                                            info: 'ingen verdi',
                                            example: 'Skriv inn barnets fødselsnummer',
                                        },
                                        [ValidateFødselsnummerError.fødselsnummerIsNot11Chars]: {
                                            info: 'ikke 11 tegn',
                                            example:
                                                'Du har oppgitt et ugyldig fødselsnummer. Et gyldig fødselsnummer består av 11 siffer.',
                                        },
                                        [ValidateFødselsnummerError.fødselsnummerIsInvalid]: {
                                            info: 'ikke 11 tegn',
                                            example:
                                                'Du har oppgitt et ugyldig fødselsnummer som ikke består av 11 siffer. Et gyldig fødselsnummer består av 11 siffer.',
                                        },
                                        [ValidateFødselsnummerError.fødselsnummerIsNotAllowed]: {
                                            info: 'ikke tillatt fødselsnummer',
                                            example:
                                                'Du har oppgitt ditt eget fødselsnummer som barnets fødselsnummer. Skriv inn barnets fødselsnummer.',
                                        },
                                    }}
                                />
                            </ValidationPanel>
                            <ValidationPanel
                                title="Organisasjonsnummer"
                                code={`
export enum ValidateOrgNumberError {
    orgNumberHasNoValue = 'orgNumberHasNoValue',
    orgNumberHasInvalidFormat = 'orgNumberHasInvalidFormat',
}

type OrgNumberValidationResult =
    | undefined
    | ValidateOrgNumberError.orgNumberHasNoValue
    | ValidateOrgNumberError.orgNumberHasInvalidFormat;

interface Options {
    required?: boolean;
}

const error = getOrgNumberValidator(options)(value);
`}>
                                <Panel>
                                    <Form.YesOrNoQuestion
                                        name={FormFields.orgnummer}
                                        legend="Hva er NAVs organisasjonsnummer"
                                        validate={getOrgNumberValidator({ required: true })}></Form.YesOrNoQuestion>
                                </Panel>
                                <ValidationErrorList
                                    title="Feilmeldinger"
                                    errors={{
                                        [ValidateOrgNumberError.orgNumberHasNoValue]: {
                                            info: 'ingen verdi',
                                            example:
                                                'Skriv inn organisasjonsnummeret. Et gyldig organsisasjonsnummer inneholder 9 siffer',
                                        },
                                        [ValidateOrgNumberError.orgNumberHasInvalidFormat]: {
                                            info: 'ugyldig orgnummer',
                                            example:
                                                'Du har oppgitt et ugyldig organisasjonsnummer. Oppgi et gyldig organsisasjonsnummer som inneholder 9 siffer.',
                                        },
                                    }}
                                />
                            </ValidationPanel>
                            {/* <ValidationPanel
                                title="Flervalgsliste"
                                code={`
export enum ValidateListError {
    listIsEmpty = 'listIsEmpty',
    listHasTooFewItems = 'listHasTooFewItems',
    listHasTooManyItems = 'listHastooManyItems',
}

type ListValidationResult = undefined | ValidateListError;

interface Options {
    required?: boolean;
    minItems?: number;
    maxItems?: number;
}

const error = getListValidator(options)(value);
`}>
                                <Panel>
                                    <Form.CheckboxPanelGroup
                                        name={FormFields.liste}
                                        legend="Velg dine 2 eller 3 favorittfrukter"
                                        checkboxes={[
                                            {
                                                label: 'Eple',
                                                value: 'eple',
                                            },
                                            {
                                                label: 'Banan',
                                                value: 'Banan',
                                            },
                                            {
                                                label: 'Pære',
                                                value: 'Pære',
                                            },
                                            {
                                                label: 'Jordbær (ja, det er en såkalt "falsk frukt")',
                                                value: 'Jordbær',
                                            },
                                        ]}
                                        validate={getListValidator({
                                            required: true,
                                            minItems: 2,
                                            maxItems: 3,
                                        })}
                                    />
                                </Panel>
                                <ValidationErrorList
                                    title="Feilmeldinger"
                                    errors={{
                                        [ValidateListError.listIsEmpty]: {
                                            info: 'ingen element valgt',
                                            example: 'Velg dine 2 eller 3 favorittfrukter. Huk av i listen.',
                                        },
                                        [ValidateListError.listHasTooFewItems]: {
                                            info: 'for få valgt',
                                            example: 'Du har valgt for få frukter. Du må velge minst 2 frukter.',
                                        },
                                        [ValidateListError.listHasTooManyItems]: {
                                            info: 'for mange valgt',
                                            example:
                                                'Du har valgt for mange frukter. Du kan ikke velge flere enn 3 frukter.',
                                        },
                                    }}
                                />
                            </ValidationPanel>
                            <ValidationPanel
                                title="Enkeltvalg - radioknapper"
                                code={`
export enum ValidateRequiredFieldError {
    'noValue' = 'noValue',
}

type RequiredFieldValidationResult = ValidateRequiredFieldError.noValue | undefined;

const error = getRequiredFieldValidator()(value);
`}>
                                <Panel>
                                    <Form.RadioPanelGroup
                                        name={FormFields.radio}
                                        legend="Velg din éne favorittfrukt"
                                        radios={[
                                            {
                                                label: 'Eple',
                                                value: 'eple',
                                            },
                                            {
                                                label: 'Banan',
                                                value: 'Banan',
                                            },
                                            {
                                                label: 'Pære',
                                                value: 'Pære',
                                            },
                                            {
                                                label: 'Jordbær (ja, det er en såkalt "falsk frukt")',
                                                value: 'Jordbær',
                                            },
                                        ]}
                                        validate={getRequiredFieldValidator()}
                                    />
                                </Panel>
                                <ValidationErrorList
                                    title="Feilmeldinger"
                                    errors={{
                                        [ValidateRequiredFieldError.noValue]: {
                                            info: 'ingen element valgt',
                                            example: 'Du må velge din éne favorittfrukt. Huk av i listen.',
                                        },
                                    }}
                                />
                            </ValidationPanel> */}
                            <ValidationPanel
                                title="Enkeltvalg i liste"
                                code={`
export enum ValidateRequiredFieldError {
    'noValue' = 'noValue',
}

type RequiredFieldValidationResult = ValidateRequiredFieldError.noValue | undefined;

const error = getRequiredFieldValidator()(value);
`}>
                                <p>Samme valideringslogikk som for en radioliste</p>
                                <Panel>
                                    <Form.CountrySelect
                                        name={FormFields.select}
                                        label="Hvilket land er virksomheten registrert i?"
                                        validate={getRequiredFieldValidator()}
                                    />
                                </Panel>
                                <ValidationErrorList
                                    title="Feilmeldinger"
                                    errors={{
                                        [ValidateRequiredFieldError.noValue]: {
                                            info: 'ikke valgt',
                                            example:
                                                'Du må velge hvilket land virksomheten din er registrert i. Velg land fra listen.',
                                        },
                                    }}
                                />
                            </ValidationPanel>
                            <ValidationPanel
                                title="Avkrysningsvalg"
                                code={`
export enum ValidateCheckedError {
    'notChecked' = 'notChecked',
}

type CheckedValidationResult = ValidateCheckedError | undefined;

const error = getCheckedValidator()(value);
                            `}>
                                <Panel>
                                    <Form.Checkbox
                                        name={FormFields.checked}
                                        label="Kryss av for at du bare må krysse av denne checkboxen"
                                        validate={getCheckedValidator()}
                                        value="abc"
                                    />
                                </Panel>
                                <ValidationErrorList
                                    title="Feilmeldinger"
                                    errors={{
                                        [ValidateCheckedError.notChecked]: {
                                            info: 'ikke valgt',
                                            example: 'Du må krysse av for at du bare må gjøre det',
                                        },
                                    }}
                                />
                            </ValidationPanel>

                            <ValidationPanel
                                title="TimeInput"
                                code={`
export enum ValidateTimeError {
    timeHasNoValue = 'timeHasNoValue',
    hoursAreInvalid = 'hoursAreInvalid',
    hoursAreNegative = 'hoursAreNegative',
    minutesAreInvalid = 'minutesAreInvalid',
    minutesAreNegative = 'minutesAreNegative',
    tooManyHours = 'tooManyHours',
    tooManyMinutes = 'tooManyMinutes',
    durationIsTooLong = 'durationIsTooLong',
    durationIsTooShort = 'durationIsTooShort',
}

type TimeValidationResult =
    | undefined
    | ValidateTimeError.timeHasNoValue
    | ValidateTimeError.hoursAreInvalid
    | ValidateTimeError.hoursAreNegative
    | ValidateTimeError.minutesAreInvalid
    | ValidateTimeError.minutesAreNegative
    | ValidateTimeError.durationIsTooLong
    | ValidateTimeError.durationIsTooShort
    | ValidateTimeError.tooManyHours
    | ValidateTimeError.tooManyMinutes;

type TimeRange = {
    hours: number;
    minutes: number;
};

interface Options {
    required?: boolean;
    min?: TimeRange;
    max?: TimeRange;
}

const error = getTimeValidator()(value);
                    `}>
                                <Panel>
                                    <Form.TimeInput
                                        name={FormFields.time}
                                        label="Hvor lenge var barnet i tilsyn 12.10.2020"
                                        validate={(time) => {
                                            const error = getTimeValidator({
                                                required: true,
                                                min: { hours: 0, minutes: 1 },
                                                max: { hours: 7, minutes: 30 },
                                            })(time);
                                            return error
                                                ? {
                                                      key: error,
                                                      values: { dag: 'Torsdag 12.10.2000' },
                                                      keepKeyUnaltered: true,
                                                  }
                                                : undefined;
                                        }}></Form.TimeInput>
                                </Panel>
                                <ValidationErrorList
                                    title="Feilmeldinger"
                                    errors={{
                                        [ValidateTimeError.timeHasNoValue]: {
                                            info: 'spørsmål er ikke besvart',
                                            example: 'Du må fylle ut timer og minutter',
                                        },
                                        [ValidateTimeError.hoursAreInvalid]: {
                                            info: 'ugyldig verdi i feltet for antall timer',
                                            example: 'Antall timer er ikke et gyldig tall',
                                        },
                                        [ValidateTimeError.hoursAreNegative]: {
                                            info: 'antall timer har negativ verdi',
                                            example: 'Antall timer kan ikke være mindre enn 0',
                                        },
                                        [ValidateTimeError.minutesAreInvalid]: {
                                            info: 'ugyldig verdi i feltet for antall minutter',
                                            example: 'Antall minutter er ikke et gyldig tall',
                                        },
                                        [ValidateTimeError.minutesAreNegative]: {
                                            info: 'antall minutter har negativ verdi',
                                            example: 'Antall minutter kan ikke være mindre enn 0',
                                        },
                                        [ValidateTimeError.tooManyHours]: {
                                            info: 'antall timer over 23',
                                            example: 'Antall timer kan ikke overstige 23',
                                        },
                                        [ValidateTimeError.tooManyMinutes]: {
                                            info: 'antall minutter over 59',
                                            example: 'Antall minutter kan ikke overstige 59',
                                        },
                                        [ValidateTimeError.durationIsTooLong]: {
                                            info: 'for lang tid',
                                            example: 'Angitt varighet kan ikke være mer enn {maks}',
                                        },
                                        [ValidateTimeError.durationIsTooShort]: {
                                            info: 'for kort tid',
                                            example: 'Angitt varighet må være minst {min}',
                                        },
                                    }}
                                />
                            </ValidationPanel>
                        </Form.Form>
                    );
                }}
            />
        </>
    );
};

export default ValidationExample;
