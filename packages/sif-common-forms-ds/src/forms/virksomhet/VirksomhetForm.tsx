import { Alert, Heading, Panel } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import {
    getNumberFromNumberInputValue,
    getTypedFormComponents,
    ISOStringToDate,
    YesOrNo,
} from '@navikt/sif-common-formik-ds/lib';
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
} from '@navikt/sif-common-formik-ds/lib/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import {
    date3YearsAgo,
    date4YearsAgo,
    date99YearsFromNow,
    dateToday,
    prettifyDate,
} from '@navikt/sif-common-utils/lib';
import { FormikProps } from 'formik';
import { handleDateRangeValidationError } from '../../utils';
import { isVirksomhet, Næringstype, Virksomhet, VirksomhetFormField, VirksomhetFormValues } from './types';
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
        [ValidateRequiredFieldError.noValue]: 'virksomhetForm.næringstype.noValue',
    },
    [VirksomhetFormField.fiskerErPåBladB]: {
        [ValidateYesOrNoError.yesOrNoIsUnanswered]: 'virksomhetForm.fiskerErPåBladB.yesOrNoIsUnanswered',
    },
    [VirksomhetFormField.navnPåVirksomheten]: {
        [ValidateStringError.stringHasNoValue]: 'virksomhetForm.navnPåVirksomheten.stringHasNoValue',
        [ValidateStringError.stringContainsUnicodeChacters]:
            'virksomhetForm.navnPåVirksomheten.stringContainsUnicodeChacters',
    },
    [VirksomhetFormField.registrertINorge]: {
        [ValidateYesOrNoError.yesOrNoIsUnanswered]: 'virksomhetForm.registrertINorge.yesOrNoIsUnanswered',
    },
    [VirksomhetFormField.registrertILand]: {
        [ValidateRequiredFieldError.noValue]: 'virksomhetForm.registrertILand.noValue',
    },
    [VirksomhetFormField.organisasjonsnummer]: {
        [ValidateOrgNumberError.orgNumberHasInvalidFormat]:
            'virksomhetForm.organisasjonsnummer.orgNumberHasInvalidFormat',
    },
    [VirksomhetFormField.fom]: {
        [ValidateDateError.dateHasNoValue]: 'virksomhetForm.fom.dateHasNoValue',
        [ValidateDateError.dateIsAfterMax]: 'virksomhetForm.fom.dateIsAfterMax',
        [ValidateDateError.dateHasInvalidFormat]: 'virksomhetForm.fom.dateHasInvalidFormat',
        [ValidateDateRangeError.fromDateIsAfterToDate]: 'virksomhetForm.fom.fromDateIsAfterToDate',
    },
    [VirksomhetFormField.tom]: {
        [ValidateDateError.dateHasNoValue]: 'virksomhetForm.tom.dateHasNoValue',
        [ValidateDateError.dateIsBeforeMin]: 'virksomhetForm.tom.dateIsBeforeMin',
        [ValidateDateError.dateIsAfterMax]: 'virksomhetForm.tom.dateIsAfterMax',
        [ValidateDateError.dateHasInvalidFormat]: 'virksomhetForm.tom.dateHasInvalidFormat',
        [ValidateDateRangeError.toDateIsBeforeFromDate]: 'virksomhetForm.tom.toDateIsBeforeFromDate',
    },
    [VirksomhetFormField.næringsinntekt]: {
        [ValidateNumberError.numberHasInvalidFormat]: 'virksomhetForm.næringsinntekt.numberHasInvalidFormat',
        [ValidateNumberError.numberIsTooSmall]: 'virksomhetForm.næringsinntekt.numberIsTooSmall',
        [ValidateNumberError.numberIsTooLarge]: 'virksomhetForm.næringsinntekt.numberIsTooLarge',
    },
    [VirksomhetFormField.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene]: {
        [ValidateYesOrNoError.yesOrNoIsUnanswered]:
            'virksomhetForm.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene.yesOrNoIsUnanswered',
    },
    [VirksomhetFormField.blittYrkesaktivDato]: {
        [ValidateDateError.dateHasNoValue]: 'virksomhetForm.blittYrkesaktivDato.dateHasNoValue',
        [ValidateDateError.dateHasInvalidFormat]: 'virksomhetForm.blittYrkesaktivDato.dateHasInvalidFormat',
        [ValidateDateError.dateIsAfterMax]: 'virksomhetForm.blittYrkesaktivDato.dateIsAfterMax',
        [ValidateDateError.dateIsBeforeMin]: 'virksomhetForm.blittYrkesaktivDato.dateIsBeforeMin',
    },
    [VirksomhetFormField.hattVarigEndringAvNæringsinntektSiste4Kalenderår]: {
        [ValidateYesOrNoError.yesOrNoIsUnanswered]:
            'virksomhetForm.hattVarigEndringAvNæringsinntektSiste4Kalenderår.yesOrNoIsUnanswered',
    },
    [VirksomhetFormField.varigEndringINæringsinntekt_dato]: {
        [ValidateDateError.dateHasNoValue]: 'virksomhetForm.varigEndringINæringsinntekt_dato.dateHasNoValue',
        [ValidateDateError.dateHasInvalidFormat]:
            'virksomhetForm.varigEndringINæringsinntekt_dato.dateHasInvalidFormat',
        [ValidateDateError.dateIsAfterMax]: 'virksomhetForm.varigEndringINæringsinntekt_dato.dateIsAfterMax',
        [ValidateDateError.dateIsBeforeMin]: 'virksomhetForm.varigEndringINæringsinntekt_dato.dateIsBeforeMin',
    },
    [VirksomhetFormField.varigEndringINæringsinntekt_inntektEtterEndring]: {
        [ValidateNumberError.numberHasNoValue]:
            'virksomhetForm.varigEndringINæringsinntekt_inntektEtterEndring.numberHasNoValue',
        [ValidateNumberError.numberHasInvalidFormat]:
            'virksomhetForm.varigEndringINæringsinntekt_inntektEtterEndring.numberHasInvalidFormat',
        [ValidateNumberError.numberIsTooLarge]:
            'virksomhetForm.varigEndringINæringsinntekt_inntektEtterEndring.numberIsTooLarge',
        [ValidateNumberError.numberIsTooSmall]:
            'virksomhetForm.varigEndringINæringsinntekt_inntektEtterEndring.numberIsTooSmall',
    },
    [VirksomhetFormField.varigEndringINæringsinntekt_forklaring]: {
        [ValidateStringError.stringHasNoValue]:
            'virksomhetForm.varigEndringINæringsinntekt_forklaring.stringHasNoValue',
        [ValidateStringError.stringIsTooLong]: 'virksomhetForm.varigEndringINæringsinntekt_forklaring.stringIsTooLong',
        [ValidateStringError.stringIsTooShort]:
            'virksomhetForm.varigEndringINæringsinntekt_forklaring.stringIsTooShort',
    },
    [VirksomhetFormField.harRegnskapsfører]: {
        [ValidateYesOrNoError.yesOrNoIsUnanswered]: 'virksomhetForm.harRegnskapsfører.yesOrNoIsUnanswered',
    },
    [VirksomhetFormField.regnskapsfører_navn]: {
        [ValidateStringError.stringHasNoValue]: 'virksomhetForm.regnskapsfører_navn.stringHasNoValue',
        [ValidateStringError.stringIsTooLong]: 'virksomhetForm.regnskapsfører_navn.stringIsTooLong',
        [ValidateStringError.stringIsTooShort]: 'virksomhetForm.regnskapsfører_navn.stringIsTooShort',
        [ValidateStringError.stringContainsUnicodeChacters]:
            'virksomhetForm.regnskapsfører_navn.stringContainsUnicodeChacters',
    },
    [VirksomhetFormField.regnskapsfører_telefon]: {
        [ValidateStringError.stringHasNoValue]: 'virksomhetForm.regnskapsfører_telefon.stringHasNoValue',
        [ValidateStringError.stringIsTooLong]: 'virksomhetForm.regnskapsfører_telefon.stringIsTooLong',
        [ValidateStringError.stringIsTooShort]: 'virksomhetForm.regnskapsfører_telefon.stringIsTooShort',
        [ValidateStringError.stringContainsUnicodeChacters]:
            'virksomhetForm.regnskapsfører_telefon.stringContainsUnicodeChacters',
        [ValidateStringError.stringHasInvalidFormat]: 'virksomhetForm.regnskapsfører_telefon.stringHasInvalidFormat',
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
    const getText = (key: string, value?: any): string => intlHelper(intl, `${key}`, value);

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
                        formErrorHandler={getFormErrorHandler(intl, 'virksomhetForm')}
                        submitButtonLabel="Ok"
                        showButtonArrows={false}
                        cleanup={cleanupVirksomhetFormValues}>
                        <Form.RadioGroup
                            name={VirksomhetFormField.næringstype}
                            legend={getText('sifForms.virksomhet.hvilken_type_virksomhet')}
                            radios={[
                                {
                                    value: Næringstype.FISKE,
                                    label: getText(`sifForms.virksomhet.næringstype_${Næringstype.FISKE}`),
                                },
                                {
                                    value: Næringstype.JORDBRUK_SKOGBRUK,
                                    label: getText(`sifForms.virksomhet.næringstype_${Næringstype.JORDBRUK_SKOGBRUK}`),
                                },
                                {
                                    value: Næringstype.DAGMAMMA,
                                    label: getText(`sifForms.virksomhet.næringstype_${Næringstype.DAGMAMMA}`),
                                },
                                {
                                    value: Næringstype.ANNEN,
                                    label: getText(`sifForms.virksomhet.næringstype_${Næringstype.ANNEN}`),
                                },
                            ]}
                            validate={getRequiredFieldValidator()}
                        />

                        {erFiskerNæringstype(næringstype) && (
                            <Block margin="xl">
                                <Form.YesOrNoQuestion
                                    name={VirksomhetFormField.fiskerErPåBladB}
                                    legend={getText('sifForms.virksomhet.fisker_blad_b')}
                                    validate={getYesOrNoValidator()}
                                />
                            </Block>
                        )}

                        <Block margin="xl">
                            <Form.TextField
                                name={VirksomhetFormField.navnPåVirksomheten}
                                label={getText('sifForms.virksomhet.hva_heter_virksomheten')}
                                validate={getStringValidator({ required: true, disallowUnicodeCharacters: true })}
                                maxLength={50}
                            />
                        </Block>

                        <Block margin="xl">
                            <Form.YesOrNoQuestion
                                name={VirksomhetFormField.registrertINorge}
                                legend={getText('sifForms.virksomhet.registert_i_norge', { navnPåVirksomheten })}
                                validate={getYesOrNoValidator()}
                                description={
                                    erFiskerNæringstype(næringstype) ? (
                                        <ExpandableInfo
                                            title={intlHelper(intl, 'sifForms.virksomhet.veileder_fisker.tittel')}>
                                            <FormattedMessage
                                                id="sifForms.virksomhet.veileder_fisker"
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
                                    label={getText('sifForms.virksomhet.registert_i_hvilket_land', {
                                        navnPåVirksomheten,
                                    })}
                                    validate={getRequiredFieldValidator()}
                                    useAlpha3Code={true}
                                />
                            </Block>
                        )}

                        {values.registrertINorge === YesOrNo.YES && (
                            <Block margin="xl">
                                <Form.TextField
                                    name={VirksomhetFormField.organisasjonsnummer}
                                    label={getText('sifForms.virksomhet.organisasjonsnummer')}
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
                                    legend={getText('sifForms.virksomhet.startdato', { navnPåVirksomheten })}
                                    dropdownCaption={true}
                                    maxDate={dateToday}
                                    minDate={date99YearsFromNow}
                                    fromInputProps={{
                                        label: getText('sifForms.virksomhet.kalender_fom'),
                                        name: VirksomhetFormField.fom,
                                        validate: (value) => {
                                            const error = getDateRangeValidator({
                                                required: true,
                                                max: dateToday,
                                                toDate: tomDate,
                                            }).validateFromDate(value);
                                            if (error === ValidateDateError.dateIsAfterMax) {
                                                return {
                                                    key: error,
                                                    values: { dato: prettifyDate(dateToday) },
                                                };
                                            }
                                            return error;
                                        },
                                    }}
                                    toInputProps={{
                                        label: getText('sifForms.virksomhet.kalender_tom'),
                                        name: VirksomhetFormField.tom,
                                        // disabled: values.erPågående === true,
                                        validate:
                                            values.erPågående === true
                                                ? undefined
                                                : (value) => {
                                                      const error = getDateRangeValidator({
                                                          required: true,
                                                          max: dateToday,
                                                          fromDate: fomDate,
                                                      }).validateToDate(value);
                                                      return handleDateRangeValidationError(
                                                          error,
                                                          undefined,
                                                          dateToday,
                                                      );
                                                  },
                                    }}
                                />
                                <Form.Checkbox
                                    label={getText('sifForms.virksomhet.kalender_pågående')}
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
                                                    {getText(
                                                        'sifForms.virksomhet.nyoppstartet.næringsinntektFlere.header',
                                                    )}
                                                </Heading>
                                                <p>
                                                    {getText(
                                                        'sifForms.virksomhet.nyoppstartet.næringsinntektFlere.info',
                                                    )}
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <Heading level="3" size="small">
                                                    {getText(
                                                        'sifForms.virksomhet.ikkeNyoppstartet.næringsinntektFlere.header',
                                                    )}
                                                </Heading>
                                                <p>
                                                    {getText(
                                                        'sifForms.virksomhet.ikkeNyoppstartet.næringsinntektFlere.info',
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
                                                        ? getText(
                                                              'sifForms.virksomhet.næringsinntekt.flereVirksomheter.spm',
                                                          )
                                                        : getText('sifForms.virksomhet.næringsinntekt.enVirksomhet.spm')
                                                }
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
                                                                  maks: MAKS_INNTEKT,
                                                                  min: 0,
                                                              },
                                                          }
                                                        : undefined;
                                                }}
                                                description={
                                                    <>
                                                        {harFlereVirksomheter
                                                            ? getText(
                                                                  'sifForms.virksomhet.næringsinntekt.flereVirksomheter.spm.description',
                                                              )
                                                            : getText(
                                                                  'sifForms.virksomhet.næringsinntekt.enVirksomhet.spm.description',
                                                              )}
                                                        <ExpandableInfo
                                                            title={getText(
                                                                'sifForms.virksomhet.hvaErNæringsresultat.title',
                                                            )}>
                                                            {harFlereVirksomheter
                                                                ? getText(
                                                                      'sifForms.virksomhet.hvaErNæringsresultat.flereVirksomheter.text',
                                                                  )
                                                                : getText(
                                                                      'sifForms.virksomhet.hvaErNæringsresultat.enVirksomhet.text',
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
                                                legend={getText('sifForms.virksomhet.har_blitt_yrkesaktiv')}
                                                validate={getYesOrNoValidator()}
                                                description={
                                                    <ExpandableInfo
                                                        title={getText(
                                                            'sifForms.virksomhet.har_blitt_yrkesaktiv_info_title',
                                                        )}>
                                                        {getText('sifForms.virksomhet.har_blitt_yrkesaktiv_info')}
                                                    </ExpandableInfo>
                                                }
                                            />
                                        </Block>
                                        {values.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene ===
                                            YesOrNo.YES && (
                                            <FormBlock margin="m">
                                                <Form.DatePicker
                                                    name={VirksomhetFormField.blittYrkesaktivDato}
                                                    label={getText('sifForms.virksomhet.har_blitt_yrkesaktiv_dato')}
                                                    dropdownCaption={true}
                                                    minDate={date3YearsAgo}
                                                    maxDate={dateToday}
                                                    validate={getDateValidator({
                                                        required: true,
                                                        max: dateToday,
                                                        min: date3YearsAgo,
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
                                                legend={getText('sifForms.virksomhet.varig_endring_spm')}
                                                validate={getYesOrNoValidator()}
                                            />
                                        </Block>
                                        {values.hattVarigEndringAvNæringsinntektSiste4Kalenderår === YesOrNo.YES && (
                                            <>
                                                <Block margin="xl">
                                                    <Form.DatePicker
                                                        name={VirksomhetFormField.varigEndringINæringsinntekt_dato}
                                                        label={getText('sifForms.virksomhet.varig_endring_dato')}
                                                        validate={(value) => {
                                                            const error = getDateValidator({
                                                                required: true,
                                                                min: date4YearsAgo,
                                                                max: dateToday,
                                                            })(value);
                                                            if (error) {
                                                                return {
                                                                    key: error,
                                                                    values: {
                                                                        navn: navnPåVirksomheten,
                                                                        min: prettifyDate(date4YearsAgo),
                                                                        max: prettifyDate(dateToday),
                                                                    },
                                                                };
                                                            }
                                                        }}
                                                        minDate={date4YearsAgo}
                                                        maxDate={dateToday}
                                                    />
                                                </Block>
                                                <Block margin="xl">
                                                    <Form.NumberInput
                                                        name={
                                                            VirksomhetFormField.varigEndringINæringsinntekt_inntektEtterEndring
                                                        }
                                                        label={getText('sifForms.virksomhet.varig_endring_inntekt')}
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
                                                        label={getText('sifForms.virksomhet.varig_endring_tekst')}
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
                                                legend={getText('sifForms.virksomhet.regnskapsfører_spm')}
                                                validate={getYesOrNoValidator()}
                                                description={getText('sifForms.virksomhet.regnskapsfører_telefon_info')}
                                            />
                                        </Block>
                                        {values.harRegnskapsfører === YesOrNo.YES && (
                                            <FormBlock margin="m">
                                                <Panel border={true}>
                                                    <Form.TextField
                                                        name={VirksomhetFormField.regnskapsfører_navn}
                                                        label={getText('sifForms.virksomhet.regnskapsfører_navn')}
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
                                                            label={getText(
                                                                'sifForms.virksomhet.regnskapsfører_telefon',
                                                            )}
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
                                            {getText('sifForms.virksomhet.veileder_innhenter_info.1')}
                                            <br />
                                            {getText('sifForms.virksomhet.veileder_innhenter_info.2')}
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
