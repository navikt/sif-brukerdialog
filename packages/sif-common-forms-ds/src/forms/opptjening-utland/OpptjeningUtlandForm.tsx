import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { getIntlFormErrorHandler, getTypedFormComponents, ISOStringToDate } from '@navikt/sif-common-formik-ds';
import {
    getDateRangeValidator,
    getRequiredFieldValidator,
    ValidateDateError,
    ValidateDateRangeError,
    ValidateRequiredFieldError,
} from '@navikt/sif-validation';
import { ValidationError } from '@navikt/sif-common-formik-ds';
import { hasValue } from '@navikt/sif-validation';
import { handleDateRangeValidationError } from '../../utils';
import { OpptjeningUtlandMessageKeys, useOpptjeningUtlandIntl } from './opptjeningUtlandMessages';
import utils from './opptjeningUtlandUtils';
import { OpptjeningAktivitet, OpptjeningUtland, OpptjeningUtlandFormValues } from './types';

interface Props {
    minDate: Date;
    maxDate: Date;
    opptjening?: OpptjeningUtland;
    alleOpptjening?: OpptjeningUtland[];
    onSubmit: (values: OpptjeningUtland) => void;
    onCancel: () => void;
}

enum OpptjeningUtlandFormFields {
    fom = 'fom',
    tom = 'tom',
    landkode = 'landkode',
    opptjeningType = 'opptjeningType',
    navn = 'navn',
}

export const OpptjeningUtlandFormErrors: Record<
    OpptjeningUtlandFormFields,
    { [key: string]: OpptjeningUtlandMessageKeys }
> = {
    [OpptjeningUtlandFormFields.fom]: {
        [ValidateDateError.dateHasNoValue]: '@forms.opptjeningUtlandForm.fom.dateHasNoValue',
        [ValidateDateRangeError.fromDateIsAfterToDate]: '@forms.opptjeningUtlandForm.fom.fromDateIsAfterToDate',
        [ValidateDateError.dateHasInvalidFormat]: '@forms.opptjeningUtlandForm.fom.dateHasInvalidFormat',
        [ValidateDateError.dateIsBeforeMin]: '@forms.opptjeningUtlandForm.fom.dateIsBeforeMin',
        [ValidateDateError.dateIsAfterMax]: '@forms.opptjeningUtlandForm.fom.dateIsAfterMax',
    },
    [OpptjeningUtlandFormFields.tom]: {
        [ValidateDateError.dateHasNoValue]: '@forms.opptjeningUtlandForm.tom.dateHasNoValue',
        [ValidateDateRangeError.toDateIsBeforeFromDate]: '@forms.opptjeningUtlandForm.tom.toDateIsBeforeFromDate',
        [ValidateDateError.dateHasInvalidFormat]: '@forms.opptjeningUtlandForm.tom.dateHasInvalidFormat',
        [ValidateDateError.dateIsBeforeMin]: '@forms.opptjeningUtlandForm.tom.dateIsBeforeMin',
        [ValidateDateError.dateIsAfterMax]: '@forms.opptjeningUtlandForm.tom.dateIsAfterMax',
    },
    [OpptjeningUtlandFormFields.landkode]: {
        [ValidateRequiredFieldError.noValue]: '@forms.opptjeningUtlandForm.landkode.noValue',
    },
    [OpptjeningUtlandFormFields.opptjeningType]: {
        [ValidateRequiredFieldError.noValue]: '@forms.opptjeningUtlandForm.type.noValue',
    },
    [OpptjeningUtlandFormFields.navn]: {
        [ValidateRequiredFieldError.noValue]: '@forms.opptjeningUtlandForm.navn.noValue',
    },
};

const defaultFormValues: OpptjeningUtlandFormValues = {
    fom: undefined,
    tom: undefined,
    landkode: undefined,
    opptjeningType: undefined,
    navn: undefined,
};

const Form = getTypedFormComponents<OpptjeningUtlandFormFields, OpptjeningUtlandFormValues, ValidationError>();

