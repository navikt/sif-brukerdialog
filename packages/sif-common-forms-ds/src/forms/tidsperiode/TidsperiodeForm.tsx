import { useIntl } from 'react-intl';
import { getTypedFormComponents, ISOStringToDate } from '@navikt/sif-common-formik-ds';
import {
    getDateRangeValidator,
    ValidateDateError,
    ValidateDateRangeError,
} from '@navikt/sif-common-formik-ds/src/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { handleDateRangeValidationError, mapFomTomToDateRange } from '../../utils';
import tidsperiodeUtils from './tidsperiodeUtils';
import { DateTidsperiode, DateTidsperiodeFormValues } from './types';
import { useTidsperiodeIntl } from './tidsperiodeMessages';

export interface TidsperiodeFormLabels {
    fromDate: string;
    toDate: string;
    intervalTitle: string;
    okButton: string;
    cancelButton: string;
}

interface Props {
    minDate?: Date;
    maxDate?: Date;
    tidsperiode?: Partial<DateTidsperiode>;
    alleTidsperioder?: DateTidsperiode[];
    formLabels?: Partial<TidsperiodeFormLabels>;
    onSubmit: (values: DateTidsperiode) => void;
    onCancel: () => void;
}

enum TidsperiodeFormFields {
    tom = 'tom',
    fom = 'fom',
}

export const TidsperiodeFormErrors = {
    [TidsperiodeFormFields.fom]: {
        [ValidateDateError.dateHasNoValue]: '@forms.tidsperiodeForm.fom.dateHasNoValue',
        [ValidateDateRangeError.fromDateIsAfterToDate]: '@forms.tidsperiodeForm.fom.fromDateIsAfterToDate',
        [ValidateDateError.dateHasInvalidFormat]: '@forms.tidsperiodeForm.fom.dateHasInvalidFormat',
        [ValidateDateError.dateIsBeforeMin]: '@forms.tidsperiodeForm.fom.dateIsBeforeMin',
        [ValidateDateError.dateIsAfterMax]: '@forms.tidsperiodeForm.fom.dateIsAfterMax',
    },
    [TidsperiodeFormFields.tom]: {
        [ValidateDateError.dateHasNoValue]: '@forms.tidsperiodeForm.tom.dateHasNoValue',
        [ValidateDateRangeError.toDateIsBeforeFromDate]: '@forms.tidsperiodeForm.tom.toDateIsBeforeFromDate',
        [ValidateDateError.dateHasInvalidFormat]: '@forms.tidsperiodeForm.tom.dateHasInvalidFormat',
        [ValidateDateError.dateIsBeforeMin]: '@forms.tidsperiodeForm.tom.dateIsBeforeMin',
        [ValidateDateError.dateIsAfterMax]: '@forms.tidsperiodeForm.tom.dateIsAfterMax',
    },
};

const Form = getTypedFormComponents<TidsperiodeFormFields, DateTidsperiodeFormValues, ValidationError>();

const TidsperiodeForm = ({
    maxDate,
    minDate,
    formLabels,
    tidsperiode,
    alleTidsperioder = [],
    onSubmit,
    onCancel,
}: Props) => {
    const intl = useIntl();
    const { text } = useTidsperiodeIntl();

    const onFormikSubmit = (formValues: DateTidsperiodeFormValues) => {
        const dateTidsperiodeToSubmit = tidsperiodeUtils.mapFormValuesToDateTidsperiode(formValues, tidsperiode?.id);
        if (tidsperiodeUtils.isValidDateTidsperiode(dateTidsperiodeToSubmit)) {
            onSubmit(dateTidsperiodeToSubmit);
        } else {
            throw new Error('TidsperiodeForm: Formvalues is not a valid Tidsperiode on submit.');
        }
    };

    const defaultLabels: TidsperiodeFormLabels = {
        intervalTitle: text('@forms.tidsperiode.form.title'),
        fromDate: text('@forms.tidsperiode.form.fromDate'),
        toDate: text('@forms.tidsperiode.form.toDate'),
        okButton: text('@forms.tidsperiode.form.okButton'),
        cancelButton: text('@forms.tidsperiode.form.cancelButton'),
    };

    const inlineLabels: TidsperiodeFormLabels = { ...defaultLabels, ...formLabels };

    return (
        <>
            <Form.FormikWrapper
                initialValues={tidsperiodeUtils.mapDateTidsperiodeToFormValues(tidsperiode || {})}
                onSubmit={onFormikSubmit}
                renderForm={(formik) => {
                    const disabledDateRanges =
                        tidsperiode === undefined
                            ? alleTidsperioder.map(mapFomTomToDateRange)
                            : alleTidsperioder.filter((t) => t.id !== tidsperiode.id).map(mapFomTomToDateRange);

                    return (
                        <Form.Form
                            onCancel={onCancel}
                            formErrorHandler={getFormErrorHandler(intl, '@forms.tidsperiodeForm')}
                            submitButtonLabel="Ok"
                            showButtonArrows={false}>
                            <Form.DateRangePicker
                                legend={inlineLabels.intervalTitle}
                                minDate={minDate}
                                maxDate={maxDate}
                                disabledDateRanges={disabledDateRanges}
                                fromInputProps={{
                                    label: inlineLabels.fromDate,
                                    name: TidsperiodeFormFields.fom,
                                    validate: (value) => {
                                        const error = getDateRangeValidator({
                                            required: true,
                                            min: minDate,
                                            max: maxDate,
                                            toDate: ISOStringToDate(formik.values.tom),
                                        }).validateFromDate(value);
                                        return handleDateRangeValidationError(error, minDate, maxDate);
                                    },
                                    onChange: () => {
                                        setTimeout(() => {
                                            formik.validateField(TidsperiodeFormFields.tom);
                                        });
                                    },
                                }}
                                toInputProps={{
                                    label: inlineLabels.toDate,
                                    name: TidsperiodeFormFields.tom,
                                    validate: (value) => {
                                        const error = getDateRangeValidator({
                                            required: true,
                                            min: minDate,
                                            max: maxDate,
                                            fromDate: ISOStringToDate(formik.values.fom),
                                        }).validateToDate(value);
                                        return handleDateRangeValidationError(error, minDate, maxDate);
                                    },
                                    onChange: () => {
                                        setTimeout(() => {
                                            formik.validateField(TidsperiodeFormFields.fom);
                                        });
                                    },
                                }}
                            />
                        </Form.Form>
                    );
                }}
            />
        </>
    );
};

export default TidsperiodeForm;
