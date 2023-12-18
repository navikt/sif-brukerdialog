import { useIntl } from 'react-intl';
import {
    DateRange,
    dateRangeToISODateRange,
    dateToday,
    isDateInMaybeDateRange,
    isDateRange,
    prettifyDate,
} from '@navikt/sif-common-utils';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { getTypedFormComponents, ISOStringToDate } from '@navikt/sif-common-formik-ds';
import {
    getDateRangeValidator,
    ValidateDateError,
    ValidateDateRangeError,
} from '@navikt/sif-common-formik-ds/src/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { handleDateRangeValidationError } from '../../utils';
import ferieuttakUtils from './ferieuttakUtils';
import { Ferieuttak, FerieuttakFormValues } from './types';
import dayjs from 'dayjs';

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

export const FerieuttakFormErrors = {
    [FerieuttakFormFields.from]: {
        [ValidateDateError.dateHasNoValue]: 'ferieuttakForm.from.dateHasNoValue',
        [ValidateDateRangeError.fromDateIsAfterToDate]: 'ferieuttakForm.from.fromDateIsAfterToDate',
        [ValidateDateError.dateHasInvalidFormat]: 'ferieuttakForm.from.dateHasInvalidFormat',
        [ValidateDateError.dateIsBeforeMin]: 'ferieuttakForm.from.dateIsBeforeMin',
        [ValidateDateError.dateIsAfterMax]: 'ferieuttakForm.from.dateIsAfterMax',
    },
    [FerieuttakFormFields.to]: {
        [ValidateDateError.dateHasNoValue]: 'ferieuttakForm.to.dateHasNoValue',
        [ValidateDateRangeError.toDateIsBeforeFromDate]: 'ferieuttakForm.to.toDateIsBeforeFromDate',
        [ValidateDateError.dateHasInvalidFormat]: 'ferieuttakForm.to.dateHasInvalidFormat',
        [ValidateDateError.dateIsBeforeMin]: 'ferieuttakForm.to.dateIsBeforeMin',
        [ValidateDateError.dateIsAfterMax]: 'ferieuttakForm.to.dateIsAfterMax',
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
    const onFormikSubmit = (formValues: FerieuttakFormValues) => {
        const ferieuttakToSubmit = ferieuttakUtils.mapFormValuesToFerieuttak(formValues, ferieuttak?.id);
        if (ferieuttakUtils.isValidFerieuttak(ferieuttakToSubmit)) {
            onSubmit({ ...ferieuttak, ...ferieuttakToSubmit });
        } else {
            throw new Error('FerieuttakForm: Formvalues is not a valid Ferieuttak on submit.');
        }
    };

    const defaultLabels: FerieuttakFormLabels = {
        title: intlHelper(intl, 'ferieuttak.list.title'),
        fromDate: intlHelper(intl, 'ferieuttak.list.fromDate'),
        toDate: intlHelper(intl, 'ferieuttak.list.toDate'),
        intervalTitle: intlHelper(intl, 'ferieuttak.list.intervalTitle'),
        okButton: intlHelper(intl, 'ferieuttak.list.okButton'),
        cancelButton: intlHelper(intl, 'ferieuttak.list.cancelButton'),
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
        <>
            <Form.FormikWrapper
                initialValues={ferieuttakUtils.mapFerieuttakToFormValues(ferieuttak || {})}
                onSubmit={onFormikSubmit}
                renderForm={(formik) => (
                    <Form.Form
                        onCancel={onCancel}
                        formErrorHandler={getFormErrorHandler(intl, 'ferieuttakForm')}
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
        </>
    );
};

export default FerieuttakForm;
