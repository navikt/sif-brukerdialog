import {
    FormikModalFormAndList,
    ModalFormAndListLabels,
    TypedFormInputValidationProps,
} from '@navikt/sif-common-formik-ds';
import { ValidationError } from '@navikt/sif-common-formik-ds';
import dayjs from 'dayjs';
import OpptjeningUtlandForm from './OpptjeningUtlandForm';
import OpptjeningUtlandList from './OpptjeningUtlandList';
import { OpptjeningUtland } from './types';

interface Props<FieldNames> extends TypedFormInputValidationProps<FieldNames, ValidationError> {
    name: FieldNames;
    minDate: Date;
    maxDate: Date;
    labels: ModalFormAndListLabels;
}

const sortItemsByFom = (d1: { fom: Date }, d2: { fom: Date }): number => {
    if (dayjs(d1.fom).isSameOrBefore(d2.fom, 'day')) {
        return -1;
    }
    return 1;
};

function OpptjeningUtlandListAndDialog<FieldNames>({ name, minDate, maxDate, validate, labels }: Props<FieldNames>) {
    return (
        <FormikModalFormAndList<FieldNames, OpptjeningUtland, ValidationError>
            name={name}
            labels={labels}
            validate={validate}
            dialogWidth="narrow"
            sortFunc={sortItemsByFom}
            formRenderer={({ onSubmit, onCancel, item, allItems }) => (
                <OpptjeningUtlandForm
                    opptjening={item}
                    alleOpptjening={allItems}
                    minDate={minDate}
                    maxDate={maxDate}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                />
            )}
            listRenderer={({ items, onEdit, onDelete }) => (
                <OpptjeningUtlandList utenlandsopphold={items} onEdit={onEdit} onDelete={onDelete} />
            )}
        />
    );
}

export default OpptjeningUtlandListAndDialog;
