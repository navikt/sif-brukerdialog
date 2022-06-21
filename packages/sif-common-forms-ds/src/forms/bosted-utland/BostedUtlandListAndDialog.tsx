import React from 'react';
import { sortItemsByFom } from '@navikt/sif-common-core/lib/utils/dateUtils';
import {
    FormikModalFormAndList,
    ModalFormAndListLabels,
    TypedFormInputValidationProps,
} from '@navikt/sif-common-formik-ds';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import BostedUtlandForm from './BostedUtlandForm';
import BostedUtlandListe from './BostedUtlandList';
import { BostedUtland } from './types';

interface Props<FieldNames> extends TypedFormInputValidationProps<FieldNames, ValidationError> {
    name: FieldNames;
    minDate: Date;
    maxDate: Date;
    labels: ModalFormAndListLabels;
}

function BostedUtlandListAndDialog<FieldNames>({ name, minDate, maxDate, validate, labels }: Props<FieldNames>) {
    return (
        <FormikModalFormAndList<FieldNames, BostedUtland, ValidationError>
            name={name}
            labels={labels}
            validate={validate}
            dialogWidth="narrow"
            sortFunc={sortItemsByFom}
            formRenderer={({ onSubmit, onCancel, item, allItems }) => (
                <BostedUtlandForm
                    bosted={item}
                    alleBosteder={allItems}
                    minDate={minDate}
                    maxDate={maxDate}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                />
            )}
            listRenderer={({ items, onEdit, onDelete }) => (
                <BostedUtlandListe bosteder={items} onEdit={onEdit} onDelete={onDelete} />
            )}
        />
    );
}

export default BostedUtlandListAndDialog;
