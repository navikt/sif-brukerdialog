import React from 'react';
import {
    FormikModalFormAndList,
    ModalFormAndListLabels,
    TypedFormInputValidationProps,
} from '@navikt/sif-common-formik-ds';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import { sortMaybeDateRange } from '@navikt/sif-common-utils';
import FerieuttakForm from './FerieuttakForm';
import FerieuttakList from './FerieuttakList';
import { Ferieuttak } from './types';

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
                sortFunc={(d1, d2) => sortMaybeDateRange({ from: d1.fom }, { from: d2.fom })}
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
