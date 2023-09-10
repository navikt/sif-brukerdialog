import {
    FormikModalFormAndList,
    ModalFormAndListLabels,
    TypedFormInputValidationProps,
} from '@navikt/sif-common-formik-ds';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import { sortMaybeDateRange } from '@navikt/sif-common-utils';
import { Utenlandsopphold } from './types';
import UtenlandsoppholdForm from './UtenlandsoppholdForm';
import UtenlandsoppholdListe from './UtenlandsoppholdList';

interface Props<FieldNames> extends TypedFormInputValidationProps<FieldNames, ValidationError> {
    name: FieldNames;
    minDate: Date;
    maxDate: Date;
    labels: ModalFormAndListLabels;
    excludeInnlagtQuestion?: boolean;
}

function UtenlandsoppholdListAndDialog<FieldNames>({
    name,
    minDate,
    maxDate,
    validate,
    labels,
    excludeInnlagtQuestion = false,
}: Props<FieldNames>) {
    return (
        <FormikModalFormAndList<FieldNames, Utenlandsopphold, ValidationError>
            name={name}
            labels={labels}
            validate={validate}
            dialogWidth="narrow"
            sortFunc={(d1, d2) => sortMaybeDateRange({ from: d1.fom }, { from: d2.fom })}
            formRenderer={({ onSubmit, onCancel, item, allItems }) => (
                <UtenlandsoppholdForm
                    opphold={item}
                    alleOpphold={allItems}
                    minDate={minDate}
                    maxDate={maxDate}
                    excludeInnlagtQuestion={excludeInnlagtQuestion}
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
