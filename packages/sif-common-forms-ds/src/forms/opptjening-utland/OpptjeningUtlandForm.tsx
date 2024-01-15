import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { ISOStringToDate } from '@navikt/sif-common-formik-ds';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import {
    getDateRangeValidator,
    getRequiredFieldValidator,
    ValidateDateError,
    ValidateDateRangeError,
    ValidateRequiredFieldError,
} from '@navikt/sif-common-formik-ds/src/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { hasValue } from '@navikt/sif-common-formik-ds/src/validation/validationUtils';
import { handleDateRangeValidationError } from '../../utils';
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

export const OpptjeningUtlandFormErrors = {
    [OpptjeningUtlandFormFields.fom]: {
        [ValidateDateError.dateHasNoValue]: 'opptjeningUtlandForm.fom.dateHasNoValue',
        [ValidateDateRangeError.fromDateIsAfterToDate]: 'opptjeningUtlandForm.fom.fromDateIsAfterToDate',
        [ValidateDateError.dateHasInvalidFormat]: 'opptjeningUtlandForm.fom.dateHasInvalidFormat',
        [ValidateDateError.dateIsBeforeMin]: 'opptjeningUtlandForm.fom.dateIsBeforeMin',
        [ValidateDateError.dateIsAfterMax]: 'opptjeningUtlandForm.fom.dateIsAfterMax',
    },
    [OpptjeningUtlandFormFields.tom]: {
        [ValidateDateError.dateHasNoValue]: 'opptjeningUtlandForm.tom.dateHasNoValue',
        [ValidateDateRangeError.toDateIsBeforeFromDate]: 'opptjeningUtlandForm.tom.toDateIsBeforeFromDate',
        [ValidateDateError.dateHasInvalidFormat]: 'opptjeningUtlandForm.tom.dateHasInvalidFormat',
        [ValidateDateError.dateIsBeforeMin]: 'opptjeningUtlandForm.tom.dateIsBeforeMin',
        [ValidateDateError.dateIsAfterMax]: 'opptjeningUtlandForm.tom.dateIsAfterMax',
    },
    [OpptjeningUtlandFormFields.landkode]: {
        [ValidateRequiredFieldError.noValue]: 'opptjeningUtlandForm.landkode.noValue',
    },
    [OpptjeningUtlandFormFields.opptjeningType]: {
        [ValidateRequiredFieldError.noValue]: 'opptjeningUtlandForm.type.noValue',
    },
    [OpptjeningUtlandFormFields.navn]: {
        [ValidateRequiredFieldError.noValue]: 'opptjeningUtlandForm.navn.noValue',
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
                        formErrorHandler={getFormErrorHandler(intl, 'opptjeningUtlandForm')}>
                        <Form.DateRangePicker
                            legend={intlHelper(intl, 'opptjeningUtland.form.tidsperiode.spm')}
                            minDate={minDate}
                            maxDate={maxDate}
                            fromInputProps={{
                                name: OpptjeningUtlandFormFields.fom,
                                label: intlHelper(intl, 'opptjeningUtland.form.tidsperiode.fraDato'),
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
                                label: intlHelper(intl, 'opptjeningUtland.form.tidsperiode.tilDato'),
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
                                        label={intlHelper(intl, 'opptjeningUtland.form.land.spm')}
                                        validate={getRequiredFieldValidator()}
                                        showOnlyEuAndEftaCountries={true}
                                    />
                                </FormBlock>
                                <FormBlock>
                                    <Form.RadioGroup
                                        legend={intlHelper(intl, 'opptjeningUtland.form.opptjeningAktivitet.spm')}
                                        name={OpptjeningUtlandFormFields.opptjeningType}
                                        radios={Object.keys(OpptjeningAktivitet).map((opptjeningType) => ({
                                            label: intlHelper(
                                                intl,
                                                `opptjeningUtland.form.opptjeningAktivitet.${opptjeningType}`,
                                            ),
                                            value: opptjeningType,
                                        }))}
                                        validate={getRequiredFieldValidator()}
                                        value={opptjeningType}
                                    />
                                </FormBlock>
                                {opptjeningType && (
                                    <FormBlock>
                                        <Form.TextField
                                            label={intlHelper(
                                                intl,
                                                `opptjeningUtland.form.${
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
