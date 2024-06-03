import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { getTypedFormComponents, ISOStringToDate } from '@navikt/sif-common-formik-ds';
import {
    getDateRangeValidator,
    getRequiredFieldValidator,
    getStringValidator,
    ValidateDateError,
    ValidateDateRangeError,
    ValidateRequiredFieldError,
    ValidateStringError,
} from '@navikt/sif-common-formik-ds/src/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { getDate99YearsFromNow, getDateToday, prettifyDate } from '@navikt/sif-common-utils';
import { handleDateRangeValidationError } from '../../utils';
import { UtenlandskNæring, UtenlandskNæringFormValues, UtenlandskNæringstype } from './types';
import {
    isValidUtenlandskNæring,
    mapFormValuesToUtenlandskNæring,
    mapUtenlandskNæringToFormValues,
} from './utenlandskNæringUtils';
import { useUtenlandskNæringIntl, UtenlandskNæringMessageKeys } from './utenlandskNæringMessages';

interface Props {
    utenlandskNæring?: UtenlandskNæring;
    utenlandskNæringer?: UtenlandskNæring[];
    onSubmit: (values: UtenlandskNæring) => void;
    onCancel: () => void;
}

enum UtenlandskNæringFormField {
    næringstype = 'næringstype',
    navnPåVirksomheten = 'navnPåVirksomheten',
    identifikasjonsnummer = 'identifikasjonsnummer',
    land = 'land',
    fraOgMed = 'fraOgMed',
    tilOgMed = 'tilOgMed',
    erPågående = 'erPågående',
}

export const UtenlandskNæringFormErrors: Record<string, { [key: string]: UtenlandskNæringMessageKeys }> = {
    [UtenlandskNæringFormField.næringstype]: {
        [ValidateRequiredFieldError.noValue]: '@forms.utenlandskNæringForm.næringstype.noValue',
    },

    [UtenlandskNæringFormField.navnPåVirksomheten]: {
        [ValidateStringError.stringHasNoValue]: '@forms.utenlandskNæringForm.navnPåVirksomheten.stringHasNoValue',
    },

    [UtenlandskNæringFormField.land]: {
        [ValidateRequiredFieldError.noValue]: '@forms.utenlandskNæringForm.land.noValue',
    },

    [UtenlandskNæringFormField.fraOgMed]: {
        [ValidateDateError.dateHasNoValue]: '@forms.utenlandskNæringForm.fraOgMed.dateHasNoValue',
        [ValidateDateError.dateIsAfterMax]: '@forms.utenlandskNæringForm.fraOgMed.dateIsAfterMax',
        [ValidateDateError.dateHasInvalidFormat]: '@forms.utenlandskNæringForm.fraOgMed.dateHasInvalidFormat',
        [ValidateDateRangeError.fromDateIsAfterToDate]: '@forms.utenlandskNæringForm.fraOgMed.fromDateIsAfterToDate',
    },
    [UtenlandskNæringFormField.tilOgMed]: {
        [ValidateDateError.dateHasNoValue]: '@forms.utenlandskNæringForm.tilOgMed.dateHasNoValue',
        [ValidateDateError.dateIsBeforeMin]: '@forms.utenlandskNæringForm.tilOgMed.dateIsBeforeMin',
        [ValidateDateError.dateIsAfterMax]: '@forms.utenlandskNæringForm.tilOgMed.dateIsAfterMax',
        [ValidateDateError.dateHasInvalidFormat]: '@forms.utenlandskNæringForm.tilOgMed.dateHasInvalidFormat',
        [ValidateDateRangeError.toDateIsBeforeFromDate]: '@forms.utenlandskNæringForm.tilOgMed.toDateIsBeforeFromDate',
    },
};

const defaultFormValues: UtenlandskNæringFormValues = {
    næringstype: undefined,
    navnPåVirksomheten: undefined,
    identifikasjonsnummer: undefined,
    land: undefined,
    erPågående: undefined,
    fraOgMed: undefined,
    tilOgMed: undefined,
};

const Form = getTypedFormComponents<UtenlandskNæringFormField, UtenlandskNæringFormValues, ValidationError>();