const OpptjeningUtlandForm = ({ maxDate, minDate, opptjening, onSubmit, onCancel }: Props) => {
    const intl = useIntl();
    const { text } = useOpptjeningUtlandIntl();

    const onFormikSubmit = (formValues: Partial<OpptjeningUtlandFormValues>) => {
        const opptjeningUtlandToSubmit = utils.mapFormValuesToOpptjeningUtland(formValues, opptjening?.id);
        if (utils.isValidOpptjeningUtland(opptjeningUtlandToSubmit)) {
            onSubmit({
                ...opptjeningUtlandToSubmit,
            });
        } else {
            throw new Error('OpptjeningUtlandForm: Formvalues is not a valid Opptjening Utland on submit.');
        }
    };

    const initialValues = opptjening ? utils.mapOpptjeningUtlandToFormValues(opptjening) : defaultFormValues;

    return (
        <Form.FormikWrapper
            initialValues={initialValues}
            onSubmit={onFormikSubmit}
            renderForm={(formik) => {
                const {
                    values: { fom, tom, opptjeningType },
                } = formik;

                const hasDateStringValues = hasValue(fom) && hasValue(tom);

                return (
                    <Form.Form
                        includeButtons={true}
                        onCancel={onCancel}
                        submitButtonLabel="Ok"
                        showButtonArrows={false}
                        formErrorHandler={getIntlFormErrorHandler(intl, '@forms.opptjeningUtlandForm')}>
                        <Form.DateRangePicker
                            legend={text('@forms.opptjeningUtland.form.tidsperiode.spm')}
                            minDate={minDate}
                            maxDate={maxDate}
                            fromInputProps={{
                                name: OpptjeningUtlandFormFields.fom,
                                label: text('@forms.opptjeningUtland.form.tidsperiode.fraDato'),
                                validate: (value) => {
                                    const error = getDateRangeValidator({
                                        required: true,
                                        min: minDate,
                                        max: maxDate,
                                        toDate: ISOStringToDate(tom),
                                    }).validateFromDate(value);
                                    return handleDateRangeValidationError(error, minDate, maxDate);
                                },
                            }}
                            toInputProps={{
                                name: OpptjeningUtlandFormFields.tom,
                                label: text('@forms.opptjeningUtland.form.tidsperiode.tilDato'),
                                validate: (value) => {
                                    const error = getDateRangeValidator({
                                        required: true,
                                        min: minDate,
                                        max: maxDate,
                                        fromDate: ISOStringToDate(fom),
                                    }).validateToDate(value);
                                    return handleDateRangeValidationError(error, minDate, maxDate);
                                },
                            }}
                        />

                        {hasDateStringValues && (
                            <>
                                <FormBlock>
                                    <Form.CountrySelect
                                        name={OpptjeningUtlandFormFields.landkode}
                                        label={text('@forms.opptjeningUtland.form.land.spm')}
                                        validate={getRequiredFieldValidator()}
                                        showOnlyEuAndEftaCountries={true}
                                    />
                                </FormBlock>
                                <FormBlock>
                                    <Form.RadioGroup
                                        legend={text('@forms.opptjeningUtland.form.opptjeningAktivitet.spm')}
                                        name={OpptjeningUtlandFormFields.opptjeningType}
                                        radios={[
                                            {
                                                value: OpptjeningAktivitet.ARBEIDSTAKER,
                                                label: text(
                                                    `@forms.opptjeningUtland.form.opptjeningAktivitet.ARBEIDSTAKER`,
                                                ),
                                            },
                                            {
                                                value: OpptjeningAktivitet.FRILANSER,
                                                label: text(
                                                    `@forms.opptjeningUtland.form.opptjeningAktivitet.FRILANSER`,
                                                ),
                                            },
                                        ]}
                                        validate={getRequiredFieldValidator()}
                                        value={opptjeningType}
                                    />
                                </FormBlock>
                                {opptjeningType && (
                                    <FormBlock>
                                        <Form.TextField
                                            label={text(
                                                `@forms.opptjeningUtland.form.${
                                                    opptjeningType === OpptjeningAktivitet.ARBEIDSTAKER
                                                        ? 'arbeidsgiversNavn'
                                                        : 'oppdragsgiverNavn'
                                                }`,
                                            )}
                                            name={OpptjeningUtlandFormFields.navn}
                                            validate={getRequiredFieldValidator()}
                                            width="xl"
                                        />
                                    </FormBlock>
                                )}
                            </>
                        )}
                    </Form.Form>
                );
            }}
        />
    );
};

export default OpptjeningUtlandForm;
