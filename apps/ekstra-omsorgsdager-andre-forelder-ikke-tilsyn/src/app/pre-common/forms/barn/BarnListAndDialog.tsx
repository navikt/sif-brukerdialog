import React from 'react';
import {
    FormikModalFormAndList,
    ModalFormAndListLabels,
    TypedFormInputValidationProps,
} from '@navikt/sif-common-formik';
import BarnForm from './BarnForm';
import BarnList from './BarnList';
import { AndreBarn } from './types';
import { ValidationError } from '@navikt/sif-common-formik/lib/validation/types';

interface Props<FieldNames> extends TypedFormInputValidationProps<FieldNames, ValidationError> {
    name: FieldNames;
    labels: ModalFormAndListLabels;
    disallowedFødselsnumre?: string[];
    placeholderFnr?: string;
    placeholderNavn?: string;
}

function BarnListAndDialog<FieldNames>({
    name,
    validate,
    labels,
    disallowedFødselsnumre,
    placeholderFnr,
    placeholderNavn,
}: Props<FieldNames>) {
    return (
        <>
            <FormikModalFormAndList<FieldNames, AndreBarn, ValidationError>
                name={name}
                labels={labels}
                dialogWidth="narrow"
                validate={validate}
                formRenderer={({ onSubmit, onCancel, item }) => (
                    <BarnForm
                        barn={item}
                        onSubmit={onSubmit}
                        onCancel={onCancel}
                        disallowedFødselsnumre={disallowedFødselsnumre}
                        labels={{
                            placeholderFnr: placeholderFnr,
                            placeholderNavn: placeholderNavn,
                        }}
                    />
                )}
                listRenderer={({ items, onEdit, onDelete }) => (
                    <BarnList barna={items} onEdit={onEdit} onDelete={onDelete} />
                )}
            />
        </>
    );
}

export default BarnListAndDialog;
