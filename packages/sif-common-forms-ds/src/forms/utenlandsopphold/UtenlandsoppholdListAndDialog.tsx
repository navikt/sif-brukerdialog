import React from 'react';
import { sortItemsByFom } from '@navikt/sif-common-core/lib/utils/dateUtils';
import {
    FormikModalFormAndList,
    ModalFormAndListLabels,
    TypedFormInputValidationProps,
} from '@navikt/sif-common-formik-ds';
import { Utenlandsopphold } from './types';
import UtenlandsoppholdForm from './UtenlandsoppholdForm';
import UtenlandsoppholdListe from './UtenlandsoppholdList';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';

interface Props<FieldNames> extends TypedFormInputValidationProps<FieldNames, ValidationError> {
    name: FieldNames;
    minDate: Date;
    maxDate: Date;
    labels: ModalFormAndListLabels;
}

function UtenlandsoppholdListAndDialog<FieldNames>({ name, minDate, maxDate, validate, labels }: Props<FieldNames>) {
    return (
        <FormikModalFormAndList<FieldNames, Utenlandsopphold, ValidationError>
            name={name}
            labels={labels}
            validate={validate}
            dialogWidth="narrow"
            sortFunc={sortItemsByFom}
            formRenderer={({ onSubmit, onCancel, item, allItems }) => (
                <UtenlandsoppholdForm
                    opphold={item}
                    alleOpphold={allItems}
                    minDate={minDate}
                    maxDate={maxDate}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                />
            )}
            listRenderer={({ items, onEdit, onDelete }) => (
                <UtenlandsoppholdListe utenlandsopphold={items} onEdit={onEdit} onDelete={onDelete} />
            )}
        />
    );
}

export default UtenlandsoppholdListAndDialog;
