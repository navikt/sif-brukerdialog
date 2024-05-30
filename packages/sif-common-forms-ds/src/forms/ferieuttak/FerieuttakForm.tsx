import { useIntl } from 'react-intl';
import { getTypedFormComponents, ISOStringToDate } from '@navikt/sif-common-formik-ds';
import {
    getDateRangeValidator,
    ValidateDateError,
    ValidateDateRangeError,
} from '@navikt/sif-common-formik-ds/src/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import {
    DateRange,
    dateRangeToISODateRange,
    dateToday,
    isDateInMaybeDateRange,
    isDateRange,
    prettifyDate,
} from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { handleDateRangeValidationError } from '../../utils';
import { FerieuttakMessageKeys, useFerieuttakIntl } from './';
import ferieuttakUtils from './ferieuttakUtils';
import { Ferieuttak, FerieuttakFormValues } from './types';

export interface FerieuttakFormLabels {
    title: string;
    fromDate: string;
    toDate: string;
    intervalTitle: string;
    okButton: string;
    cancelButton: string;
}

interface Props {
    minDate: Date;
    maxDate: Date;
    disableWeekends?: boolean;
    ferieuttak?: Partial<Ferieuttak>;
    alleFerieuttak?: Ferieuttak[];
    utilgjengeligePerioder?: DateRange[];
    labels?: Partial<FerieuttakFormLabels>;
    onSubmit: (values: Ferieuttak) => void;
    onCancel: () => void;
}

enum FerieuttakFormFields {
    to = 'to',
    from = 'from',
}

export const FerieuttakFormErrors: Record<FerieuttakFormFields, { [key: string]: FerieuttakMessageKeys }> = {
    [FerieuttakFormFields.from]: {
        [ValidateDateError.dateHasNoValue]: '@forms.ferieuttakForm.from.dateHasNoValue',
        [ValidateDateRangeError.fromDateIsAfterToDate]: '@forms.ferieuttakForm.from.fromDateIsAfterToDate',
        [ValidateDateError.dateHasInvalidFormat]: '@forms.ferieuttakForm.from.dateHasInvalidFormat',
        [ValidateDateError.dateIsBeforeMin]: '@forms.ferieuttakForm.from.dateIsBeforeMin',
        [ValidateDateError.dateIsAfterMax]: '@forms.ferieuttakForm.from.dateIsAfterMax',
    },
    [FerieuttakFormFields.to]: {
        [ValidateDateError.dateHasNoValue]: '@forms.ferieuttakForm.to.dateHasNoValue',
        [ValidateDateRangeError.toDateIsBeforeFromDate]: '@forms.ferieuttakForm.to.toDateIsBeforeFromDate',
        [ValidateDateError.dateHasInvalidFormat]: '@forms.ferieuttakForm.to.dateHasInvalidFormat',
        [ValidateDateError.dateIsBeforeMin]: '@forms.ferieuttakForm.to.dateIsBeforeMin',
        [ValidateDateError.dateIsAfterMax]: '@forms.ferieuttakForm.to.dateIsAfterMax',
    },
};

const Form = getTypedFormComponents<FerieuttakFormFields, FerieuttakFormValues, ValidationError>();

