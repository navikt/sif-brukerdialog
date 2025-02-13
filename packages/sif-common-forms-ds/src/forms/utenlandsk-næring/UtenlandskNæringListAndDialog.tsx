import {
    FormikModalFormAndList,
    ModalFormAndListLabels,
    TypedFormInputValidationProps,
} from '@navikt/sif-common-formik-ds';
import { ValidationError } from '@navikt/sif-common-formik-ds';
import { UtenlandskNæring } from './types';
import UtenlandskNæringForm from './UtenlandskNæringForm';
import UtenlandskNæringList from './UtenlandskNæringList';

interface Props<FieldNames> extends TypedFormInputValidationProps<FieldNames, ValidationError> {
    name: FieldNames;
    labels: ModalFormAndListLabels;
}

function UtenlandskNæringListAndDialog<FieldNames>({ name, labels, validate }: Props<FieldNames>) {
    return (
        <FormikModalFormAndList<FieldNames, UtenlandskNæring, ValidationError>
            name={name}
            validate={validate}
            labels={labels}
            dialogWidth="narrow"
            formRenderer={({ onSubmit, onCancel, item }) => (
                <UtenlandskNæringForm utenlandskNæring={item} onSubmit={onSubmit} onCancel={onCancel} />
            )}
            listRenderer={({ items, onEdit, onDelete }) => (
                <UtenlandskNæringList utenlandskNæringer={items} onEdit={onEdit} onDelete={onDelete} />
            )}
        />
    );
}

export default UtenlandskNæringListAndDialog;
