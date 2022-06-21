import React from 'react';
import { sortItemsByFom } from '@navikt/sif-common-core/lib/utils/dateUtils';
import {
    FormikModalFormAndList,
    ModalFormAndListLabels,
    TypedFormInputValidationProps,
} from '@navikt/sif-common-formik-ds';
import FerieuttakForm from './FerieuttakForm';
import FerieuttakList from './FerieuttakList';
import { Ferieuttak } from './types';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';

interface Props<FieldNames> extends TypedFormInputValidationProps<FieldNames, ValidationError> {
    name: FieldNames;
    minDate: Date;
    maxDate: Date;
    labels: ModalFormAndListLabels;
}

function FerieuttakListAndDialog<FieldNames>({ name, minDate, maxDate, validate, labels }: Props<FieldNames>) {
    return (
        <>
            <FormikModalFormAndList<FieldNames, Ferieuttak, ValidationError>
                name={name}
                labels={labels}
                dialogWidth="narrow"
                validate={validate}
                sortFunc={sortItemsByFom}
                formRenderer={({ onSubmit, onCancel, item, allItems }) => (
                    <FerieuttakForm
                        ferieuttak={item}
                        minDate={minDate}
                        maxDate={maxDate}
                        onSubmit={onSubmit}
                        onCancel={onCancel}
                        alleFerieuttak={allItems}
                    />
                )}
                listRenderer={({ items, onEdit, onDelete }) => (
                    <FerieuttakList ferieuttak={items} onEdit={onEdit} onDelete={onDelete} />
                )}
            />
        </>
    );
}

export default FerieuttakListAndDialog;