const FerieuttakForm = ({
    maxDate,
    minDate,
    labels,
    ferieuttak,
    disableWeekends,
    alleFerieuttak = [],
    utilgjengeligePerioder = [],
    onSubmit,
    onCancel,
}: Props) => {
    const intl = useIntl();
    const { text } = useFerieuttakIntl();
    const onFormikSubmit = (formValues: FerieuttakFormValues) => {
        const ferieuttakToSubmit = ferieuttakUtils.mapFormValuesToFerieuttak(formValues, ferieuttak?.id);
        if (ferieuttakUtils.isValidFerieuttak(ferieuttakToSubmit)) {
            onSubmit({ ...ferieuttak, ...ferieuttakToSubmit });
        } else {
            throw new Error('FerieuttakForm: Formvalues is not a valid Ferieuttak on submit.');
        }
    };

    const defaultLabels: FerieuttakFormLabels = {
        title: text('@forms.ferieuttak.list.title'),
        fromDate: text('@forms.ferieuttak.list.fromDate'),
        toDate: text('@forms.ferieuttak.list.toDate'),
        intervalTitle: text('@forms.ferieuttak.list.intervalTitle'),
        okButton: text('@forms.ferieuttak.list.okButton'),
        cancelButton: text('@forms.ferieuttak.list.cancelButton'),
    };

    const formLabels: FerieuttakFormLabels = { ...defaultLabels, ...labels };

    const andreFerieuttak: DateRange[] | undefined =
        ferieuttak === undefined
            ? alleFerieuttak
            : alleFerieuttak.filter((f) => {
                  if (f.id) {
                      return f.id !== ferieuttak.id;
                  }
                  if (isDateRange(ferieuttak)) {
                      return dateRangeToISODateRange(f) !== dateRangeToISODateRange(ferieuttak);
                  }
              });
    let defaultMonth: Date = dateToday;
    if ((minDate || maxDate) && !isDateInMaybeDateRange(dateToday, { from: minDate, to: maxDate })) {
        if (maxDate && dayjs(dateToday).isAfter(maxDate, 'day')) {
            defaultMonth = maxDate;
        } else if (minDate && dayjs(dateToday).isBefore(minDate, 'day')) {
            defaultMonth = minDate;
        }
    }

    return (
        <Form.FormikWrapper
            initialValues={ferieuttakUtils.mapFerieuttakToFormValues(ferieuttak || {})}
            onSubmit={onFormikSubmit}
            renderForm={(formik) => (
                <Form.Form
                    onCancel={onCancel}
                    formErrorHandler={getFormErrorHandler(intl, '@forms.ferieuttakForm')}
                    showButtonArrows={false}
                    submitButtonLabel={formLabels.okButton}
                    cancelButtonLabel={formLabels.cancelButton}>
                    <Form.DateRangePicker
                        legend={formLabels.intervalTitle}
                        minDate={minDate}
                        maxDate={maxDate}
                        allowRangesToStartAndStopOnSameDate={true}
                        disabledDateRanges={[...andreFerieuttak, ...utilgjengeligePerioder]}
                        disableWeekends={disableWeekends}
                        fromInputProps={{
                            label: formLabels.fromDate,
                            name: FerieuttakFormFields.from,
                            validate: (value) => {
                                const error = getDateRangeValidator({
                                    required: true,
                                    min: minDate,
                                    max: maxDate,
                                    onlyWeekdays: disableWeekends === true,
                                    toDate: ISOStringToDate(formik.values.to),
                                }).validateFromDate(value);
                                return handleDateRangeValidationError(error, minDate, maxDate);
                            },
                            defaultMonth,
                            onChange: () => {
                                setTimeout(() => {
                                    formik.validateField(FerieuttakFormFields.to);
                                });
                            },
                        }}
                        toInputProps={{
                            label: formLabels.toDate,
                            name: FerieuttakFormFields.to,
                            defaultMonth: ISOStringToDate(formik.values.from) || defaultMonth,
                            validate: (value) => {
                                const dateError = getDateRangeValidator({
                                    required: true,
                                    min: minDate,
                                    max: maxDate,
                                    onlyWeekdays: disableWeekends === true,
                                    fromDate: ISOStringToDate(formik.values.from),
                                }).validateToDate(value);
                                switch (dateError) {
                                    case ValidateDateError.dateIsBeforeMin:
                                        return {
                                            key: dateError,
                                            values: { dato: prettifyDate(minDate) },
                                        };
                                    case ValidateDateError.dateIsAfterMax:
                                        return {
                                            key: dateError,
                                            values: { dato: prettifyDate(maxDate) },
                                        };
                                    default:
                                        return dateError;
                                }
                            },
                            onChange: () => {
                                setTimeout(() => {
                                    formik.validateField(FerieuttakFormFields.from);
                                });
                            },
                        }}
                    />
                </Form.Form>
            )}
        />
    );
};

export default FerieuttakForm;