const UtenlandskNæringForm = ({ utenlandskNæring, onSubmit, onCancel }: Props) => {
    const intl = useIntl();
    const { text } = useUtenlandskNæringIntl();

    const onFormikSubmit = (formValues: Partial<UtenlandskNæringFormValues>) => {
        const utenlandskNæringToSubmit = mapFormValuesToUtenlandskNæring(formValues, utenlandskNæring?.id);
        if (isValidUtenlandskNæring(utenlandskNæringToSubmit)) {
            onSubmit({
                ...utenlandskNæringToSubmit,
            });
        } else {
            throw new Error('UtenlandskNæringForm: Formvalues is not a valid Virksomhet on submit.');
        }
    };

    const initialValues = utenlandskNæring ? mapUtenlandskNæringToFormValues(utenlandskNæring) : defaultFormValues;

    return (
        <Form.FormikWrapper
            initialValues={initialValues}
            onSubmit={onFormikSubmit}
            renderForm={(formik) => {
                const { values, setFieldValue } = formik;
                const { navnPåVirksomheten = 'virksomheten' } = values;
                const fomDate = ISOStringToDate(values.fraOgMed);
                const tomDate = ISOStringToDate(values.tilOgMed);
                return (
                    <Form.Form
                        includeButtons={true}
                        onCancel={onCancel}
                        submitButtonLabel="Ok"
                        showButtonArrows={false}
                        formErrorHandler={getFormErrorHandler(intl, '@forms.utenlandskNæringForm')}>
                        <Form.RadioGroup
                            name={UtenlandskNæringFormField.næringstype}
                            legend={text('@forms.utenlandskNæringForm.hvilken_type_virksomhet')}
                            radios={[
                                {
                                    value: UtenlandskNæringstype.FISKE,
                                    label: text(
                                        `@forms.utenlandskNæringForm.næringstype_${UtenlandskNæringstype.FISKE}`,
                                    ),
                                },
                                {
                                    value: UtenlandskNæringstype.JORDBRUK_SKOGBRUK,
                                    label: text(
                                        `@forms.utenlandskNæringForm.næringstype_${UtenlandskNæringstype.JORDBRUK_SKOGBRUK}`,
                                    ),
                                },
                                {
                                    value: UtenlandskNæringstype.DAGMAMMA,
                                    label: text(
                                        `@forms.utenlandskNæringForm.næringstype_${UtenlandskNæringstype.DAGMAMMA}`,
                                    ),
                                },
                                {
                                    value: UtenlandskNæringstype.ANNEN,
                                    label: text(
                                        `@forms.utenlandskNæringForm.næringstype_${UtenlandskNæringstype.ANNEN}`,
                                    ),
                                },
                            ]}
                            validate={getRequiredFieldValidator()}
                        />

                        <Block margin="xl">
                            <Form.TextField
                                name={UtenlandskNæringFormField.navnPåVirksomheten}
                                label={text('@forms.utenlandskNæringForm.hva_heter_virksomheten')}
                                validate={getStringValidator({ required: true })}
                                maxLength={50}
                            />
                        </Block>

                        <Block margin="xl">
                            <Form.CountrySelect
                                name={UtenlandskNæringFormField.land}
                                label={text('@forms.utenlandskNæringForm.registert_i_hvilket_land', {
                                    navnPåVirksomheten,
                                })}
                                validate={getRequiredFieldValidator()}
                                useAlpha3Code={true}
                                showOnlyEuAndEftaCountries={true}
                            />
                        </Block>

                        <Block margin="xl">
                            <Form.TextField
                                name={UtenlandskNæringFormField.identifikasjonsnummer}
                                label={text('@forms.utenlandskNæringForm.organisasjonsnummer')}
                                style={{ maxWidth: '10rem' }}
                                maxLength={30}
                            />
                        </Block>
                        <Block margin="xl">
                            <Form.DateRangePicker
                                legend={text('@forms.utenlandskNæringForm.startdato', { navnPåVirksomheten })}
                                dropdownCaption={true}
                                maxDate={getDateToday()}
                                minDate={getDate99YearsFromNow()}
                                fromInputProps={{
                                    label: text('@forms.utenlandskNæringForm.kalender_fom'),
                                    name: UtenlandskNæringFormField.fraOgMed,
                                    validate: (value) => {
                                        const error = getDateRangeValidator({
                                            required: true,
                                            max: getDateToday(),
                                            toDate: tomDate,
                                        }).validateFromDate(value);
                                        if (error === ValidateDateError.dateIsAfterMax) {
                                            return {
                                                key: error,
                                                values: {
                                                    dato: prettifyDate(getDateToday()),
                                                    navn: navnPåVirksomheten,
                                                },
                                            };
                                        }
                                        return error;
                                    },
                                }}
                                toInputProps={{
                                    label: text('@forms.utenlandskNæringForm.kalender_tom'),
                                    name: UtenlandskNæringFormField.tilOgMed,
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
                                label={text('@forms.utenlandskNæringForm.kalender_pågående')}
                                name={UtenlandskNæringFormField.erPågående}
                                afterOnChange={(checked) => {
                                    if (checked) {
                                        setFieldValue(UtenlandskNæringFormField.tilOgMed, undefined);
                                    }
                                }}
                            />
                        </Block>
                    </Form.Form>
                );
            }}
        />
    );
};

export default UtenlandskNæringForm;
