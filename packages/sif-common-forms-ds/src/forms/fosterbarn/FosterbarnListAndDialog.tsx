import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { FormikModalFormAndList, TypedFormInputValidationProps } from '@navikt/sif-common-formik-ds';
import FosterbarnForm from './FosterbarnForm';
import FosterbarnList from './FosterbarnList';
import { Fosterbarn } from './types';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';

export interface FosterbarnListAndDialogText {
    liste_legg_til_knapp: string;
    liste_tittel?: string;
    liste_tom_liste_tekst?: string;
    modal_tittel: string;
}

interface Props<FieldNames> extends TypedFormInputValidationProps<FieldNames, ValidationError> {
    name: FieldNames;
    texts?: FosterbarnListAndDialogText;
    disallowedFødselsnumre?: string[];
}

function FosterbarnListAndDialog<FieldNames>({ name, validate, texts, disallowedFødselsnumre }: Props<FieldNames>) {
    const intl = useIntl();

    const defaultText: FosterbarnListAndDialogText = {
        liste_legg_til_knapp: intlHelper(intl, 'fosterbarn.list.legg_til_knapp'),
        liste_tittel: intlHelper(intl, 'fosterbarn.list.tittel'),
        modal_tittel: intlHelper(intl, 'fosterbarn.modal.tittel'),
    };

    const txt = { ...defaultText, ...texts };
    return (
        <>
            <FormikModalFormAndList<FieldNames, Fosterbarn, ValidationError>
                name={name}
                labels={{
                    addLabel: txt.liste_legg_til_knapp,
                    modalTitle: txt.modal_tittel,
                    emptyListText: txt.liste_tom_liste_tekst,
                    listTitle: txt.liste_tittel,
                }}
                dialogWidth="narrow"
                validate={validate}
                formRenderer={({ onSubmit, onCancel, item }) => (
                    <FosterbarnForm
                        fosterbarn={item}
                        onSubmit={onSubmit}
                        onCancel={onCancel}
                        disallowedFødselsnumre={disallowedFødselsnumre}
                    />
                )}
                listRenderer={({ items, onEdit, onDelete }) => (
                    <FosterbarnList fosterbarn={items} onEdit={onEdit} onDelete={onDelete} />
                )}
            />
        </>
    );
}

export default FosterbarnListAndDialog;
