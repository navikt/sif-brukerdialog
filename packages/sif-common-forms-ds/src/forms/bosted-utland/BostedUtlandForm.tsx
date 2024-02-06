import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { getTypedFormComponents, ISOStringToDate } from '@navikt/sif-common-formik-ds';
import {
    getDateRangeValidator,
    getRequiredFieldValidator,
    ValidateDateError,
    ValidateDateRangeError,
    ValidateRequiredFieldError,
} from '@navikt/sif-common-formik-ds/src/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { handleDateRangeValidationError, mapFomTomToDateRange } from '../../utils';
import { useBostedUtlandIntl } from './';
import bostedUtlandUtils from './bostedUtlandUtils';
import { BostedUtland, BostedUtlandFormValues } from './types';

export interface BostedUtlandFormLabels {
    tittel: string;
}

interface Props {
    minDate: Date;
    maxDate: Date;
    bosted?: BostedUtland;
    alleBosteder?: BostedUtland[];
    onSubmit: (values: BostedUtland) => void;
    onCancel: () => void;
}

enum BostedUtlandFormFields {
    fom = 'fom',
    tom = 'tom',
    landkode = 'landkode',
}

interface DateLimits {
    minDate: Date;
    maxDate: Date;
}

export const BostedUtlandFormErrors = {
    [BostedUtlandFormFields.fom]: {
        [ValidateDateError.dateHasNoValue]: 'bostedUtlandForm.fom.dateHasNoValue',
        [ValidateDateError.dateIsAfterMax]: 'bostedUtlandForm.fom.dateIsAfterMax',
        [ValidateDateError.dateIsBeforeMin]: 'bostedUtlandForm.fom.dateIsBeforeMin',
        [ValidateDateError.dateHasInvalidFormat]: 'bostedUtlandForm.fom.dateHasInvalidFormat',
        [ValidateDateRangeError.fromDateIsAfterToDate]: 'bostedUtlandForm.fom.fromDateIsAfterToDate',
    },
    [BostedUtlandFormFields.tom]: {
        [ValidateDateError.dateHasNoValue]: 'bostedUtlandForm.tom.dateHasNoValue',
        [ValidateDateError.dateIsAfterMax]: 'bostedUtlandForm.tom.dateIsAfterMax',
        [ValidateDateError.dateIsBeforeMin]: 'bostedUtlandForm.tom.dateIsBeforeMin',
        [ValidateDateError.dateHasInvalidFormat]: 'bostedUtlandForm.tom.dateHasInvalidFormat',
        [ValidateDateRangeError.toDateIsBeforeFromDate]: 'bostedUtlandForm.tom.toDateIsBeforeFromDate',
    },
    [BostedUtlandFormFields.landkode]: {
        [ValidateRequiredFieldError.noValue]: 'bostedUtlandForm.landkode.noValue',
    },
};

const Form = getTypedFormComponents<BostedUtlandFormFields, BostedUtlandFormValues, ValidationError>();

const BostedUtlandForm = ({ maxDate, minDate, bosted, alleBosteder = [], onSubmit, onCancel }: Props) => {
    const intl = useIntl();
    const { text } = useBostedUtlandIntl();

    const onFormikSubmit = (formValues: BostedUtlandFormValues) => {
        const bostedToSubmit = bostedUtlandUtils.mapFormValuesToBostedUtland(formValues, bosted?.id);
        if (bostedUtlandUtils.isValidBostedUtland(bostedToSubmit)) {
            onSubmit(bostedToSubmit);
        } else {
            throw new Error('BostedUtlandForm: Formvalues is not a valid BostedUtland on submit.');
        }
    };

    return (
        <Form.FormikWrapper
            initialValues={bostedUtlandUtils.mapBostedUtlandToFormValues(bosted || {})}
            onSubmit={onFormikSubmit}
            renderForm={(formik) => {
                const { values } = formik;
                const fomDateLimits: DateLimits = {
                    minDate,
                    maxDate: ISOStringToDate(values.tom) || maxDate,
                };
                const tomDateLimits: DateLimits = {
                    minDate: ISOStringToDate(values.fom) || minDate,
                    maxDate: maxDate,
                };

                const andreBosteder =
                    bosted === undefined
                        ? alleBosteder.map(mapFomTomToDateRange)
                        : alleBosteder.filter((b) => b.id !== bosted.id).map(mapFomTomToDateRange);

                return (
                    <Form.Form
                        onCancel={onCancel}
                        formErrorHandler={getFormErrorHandler(intl, 'bostedUtlandForm')}
                        submitButtonLabel="Ok"
                        showButtonArrows={false}>
                        <Form.DateRangePicker
                            legend={text('bostedUtland.form.tidsperiode.spm')}
                            minDate={minDate}
                            maxDate={maxDate}
                            allowRangesToStartAndStopOnSameDate={false}
                            disabledDateRanges={andreBosteder}
                            fromInputProps={{
                                name: BostedUtlandFormFields.fom,
                                label: text('bostedUtland.form.tidsperiode.fraDato'),
                                validate: (value) => {
                                    const error = getDateRangeValidator({
                                        required: true,
                                        min: fomDateLimits.minDate,
                                        max: fomDateLimits.maxDate,
                                        toDate: ISOStringToDate(values.tom),
                                    }).validateFromDate(value);
                                    return handleDateRangeValidationError(
                                        error,
                                        fomDateLimits.minDate,
                                        fomDateLimits.maxDate,
                                    );
                                },
                            }}
                            toInputProps={{
                                name: BostedUtlandFormFields.tom,
                                label: text('bostedUtland.form.tidsperiode.tilDato'),
                                validate: (value) => {
                                    const error = getDateRangeValidator({
                                        required: true,
                                        min: tomDateLimits.minDate,
                                        max: tomDateLimits.maxDate,
                                        fromDate: ISOStringToDate(values.fom),
                                    }).validateToDate(value);
                                    return handleDateRangeValidationError(
                                        error,
                                        tomDateLimits.minDate,
                                        tomDateLimits.maxDate,
                                    );
                                },
                            }}
                        />

                        <FormBlock>
                            <Form.CountrySelect
                                name={BostedUtlandFormFields.landkode}
                                label={text('bostedUtland.form.land.spm')}
                                validate={getRequiredFieldValidator()}
                            />
                        </FormBlock>
                    </Form.Form>
                );
            }}
        />
    );
};

export default BostedUtlandForm;
