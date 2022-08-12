import React from 'react';
import { useIntl } from 'react-intl';
import { DateRange, prettifyDate } from '@navikt/sif-common-utils';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getTypedFormComponents, ISOStringToDate } from '@navikt/sif-common-formik-ds/lib';
import {
    getDateRangeValidator,
    ValidateDateError,
    ValidateDateRangeError,
} from '@navikt/sif-common-formik-ds/lib/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import { handleDateRangeValidationError, mapFomTomToDateRange } from '../../utils';
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
    ferieuttak?: Partial<Ferieuttak>;
    alleFerieuttak?: Ferieuttak[];
    labels?: Partial<FerieuttakFormLabels>;
    onSubmit: (values: Ferieuttak) => void;
    onCancel: () => void;
}

enum FerieuttakFormFields {
    tom = 'tom',
    fom = 'fom',
}

export const FerieuttakFormErrors = {
    [FerieuttakFormFields.fom]: {
        [ValidateDateError.dateHasNoValue]: 'ferieuttakForm.fom.dateHasNoValue',
        [ValidateDateRangeError.fromDateIsAfterToDate]: 'ferieuttakForm.fom.fromDateIsAfterToDate',
        [ValidateDateError.dateHasInvalidFormat]: 'ferieuttakForm.fom.dateHasInvalidFormat',
        [ValidateDateError.dateIsBeforeMin]: 'ferieuttakForm.fom.dateIsBeforeMin',
        [ValidateDateError.dateIsAfterMax]: 'ferieuttakForm.fom.dateIsAfterMax',
    },
    [FerieuttakFormFields.tom]: {
        [ValidateDateError.dateHasNoValue]: 'ferieuttakForm.tom.dateHasNoValue',
        [ValidateDateRangeError.toDateIsBeforeFromDate]: 'ferieuttakForm.tom.toDateIsBeforeFromDate',
        [ValidateDateError.dateHasInvalidFormat]: 'ferieuttakForm.tom.dateHasInvalidFormat',
        [ValidateDateError.dateIsBeforeMin]: 'ferieuttakForm.tom.dateIsBeforeMin',
        [ValidateDateError.dateIsAfterMax]: 'ferieuttakForm.tom.dateIsAfterMax',
    },
};

const Form = getTypedFormComponents<FerieuttakFormFields, FerieuttakFormValues, ValidationError>();

const FerieuttakForm = ({ maxDate, minDate, labels, ferieuttak, alleFerieuttak = [], onSubmit, onCancel }: Props) => {
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
            ? alleFerieuttak.map(mapFomTomToDateRange)
            : alleFerieuttak.filter((f) => f.id !== ferieuttak.id).map(mapFomTomToDateRange);

    return (
        <>
            <Form.FormikWrapper
                initialValues={ferieuttakUtils.mapFerieuttakToFormValues(ferieuttak || {})}
                onSubmit={onFormikSubmit}
                renderForm={(formik) => (
                    <Form.Form onCancel={onCancel} formErrorHandler={getFormErrorHandler(intl, 'ferieuttakForm')}>
                        <Form.DateRangePicker
                            legend={formLabels.intervalTitle}
                            fullscreenOverlay={true}
                            minDate={minDate}
                            maxDate={maxDate}
                            allowRangesToStartAndStopOnSameDate={true}
                            disabledDateRanges={andreFerieuttak}
                            fromInputProps={{
                                label: formLabels.fromDate,
                                name: FerieuttakFormFields.fom,
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
                                        formik.validateField(FerieuttakFormFields.tom);
                                    });
                                },
                            }}
                            toInputProps={{
                                label: formLabels.toDate,
                                name: FerieuttakFormFields.tom,
                                validate: (value) => {
                                    const dateError = getDateRangeValidator({
                                        required: true,
                                        min: minDate,
                                        max: maxDate,
                                        fromDate: ISOStringToDate(formik.values.fom),
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
                                        formik.validateField(FerieuttakFormFields.fom);
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
