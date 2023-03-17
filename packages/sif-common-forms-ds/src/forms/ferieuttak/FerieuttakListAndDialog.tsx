import React from 'react';
import {
    FormikModalFormAndList,
    ModalFormAndListLabels,
    TypedFormInputValidationProps,
} from '@navikt/sif-common-formik-ds';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import { DateRange, sortMaybeDateRange } from '@navikt/sif-common-utils';
import FerieuttakForm from './FerieuttakForm';
import FerieuttakList, { FerieuttakListProps } from './FerieuttakList';
import { Ferieuttak } from './types';
import { ModalFormAndListConfirmDeleteProps } from '@navikt/sif-common-formik-ds/lib/components/formik-modal-form/modal-form-and-list/ModalFormAndList';

interface Props<FieldNames> extends TypedFormInputValidationProps<FieldNames, ValidationError> {
    name: FieldNames;
    minDate: Date;
    maxDate: Date;
    disabledDateRanges?: DateRange[];
    disableWeekend?: boolean;
    labels: ModalFormAndListLabels;
    confirmDelete?: ModalFormAndListConfirmDeleteProps<Ferieuttak>;
    listRenderer?: (props: FerieuttakListProps) => React.ReactNode;
    ListComponent?: typeof FerieuttakList;
}

function FerieuttakListAndDialog<FieldNames>({
    name,
    minDate,
    maxDate,
    labels,
    disableWeekend,
    disabledDateRanges,
    confirmDelete,
    listRenderer,
    ListComponent,
    validate,
}: Props<FieldNames>) {
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
                        disableWeekend={disableWeekend}
                        utilgjengeligePerioder={disabledDateRanges}
                        alleFerieuttak={allItems}
                    />
                )}
                confirmDelete={confirmDelete}
                listRenderer={({ items, onDelete, onEdit }) => {
                    if (ListComponent) {
                        return <ListComponent ferieuttak={items} onDelete={onDelete} onEdit={onEdit} />;
                    }
                    return listRenderer ? (
                        listRenderer({ ferieuttak: items, onDelete, onEdit })
                    ) : (
                        <FerieuttakList ferieuttak={items} onEdit={onEdit} onDelete={onDelete} />
                    );
                }}
            />
        </>
    );
}

export default FerieuttakListAndDialog;
