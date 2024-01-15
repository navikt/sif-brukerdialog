import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
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
        [ValidateDateError.dateHasNoValue]: 'tidsperiodeForm.fom.dateHasNoValue',
        [ValidateDateRangeError.fromDateIsAfterToDate]: 'tidsperiodeForm.fom.fromDateIsAfterToDate',
        [ValidateDateError.dateHasInvalidFormat]: 'tidsperiodeForm.fom.dateHasInvalidFormat',
        [ValidateDateError.dateIsBeforeMin]: 'tidsperiodeForm.fom.dateIsBeforeMin',
        [ValidateDateError.dateIsAfterMax]: 'tidsperiodeForm.fom.dateIsAfterMax',
    },
    [TidsperiodeFormFields.tom]: {
        [ValidateDateError.dateHasNoValue]: 'tidsperiodeForm.tom.dateHasNoValue',
        [ValidateDateRangeError.toDateIsBeforeFromDate]: 'tidsperiodeForm.tom.toDateIsBeforeFromDate',
        [ValidateDateError.dateHasInvalidFormat]: 'tidsperiodeForm.tom.dateHasInvalidFormat',
        [ValidateDateError.dateIsBeforeMin]: 'tidsperiodeForm.tom.dateIsBeforeMin',
        [ValidateDateError.dateIsAfterMax]: 'tidsperiodeForm.tom.dateIsAfterMax',
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

    const onFormikSubmit = (formValues: DateTidsperiodeFormValues) => {
        const dateTidsperiodeToSubmit = tidsperiodeUtils.mapFormValuesToDateTidsperiode(formValues, tidsperiode?.id);
        if (tidsperiodeUtils.isValidDateTidsperiode(dateTidsperiodeToSubmit)) {
            onSubmit(dateTidsperiodeToSubmit);
        } else {
            throw new Error('TidsperiodeForm: Formvalues is not a valid Tidsperiode on submit.');
        }
    };

    const defaultLabels: TidsperiodeFormLabels = {
        intervalTitle: intlHelper(intl, 'tidsperiode.form.title'),
        fromDate: intlHelper(intl, 'tidsperiode.form.fromDate'),
        toDate: intlHelper(intl, 'tidsperiode.form.toDate'),
        okButton: intlHelper(intl, 'tidsperiode.form.okButton'),
        cancelButton: intlHelper(intl, 'tidsperiode.form.cancelButton'),
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
                            formErrorHandler={getFormErrorHandler(intl, 'tidsperiodeForm')}
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
