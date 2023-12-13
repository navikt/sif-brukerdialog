import {
    FormikModalFormAndList,
    ModalFormAndListLabels,
    TypedFormInputValidationProps,
} from '@navikt/sif-common-formik-ds';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { sortMaybeDateRange } from '@navikt/sif-common-utils';
import TidsperiodeForm from './TidsperiodeForm';
import TidsperiodeList from './TidsperiodeList';
import { DateTidsperiode } from './types';

interface Props<FieldNames> extends TypedFormInputValidationProps<FieldNames, ValidationError> {
    name: FieldNames;
    minDate?: Date;
    maxDate?: Date;
    labels: ModalFormAndListLabels;
}

function TidsperiodeListAndDialog<FieldNames>({ name, minDate, maxDate, validate, labels }: Props<FieldNames>) {
    return (
        <>
            <FormikModalFormAndList<FieldNames, DateTidsperiode, ValidationError>
                name={name}
                labels={labels}
                dialogWidth="narrow"
                validate={validate}
                sortFunc={(d1, d2) => sortMaybeDateRange({ from: d1.fom }, { from: d2.fom })}
                formRenderer={({ onSubmit, onCancel, item, allItems }) => (
                    <TidsperiodeForm
                        tidsperiode={item}
                        alleTidsperioder={allItems}
                        minDate={minDate}
                        maxDate={maxDate}
                        onSubmit={onSubmit}
                        onCancel={onCancel}
                    />
                )}
                listRenderer={({ items, onEdit, onDelete }) => {
                    return <TidsperiodeList tidsperiode={items} onEdit={onEdit} onDelete={onDelete} />;
                }}
            />
        </>
    );
}

export default TidsperiodeListAndDialog;
