import { useIntl } from 'react-intl';
// import { handleDateRangeValidationError } from '../utils';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
// import { dateToday, prettifyDate } from '@navikt/sif-common-core-ds/lib/utils/dateUtils';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getTypedFormComponents, ISOStringToDate } from '@navikt/sif-common-formik-ds';
import {
    getDateRangeValidator,
    getRequiredFieldValidator,
    getStringValidator,
    ValidateDateError,
    ValidateDateRangeError,
    ValidateRequiredFieldError,
    ValidateStringError,
} from '@navikt/sif-common-formik-ds/lib/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import { date99YearsFromNow, dateToday, prettifyDate } from '@navikt/sif-common-utils/lib';
import { handleDateRangeValidationError } from '../../utils';
import { UtenlandskNæring, UtenlandskNæringFormValues, UtenlandskNæringstype } from './types';
import {
    isValidUtenlandskNæring,
    mapFormValuesToUtenlandskNæring,
    mapUtenlandskNæringToFormValues,
} from './utenlandskNæringUtils';

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

export const UtenlandskNæringFormErrors = {
    [UtenlandskNæringFormField.næringstype]: {
        [ValidateRequiredFieldError.noValue]: 'utenlandskNæringForm.næringstype.noValue',
    },

    [UtenlandskNæringFormField.navnPåVirksomheten]: {
        [ValidateStringError.stringHasNoValue]: 'utenlandskNæringForm.navnPåVirksomheten.stringHasNoValue',
    },

    [UtenlandskNæringFormField.land]: {
        [ValidateRequiredFieldError.noValue]: 'utenlandskNæringForm.land.noValue',
    },

    [UtenlandskNæringFormField.fraOgMed]: {
        [ValidateDateError.dateHasNoValue]: 'utenlandskNæringForm.fraOgMed.dateHasNoValue',
        [ValidateDateError.dateIsAfterMax]: 'utenlandskNæringForm.fraOgMed.dateIsAfterMax',
        [ValidateDateError.dateHasInvalidFormat]: 'utenlandskNæringForm.fraOgMed.dateHasInvalidFormat',
        [ValidateDateRangeError.fromDateIsAfterToDate]: 'utenlandskNæringForm.fraOgMed.fromDateIsAfterToDate',
    },
    [UtenlandskNæringFormField.tilOgMed]: {
        [ValidateDateError.dateHasNoValue]: 'utenlandskNæringForm.tilOgMed.dateHasNoValue',
        [ValidateDateError.dateIsBeforeMin]: 'utenlandskNæringForm.tilOgMed.dateIsBeforeMin',
        [ValidateDateError.dateIsAfterMax]: 'utenlandskNæringForm.tilOgMed.dateIsAfterMax',
        [ValidateDateError.dateHasInvalidFormat]: 'utenlandskNæringForm.tilOgMed.dateHasInvalidFormat',
        [ValidateDateRangeError.toDateIsBeforeFromDate]: 'utenlandskNæringForm.tilOgMed.toDateIsBeforeFromDate',
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
    const getText = (key: string, value?: any): string => intlHelper(intl, `${key}`, value);

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
                        formErrorHandler={getFormErrorHandler(intl, 'utenlandskNæringForm')}>
                        <Form.RadioGroup
                            name={UtenlandskNæringFormField.næringstype}
                            legend={getText('sifForms.utenlandskNæringForm.hvilken_type_virksomhet')}
                            radios={[
                                {
                                    value: UtenlandskNæringstype.FISKE,
                                    label: getText(
                                        `sifForms.utenlandskNæringForm.næringstype_${UtenlandskNæringstype.FISKE}`,
                                    ),
                                },
                                {
                                    value: UtenlandskNæringstype.JORDBRUK_SKOGBRUK,
                                    label: getText(
                                        `sifForms.utenlandskNæringForm.næringstype_${UtenlandskNæringstype.JORDBRUK_SKOGBRUK}`,
                                    ),
                                },
                                {
                                    value: UtenlandskNæringstype.DAGMAMMA,
                                    label: getText(
                                        `sifForms.utenlandskNæringForm.næringstype_${UtenlandskNæringstype.DAGMAMMA}`,
                                    ),
                                },
                                {
                                    value: UtenlandskNæringstype.ANNEN,
                                    label: getText(
                                        `sifForms.utenlandskNæringForm.næringstype_${UtenlandskNæringstype.ANNEN}`,
                                    ),
                                },
                            ]}
                            validate={getRequiredFieldValidator()}
                        />

                        <Block margin="xl">
                            <Form.TextField
                                name={UtenlandskNæringFormField.navnPåVirksomheten}
                                label={getText('sifForms.utenlandskNæringForm.hva_heter_virksomheten')}
                                validate={getStringValidator({ required: true })}
                                maxLength={50}
                            />
                        </Block>

                        <Block margin="xl">
                            <Form.CountrySelect
                                name={UtenlandskNæringFormField.land}
                                label={getText('sifForms.utenlandskNæringForm.registert_i_hvilket_land', {
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
                                label={getText('sifForms.utenlandskNæringForm.organisasjonsnummer')}
                                style={{ maxWidth: '10rem' }}
                                maxLength={30}
                            />
                        </Block>
                        <Block margin="xl">
                            <Form.DateRangePicker
                                legend={getText('sifForms.utenlandskNæringForm.startdato', { navnPåVirksomheten })}
                                dropdownCaption={true}
                                maxDate={dateToday}
                                minDate={date99YearsFromNow}
                                fromInputProps={{
                                    label: getText('sifForms.utenlandskNæringForm.kalender_fom'),
                                    name: UtenlandskNæringFormField.fraOgMed,
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
                                    label: getText('sifForms.utenlandskNæringForm.kalender_tom'),
                                    name: UtenlandskNæringFormField.tilOgMed,
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
                                                  return handleDateRangeValidationError(error, undefined, dateToday);
                                              },
                                }}
                            />
                            <Form.Checkbox
                                label={getText('sifForms.utenlandskNæringForm.kalender_pågående')}
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
