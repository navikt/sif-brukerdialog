import { Alert, Heading, Panel } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import {
    getIntlFormErrorHandler,
    getNumberFromNumberInputValue,
    getTypedFormComponents,
    ISOStringToDate,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import {
    getDateRangeValidator,
    getDateValidator,
    getNumberValidator,
    getOrgNumberValidator,
    getRequiredFieldValidator,
    getStringValidator,
    getYesOrNoValidator,
    ValidateDateError,
    ValidateDateRangeError,
    ValidateNumberError,
    ValidateOrgNumberError,
    ValidateRequiredFieldError,
    ValidateStringError,
    ValidateYesOrNoError,
} from '@navikt/sif-validation';
import { ValidationError } from '@navikt/sif-common-formik-ds';
import {
    getDate3YearsAgo,
    getDate4YearsAgo,
    getDate99YearsFromNow,
    getDateToday,
    prettifyDate,
} from '@navikt/sif-common-utils';
import { FormikProps } from 'formik';
import { handleDateRangeValidationError } from '../../utils';
import { isVirksomhet, Næringstype, Virksomhet, VirksomhetFormField, VirksomhetFormValues } from './types';
import { useVirksomhetIntl } from './i18n';
import {
    cleanupVirksomhetFormValues,
    erFiskerNæringstype,
    erVirksomhetRegnetSomNyoppstartet,
    mapFormValuesToVirksomhet,
    mapVirksomhetToFormValues,
} from './virksomhetUtils';

interface Props {
    virksomhet?: Virksomhet;
    skipOrgNumValidation?: boolean;
    harFlereVirksomheter?: boolean;
    onSubmit: (oppdrag: Virksomhet) => void;
    onCancel: () => void;
}

const MAKS_INNTEKT = 10000000;

export const VirksomhetFormErrors = {
    [VirksomhetFormField.næringstype]: {
        [ValidateRequiredFieldError.noValue]: '@forms.virksomhetForm.næringstype.noValue',
    },
    [VirksomhetFormField.fiskerErPåBladB]: {
        [ValidateYesOrNoError.yesOrNoIsUnanswered]: '@forms.virksomhetForm.fiskerErPåBladB.yesOrNoIsUnanswered',
    },
    [VirksomhetFormField.navnPåVirksomheten]: {
        [ValidateStringError.stringHasNoValue]: '@forms.virksomhetForm.navnPåVirksomheten.stringHasNoValue',
        [ValidateStringError.stringContainsUnicodeChacters]:
            '@forms.virksomhetForm.navnPåVirksomheten.stringContainsUnicodeChacters',
    },
    [VirksomhetFormField.registrertINorge]: {
        [ValidateYesOrNoError.yesOrNoIsUnanswered]: '@forms.virksomhetForm.registrertINorge.yesOrNoIsUnanswered',
    },
    [VirksomhetFormField.registrertILand]: {
        [ValidateRequiredFieldError.noValue]: '@forms.virksomhetForm.registrertILand.noValue',
    },
    [VirksomhetFormField.organisasjonsnummer]: {
        [ValidateOrgNumberError.orgNumberHasInvalidFormat]:
            '@forms.virksomhetForm.organisasjonsnummer.orgNumberHasInvalidFormat',
        [ValidateOrgNumberError.orgNumberHasNoValue]: '@forms.virksomhetForm.organisasjonsnummer.orgNumberHasNoValue',
    },
    [VirksomhetFormField.fom]: {
        [ValidateDateError.dateHasNoValue]: '@forms.virksomhetForm.fom.dateHasNoValue',
        [ValidateDateError.dateIsAfterMax]: '@forms.virksomhetForm.fom.dateIsAfterMax',
        [ValidateDateError.dateHasInvalidFormat]: '@forms.virksomhetForm.fom.dateHasInvalidFormat',
        [ValidateDateRangeError.fromDateIsAfterToDate]: '@forms.virksomhetForm.fom.fromDateIsAfterToDate',
    },
    [VirksomhetFormField.tom]: {
        [ValidateDateError.dateHasNoValue]: '@forms.virksomhetForm.tom.dateHasNoValue',
        [ValidateDateError.dateIsBeforeMin]: '@forms.virksomhetForm.tom.dateIsBeforeMin',
        [ValidateDateError.dateIsAfterMax]: '@forms.virksomhetForm.tom.dateIsAfterMax',
        [ValidateDateError.dateHasInvalidFormat]: '@forms.virksomhetForm.tom.dateHasInvalidFormat',
        [ValidateDateRangeError.toDateIsBeforeFromDate]: '@forms.virksomhetForm.tom.toDateIsBeforeFromDate',
    },
    [VirksomhetFormField.næringsinntekt]: {
        [ValidateNumberError.numberHasInvalidFormat]: '@forms.virksomhetForm.næringsinntekt.numberHasInvalidFormat',
        [ValidateNumberError.numberIsTooSmall]: '@forms.virksomhetForm.næringsinntekt.numberIsTooSmall',
        [ValidateNumberError.numberIsTooLarge]: '@forms.virksomhetForm.næringsinntekt.numberIsTooLarge',
        [ValidateNumberError.numberHasNoValue]: '@forms.virksomhetForm.næringsinntekt.numberHasNoValue',
        [ValidateNumberError.numberHasDecimals]: '@forms.virksomhetForm.næringsinntekt.numberHasDecimals',
    },
    [VirksomhetFormField.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene]: {
        [ValidateYesOrNoError.yesOrNoIsUnanswered]:
            '@forms.virksomhetForm.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene.yesOrNoIsUnanswered',
    },
    [VirksomhetFormField.blittYrkesaktivDato]: {
        [ValidateDateError.dateHasNoValue]: '@forms.virksomhetForm.blittYrkesaktivDato.dateHasNoValue',
        [ValidateDateError.dateHasInvalidFormat]: '@forms.virksomhetForm.blittYrkesaktivDato.dateHasInvalidFormat',
        [ValidateDateError.dateIsAfterMax]: '@forms.virksomhetForm.blittYrkesaktivDato.dateIsAfterMax',
        [ValidateDateError.dateIsBeforeMin]: '@forms.virksomhetForm.blittYrkesaktivDato.dateIsBeforeMin',
    },
    [VirksomhetFormField.hattVarigEndringAvNæringsinntektSiste4Kalenderår]: {
        [ValidateYesOrNoError.yesOrNoIsUnanswered]:
            '@forms.virksomhetForm.hattVarigEndringAvNæringsinntektSiste4Kalenderår.yesOrNoIsUnanswered',
    },
    [VirksomhetFormField.varigEndringINæringsinntekt_dato]: {
        [ValidateDateError.dateHasNoValue]: '@forms.virksomhetForm.varigEndringINæringsinntekt_dato.dateHasNoValue',
        [ValidateDateError.dateHasInvalidFormat]:
            '@forms.virksomhetForm.varigEndringINæringsinntekt_dato.dateHasInvalidFormat',
        [ValidateDateError.dateIsAfterMax]: '@forms.virksomhetForm.varigEndringINæringsinntekt_dato.dateIsAfterMax',
        [ValidateDateError.dateIsBeforeMin]: '@forms.virksomhetForm.varigEndringINæringsinntekt_dato.dateIsBeforeMin',
    },
    [VirksomhetFormField.varigEndringINæringsinntekt_inntektEtterEndring]: {
        [ValidateNumberError.numberHasNoValue]:
            '@forms.virksomhetForm.varigEndringINæringsinntekt_inntektEtterEndring.numberHasNoValue',
        [ValidateNumberError.numberHasInvalidFormat]:
            '@forms.virksomhetForm.varigEndringINæringsinntekt_inntektEtterEndring.numberHasInvalidFormat',
        [ValidateNumberError.numberIsTooLarge]:
            '@forms.virksomhetForm.varigEndringINæringsinntekt_inntektEtterEndring.numberIsTooLarge',
        [ValidateNumberError.numberIsTooSmall]:
            '@forms.virksomhetForm.varigEndringINæringsinntekt_inntektEtterEndring.numberIsTooSmall',
        [ValidateNumberError.numberHasDecimals]:
            '@forms.virksomhetForm.varigEndringINæringsinntekt_inntektEtterEndring.numberHasDecimals',
    },
    [VirksomhetFormField.varigEndringINæringsinntekt_forklaring]: {
        [ValidateStringError.stringHasNoValue]:
            '@forms.virksomhetForm.varigEndringINæringsinntekt_forklaring.stringHasNoValue',
        [ValidateStringError.stringIsTooLong]:
            '@forms.virksomhetForm.varigEndringINæringsinntekt_forklaring.stringIsTooLong',
        [ValidateStringError.stringIsTooShort]:
            '@forms.virksomhetForm.varigEndringINæringsinntekt_forklaring.stringIsTooShort',
    },
    [VirksomhetFormField.harRegnskapsfører]: {
        [ValidateYesOrNoError.yesOrNoIsUnanswered]: '@forms.virksomhetForm.harRegnskapsfører.yesOrNoIsUnanswered',
    },
    [VirksomhetFormField.regnskapsfører_navn]: {
        [ValidateStringError.stringHasNoValue]: '@forms.virksomhetForm.regnskapsfører_navn.stringHasNoValue',
        [ValidateStringError.stringIsTooLong]: '@forms.virksomhetForm.regnskapsfører_navn.stringIsTooLong',
        [ValidateStringError.stringIsTooShort]: '@forms.virksomhetForm.regnskapsfører_navn.stringIsTooShort',
        [ValidateStringError.stringContainsUnicodeChacters]:
            '@forms.virksomhetForm.regnskapsfører_navn.stringContainsUnicodeChacters',
    },
    [VirksomhetFormField.regnskapsfører_telefon]: {
        [ValidateStringError.stringHasNoValue]: '@forms.virksomhetForm.regnskapsfører_telefon.stringHasNoValue',
        [ValidateStringError.stringIsTooLong]: '@forms.virksomhetForm.regnskapsfører_telefon.stringIsTooLong',
        [ValidateStringError.stringIsTooShort]: '@forms.virksomhetForm.regnskapsfører_telefon.stringIsTooShort',
        [ValidateStringError.stringContainsUnicodeChacters]:
            '@forms.virksomhetForm.regnskapsfører_telefon.stringContainsUnicodeChacters',
        [ValidateStringError.stringHasInvalidFormat]:
            '@forms.virksomhetForm.regnskapsfører_telefon.stringHasInvalidFormat',
    },
};

const Form = getTypedFormComponents<VirksomhetFormField, VirksomhetFormValues, ValidationError>();

const visNæringsinntekt = (values: VirksomhetFormValues): boolean => {
    const fomDate = ISOStringToDate(values.fom);
    return fomDate !== undefined && erVirksomhetRegnetSomNyoppstartet(fomDate);
};

const ensureValidNæringsinntekt = (values: VirksomhetFormValues): number | undefined => {
    if (visNæringsinntekt(values)) {
        return getNumberFromNumberInputValue(values.næringsinntekt);
    }
    return undefined;
};

const VirksomhetForm = ({ virksomhet, harFlereVirksomheter, onSubmit, onCancel, skipOrgNumValidation }: Props) => {
    const intl = useIntl();
    const { text } = useVirksomhetIntl();

    const onFormikSubmit = (values: VirksomhetFormValues) => {
        const virksomhetToSubmit = mapFormValuesToVirksomhet(values, virksomhet?.id);
        if (isVirksomhet(virksomhetToSubmit)) {
            onSubmit({
                ...virksomhetToSubmit,
                næringsinntekt: ensureValidNæringsinntekt(values),
            });
        } else {
            throw new Error('VirksomhetForm: Formvalues is not a valid Virksomhet on submit.');
        }
    };

    return (
        <Form.FormikWrapper
            initialValues={virksomhet ? mapVirksomhetToFormValues(virksomhet) : {}}
            onSubmit={onFormikSubmit}
            renderForm={(formik: FormikProps<VirksomhetFormValues>) => {
                const { values, setFieldValue } = formik;
                const { navnPåVirksomheten = 'virksomheten', næringstype } = values;
                const fomDate = ISOStringToDate(values.fom);
                const tomDate = ISOStringToDate(values.tom);
                return (
                    <Form.Form
                        includeValidationSummary={true}
                        onCancel={onCancel}
                        formErrorHandler={getIntlFormErrorHandler(intl, '@forms.virksomhetForm')}
                        submitButtonLabel="Ok"
                        showButtonArrows={false}
                        cleanup={cleanupVirksomhetFormValues}>
                        <Form.RadioGroup
                            name={VirksomhetFormField.næringstype}
                            legend={text('@forms.virksomhet.hvilken_type_virksomhet')}
                            radios={[
                                {
                                    value: Næringstype.FISKE,
                                    label: text(`@forms.virksomhet.næringstype_${Næringstype.FISKE}`),
                                },
                                {
                                    value: Næringstype.JORDBRUK_SKOGBRUK,
                                    label: text(`@forms.virksomhet.næringstype_${Næringstype.JORDBRUK_SKOGBRUK}`),
                                },
                                {
                                    value: Næringstype.DAGMAMMA,
                                    label: text(`@forms.virksomhet.næringstype_${Næringstype.DAGMAMMA}`),
                                },
                                {
                                    value: Næringstype.ANNEN,
                                    label: text(`@forms.virksomhet.næringstype_${Næringstype.ANNEN}`),
                                },
                            ]}
                            validate={getRequiredFieldValidator()}
                        />

                        {erFiskerNæringstype(næringstype) && (
                            <Block margin="xl">
                                <Form.YesOrNoQuestion
                                    name={VirksomhetFormField.fiskerErPåBladB}
                                    legend={text('@forms.virksomhet.fisker_blad_b')}
                                    validate={getYesOrNoValidator()}
                                />
                            </Block>
                        )}

                        <Block margin="xl">
                            <Form.TextField
                                name={VirksomhetFormField.navnPåVirksomheten}
                                label={text('@forms.virksomhet.hva_heter_virksomheten')}
                                validate={getStringValidator({ required: true, disallowUnicodeCharacters: true })}
                                maxLength={50}
                            />
                        </Block>

                        <Block margin="xl">
                            <Form.YesOrNoQuestion
                                name={VirksomhetFormField.registrertINorge}
                                legend={text('@forms.virksomhet.registert_i_norge', { navnPåVirksomheten })}
                                validate={getYesOrNoValidator()}
                                description={
                                    erFiskerNæringstype(næringstype) ? (
                                        <ExpandableInfo title={text('@forms.virksomhet.veileder_fisker.tittel')}>
                                            <FormattedMessage
                                                id="@forms.virksomhet.veileder_fisker"
                                                values={{ navnPåVirksomheten }}
                                            />
                                        </ExpandableInfo>
                                    ) : undefined
                                }
                            />
                        </Block>

                        {values.registrertINorge === YesOrNo.NO && (
                            <Block margin="xl">
                                <Form.CountrySelect
                                    name={VirksomhetFormField.registrertILand}
                                    label={text('@forms.virksomhet.registert_i_hvilket_land', {
                                        navnPåVirksomheten,
                                    })}
                                    validate={getRequiredFieldValidator()}
                                />
                            </Block>
                        )}

                        {values.registrertINorge === YesOrNo.YES && (
                            <Block margin="xl">
                                <Form.TextField
                                    name={VirksomhetFormField.organisasjonsnummer}
                                    label={text('@forms.virksomhet.organisasjonsnummer')}
                                    style={{ maxWidth: '10rem' }}
                                    maxLength={9}
                                    validate={
                                        skipOrgNumValidation ? undefined : getOrgNumberValidator({ required: true })
                                    }
                                />
                            </Block>
                        )}

                        {(values.registrertINorge === YesOrNo.YES || values.registrertINorge === YesOrNo.NO) && (
                            <Block margin="xl">
                                <Form.DateRangePicker
                                    legend={text('@forms.virksomhet.startdato', { navnPåVirksomheten })}
                                    dropdownCaption={true}
                                    maxDate={getDateToday()}
                                    minDate={getDate99YearsFromNow()}
                                    fromInputProps={{
                                        label: text('@forms.virksomhet.kalender_fom'),
                                        name: VirksomhetFormField.fom,
                                        validate: (value) => {
                                            const error = getDateRangeValidator({
                                                required: true,
                                                max: getDateToday(),
                                                toDate: tomDate,
                                            }).validateFromDate(value);
                                            if (error === ValidateDateError.dateIsAfterMax) {
                                                return {
                                                    key: error,
                                                    values: { dato: prettifyDate(getDateToday()) },
                                                };
                                            }
                                            return error;
                                        },
                                    }}
                                    toInputProps={{
                                        label: text('@forms.virksomhet.kalender_tom'),
                                        name: VirksomhetFormField.tom,
                                        // disabled: values.erPågående === true,
                                        validate:
                                            values.erPågående === true
                                                ? undefined
                                                : (value) => {
                                                      const error = getDateRangeValidator({
                                                          required: true,
                                                          max: getDateToday(),
                                                          fromDate: fomDate,
                                                      }).validateToDate(value);
                                                      return handleDateRangeValidationError(
                                                          error,
                                                          undefined,
                                                          getDateToday(),
                                                      );
                                                  },
                                    }}
                                />
                                <Form.Checkbox
                                    label={text('@forms.virksomhet.kalender_pågående')}
                                    name={VirksomhetFormField.erPågående}
                                    afterOnChange={(checked) => {
                                        if (checked) {
                                            setFieldValue(VirksomhetFormField.tom, undefined);
                                        }
                                    }}
                                />
                            </Block>
                        )}

                        {fomDate && (
                            <>
                                {harFlereVirksomheter && (
                                    <Block margin="xxl">
                                        {erVirksomhetRegnetSomNyoppstartet(fomDate) ? (
                                            <>
                                                <Heading level="3" size="small">
                                                    {text('@forms.virksomhet.nyoppstartet.næringsinntektFlere.header')}
                                                </Heading>
                                                <p>{text('@forms.virksomhet.nyoppstartet.næringsinntektFlere.info')}</p>
                                            </>
                                        ) : (
                                            <>
                                                <Heading level="3" size="small">
                                                    {text(
                                                        '@forms.virksomhet.ikkeNyoppstartet.næringsinntektFlere.header',
                                                    )}
                                                </Heading>
                                                <p>
                                                    {text(
                                                        '@forms.virksomhet.ikkeNyoppstartet.næringsinntektFlere.info',
                                                    )}
                                                </p>
                                            </>
                                        )}
                                    </Block>
                                )}

                                {/* Nyoppstartet  */}
                                {erVirksomhetRegnetSomNyoppstartet(fomDate) && (
                                    <>
                                        <Block margin="xl">
                                            <Form.NumberInput
                                                name={VirksomhetFormField.næringsinntekt}
                                                label={
                                                    harFlereVirksomheter
                                                        ? text('@forms.virksomhet.næringsinntekt.flereVirksomheter.spm')
                                                        : text('@forms.virksomhet.næringsinntekt.enVirksomhet.spm')
                                                }
                                                integerValue={true}
                                                maxLength={10}
                                                style={{ maxWidth: '10rem' }}
                                                validate={(value) => {
                                                    const error = getNumberValidator({
                                                        required: true,
                                                        min: 0,
                                                        max: MAKS_INNTEKT,
                                                        allowDecimals: false,
                                                    })(value);
                                                    return error
                                                        ? {
                                                              key: error,
                                                              values: {
                                                                  navn: navnPåVirksomheten,
                                                                  maks: intl.formatNumber(MAKS_INNTEKT),
                                                                  min: 0,
                                                              },
                                                          }
                                                        : undefined;
                                                }}
                                                description={
                                                    <>
                                                        {harFlereVirksomheter
                                                            ? text(
                                                                  '@forms.virksomhet.næringsinntekt.flereVirksomheter.spm.description',
                                                              )
                                                            : text(
                                                                  '@forms.virksomhet.næringsinntekt.enVirksomhet.spm.description',
                                                              )}
                                                        <ExpandableInfo
                                                            title={text(
                                                                '@forms.virksomhet.hvaErNæringsresultat.title',
                                                            )}>
                                                            {harFlereVirksomheter
                                                                ? text(
                                                                      '@forms.virksomhet.hvaErNæringsresultat.flereVirksomheter.text',
                                                                  )
                                                                : text(
                                                                      '@forms.virksomhet.hvaErNæringsresultat.enVirksomhet.text',
                                                                  )}
                                                        </ExpandableInfo>
                                                    </>
                                                }
                                            />
                                        </Block>
                                        <Block margin="xl">
                                            <Form.YesOrNoQuestion
                                                name={
                                                    VirksomhetFormField.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene
                                                }
                                                legend={text('@forms.virksomhet.har_blitt_yrkesaktiv')}
                                                validate={getYesOrNoValidator()}
                                                description={
                                                    <ExpandableInfo
                                                        title={text(
                                                            '@forms.virksomhet.har_blitt_yrkesaktiv_info_title',
                                                        )}>
                                                        {text('@forms.virksomhet.har_blitt_yrkesaktiv_info')}
                                                    </ExpandableInfo>
                                                }
                                            />
                                        </Block>
                                        {values.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene ===
                                            YesOrNo.YES && (
                                            <FormBlock margin="m">
                                                <Form.DatePicker
                                                    name={VirksomhetFormField.blittYrkesaktivDato}
                                                    label={text('@forms.virksomhet.har_blitt_yrkesaktiv_dato')}
                                                    dropdownCaption={true}
                                                    minDate={getDate3YearsAgo()}
                                                    maxDate={getDateToday()}
                                                    validate={getDateValidator({
                                                        required: true,
                                                        max: getDateToday(),
                                                        min: getDate3YearsAgo(),
                                                    })}
                                                />
                                            </FormBlock>
                                        )}
                                    </>
                                )}

                                {/* Ikke nyoppstartet */}
                                {erVirksomhetRegnetSomNyoppstartet(fomDate) === false && (
                                    <>
                                        <Block margin="xl">
                                            <Form.YesOrNoQuestion
                                                name={
                                                    VirksomhetFormField.hattVarigEndringAvNæringsinntektSiste4Kalenderår
                                                }
                                                legend={text('@forms.virksomhet.varig_endring_spm')}
                                                validate={getYesOrNoValidator()}
                                            />
                                        </Block>
                                        {values.hattVarigEndringAvNæringsinntektSiste4Kalenderår === YesOrNo.YES && (
                                            <>
                                                <Block margin="xl">
                                                    <Form.DatePicker
                                                        name={VirksomhetFormField.varigEndringINæringsinntekt_dato}
                                                        label={text('@forms.virksomhet.varig_endring_dato')}
                                                        validate={(value) => {
                                                            const error = getDateValidator({
                                                                required: true,
                                                                min: getDate4YearsAgo(),
                                                                max: getDateToday(),
                                                            })(value);
                                                            if (error) {
                                                                return {
                                                                    key: error,
                                                                    values: {
                                                                        navn: navnPåVirksomheten,
                                                                        min: prettifyDate(getDate4YearsAgo()),
                                                                        max: prettifyDate(getDateToday()),
                                                                    },
                                                                };
                                                            }
                                                        }}
                                                        minDate={getDate4YearsAgo()}
                                                        maxDate={getDateToday()}
                                                    />
                                                </Block>
                                                <Block margin="xl">
                                                    <Form.NumberInput
                                                        name={
                                                            VirksomhetFormField.varigEndringINæringsinntekt_inntektEtterEndring
                                                        }
                                                        label={text('@forms.virksomhet.varig_endring_inntekt')}
                                                        maxLength={10}
                                                        integerValue={true}
                                                        style={{ maxWidth: '10rem' }}
                                                        validate={(value) => {
                                                            const error = getNumberValidator({
                                                                required: true,
                                                                min: 0,
                                                                max: MAKS_INNTEKT,
                                                                allowDecimals: false,
                                                            })(value);
                                                            return error
                                                                ? {
                                                                      key: error,
                                                                      values: {
                                                                          navn: navnPåVirksomheten,
                                                                          min: 0,
                                                                          maks: MAKS_INNTEKT,
                                                                      },
                                                                  }
                                                                : undefined;
                                                        }}
                                                    />
                                                </Block>
                                                <Block margin="xl">
                                                    <Form.Textarea
                                                        name={
                                                            VirksomhetFormField.varigEndringINæringsinntekt_forklaring
                                                        }
                                                        label={text('@forms.virksomhet.varig_endring_tekst')}
                                                        maxLength={1000}
                                                        validate={(value) => {
                                                            const error = getStringValidator({
                                                                required: true,
                                                                minLength: 5,
                                                                maxLength: 1000,
                                                            })(value);
                                                            return error
                                                                ? {
                                                                      key: error,
                                                                      values: {
                                                                          navn: navnPåVirksomheten,
                                                                          min: 5,
                                                                          maks: 1000,
                                                                      },
                                                                  }
                                                                : undefined;
                                                        }}
                                                    />
                                                </Block>
                                            </>
                                        )}
                                    </>
                                )}

                                {values.registrertINorge === YesOrNo.YES && (
                                    <>
                                        <Block margin="xl">
                                            <Form.YesOrNoQuestion
                                                name={VirksomhetFormField.harRegnskapsfører}
                                                legend={text('@forms.virksomhet.regnskapsfører_spm')}
                                                validate={getYesOrNoValidator()}
                                                description={text('@forms.virksomhet.regnskapsfører_telefon_info')}
                                            />
                                        </Block>
                                        {values.harRegnskapsfører === YesOrNo.YES && (
                                            <FormBlock margin="m">
                                                <Panel border={true}>
                                                    <Form.TextField
                                                        name={VirksomhetFormField.regnskapsfører_navn}
                                                        label={text('@forms.virksomhet.regnskapsfører_navn')}
                                                        validate={(value) => {
                                                            const error = getStringValidator({
                                                                required: true,
                                                                minLength: 2,
                                                                maxLength: 50,
                                                            })(value);

                                                            return error
                                                                ? {
                                                                      key: error,
                                                                      values: {
                                                                          navn: navnPåVirksomheten,
                                                                          min: 2,
                                                                          maks: 1000,
                                                                          disallowUnicodeCharacters: true,
                                                                      },
                                                                  }
                                                                : undefined;
                                                        }}
                                                        maxLength={50}
                                                    />
                                                    <Block margin="xl">
                                                        <Form.TextField
                                                            name={VirksomhetFormField.regnskapsfører_telefon}
                                                            label={text('@forms.virksomhet.regnskapsfører_telefon')}
                                                            validate={(value) => {
                                                                const error = getStringValidator({
                                                                    required: true,
                                                                    minLength: 5,
                                                                    maxLength: 15,
                                                                    formatRegExp: /^[0-9+ ]+$/,
                                                                    disallowUnicodeCharacters: true,
                                                                })(value);

                                                                return error
                                                                    ? {
                                                                          key: error,
                                                                          values: {
                                                                              navn: navnPåVirksomheten,
                                                                              min: 5,
                                                                              maks: 15,
                                                                          },
                                                                      }
                                                                    : undefined;
                                                            }}
                                                            maxLength={15}
                                                        />
                                                    </Block>
                                                </Panel>
                                            </FormBlock>
                                        )}
                                    </>
                                )}
                                {values.harRegnskapsfører === YesOrNo.YES && (
                                    <Block margin="xl">
                                        <Alert variant="info">
                                            {text('@forms.virksomhet.veileder_innhenter_info.1')}
                                            <br />
                                            {text('@forms.virksomhet.veileder_innhenter_info.2')}
                                        </Alert>
                                    </Block>
                                )}
                            </>
                        )}
                    </Form.Form>
                );
            }}
        />
    );
};

export default VirksomhetForm;
