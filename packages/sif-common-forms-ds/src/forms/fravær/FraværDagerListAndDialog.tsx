import React from 'react';
import { DateRange, sortItemsByFom } from '@navikt/sif-common-core/lib/utils/dateUtils';
import {
    FormikModalFormAndList,
    ModalFormAndListLabels,
    TypedFormInputValidationProps,
} from '@navikt/sif-common-formik-ds';
import FraværDagerList from './FraværDagerList';
import FraværDagFormView from './FraværDagForm';
import { FraværDag } from './types';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';

interface Props<FieldNames> extends TypedFormInputValidationProps<FieldNames, ValidationError> {
    name: FieldNames;
    minDate: Date;
    maxDate: Date;
    dagDescription?: JSX.Element;
    labels: ModalFormAndListLabels;
    formHeaderContent?: JSX.Element;
    dateRangesToDisable?: DateRange[];
    helgedagerIkkeTillatt?: boolean;
    maksArbeidstidPerDag?: number;
}

function FraværDagerListAndDialog<FieldNames>({
    name,
    minDate,
    maxDate,
    validate,
    dagDescription,
    labels,
    formHeaderContent,
    dateRangesToDisable,
    helgedagerIkkeTillatt,
    maksArbeidstidPerDag,
}: Props<FieldNames>) {
    return (
        <>
            <FormikModalFormAndList<FieldNames, FraværDag, ValidationError>
                name={name}
                labels={labels}
                dialogWidth="narrow"
                validate={validate}
                sortFunc={(fraværDagA: FraværDag, fraværDagB: FraværDag) =>
                    sortItemsByFom({ fom: fraværDagA.dato }, { fom: fraværDagB.dato })
                }
                formRenderer={({ onSubmit, onCancel, item }) => (
                    <FraværDagFormView
                        fraværDag={item}
                        minDate={minDate}
                        maxDate={maxDate}
                        headerContent={formHeaderContent}
                        dagDescription={dagDescription}
                        dateRangesToDisable={dateRangesToDisable}
                        helgedagerIkkeTillatt={helgedagerIkkeTillatt}
                        onSubmit={onSubmit}
                        onCancel={onCancel}
                        maksArbeidstidPerDag={maksArbeidstidPerDag}
                    />
                )}
                listRenderer={({ items, onEdit, onDelete }) => (
                    <FraværDagerList fraværDager={items} onEdit={onEdit} onDelete={onDelete} />
                )}
            />
        </>
    );
}

export default FraværDagerListAndDialog;
