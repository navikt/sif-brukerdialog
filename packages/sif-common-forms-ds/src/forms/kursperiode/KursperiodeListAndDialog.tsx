import {
    FormikModalFormAndList,
    ModalFormAndListLabels,
    TypedFormInputValidationProps,
} from '@navikt/sif-common-formik-ds';
import { ValidationError } from '@navikt/sif-common-formik-ds';
import { sortMaybeDateRange } from '@navikt/sif-common-utils';
import KursperiodeForm from './KursperiodeForm';
import KursperiodeList from './KursperiodeList';
import { Kursperiode } from './types/Kursperiode';

interface Props<FieldNames> extends TypedFormInputValidationProps<FieldNames, ValidationError> {
    name: FieldNames;
    minDate?: Date;
    maxDate?: Date;
    labels: ModalFormAndListLabels;
}

function KursperiodeListAndDialog<FieldNames>({ name, minDate, maxDate, validate, labels }: Props<FieldNames>) {
    return (
        <>
            <FormikModalFormAndList<FieldNames, Kursperiode, ValidationError>
                name={name}
                labels={labels}
                dialogWidth="narrow"
                validate={validate}
                sortFunc={(d1, d2) => sortMaybeDateRange({ from: d1.periode.from }, { from: d2.periode.from })}
                formRenderer={({ onSubmit, onCancel, item, allItems }) => (
                    <KursperiodeForm
                        kursperiode={item}
                        alleKursperioder={allItems}
                        minDate={minDate}
                        maxDate={maxDate}
                        onSubmit={onSubmit}
                        onCancel={onCancel}
                    />
                )}
                listRenderer={({ items, onEdit, onDelete }) => {
                    return <KursperiodeList kursperioder={items} onEdit={onEdit} onDelete={onDelete} />;
                }}
            />
        </>
    );
}

export default KursperiodeListAndDialog;
