import React from 'react';
import {
    FormikModalFormAndList,
    ModalFormAndListLabels,
    TypedFormInputValidationProps,
} from '@navikt/sif-common-formik-ds';
import { ModalFormAndListConfirmDeleteProps } from '@navikt/sif-common-formik-ds';
import { ValidationError } from '@navikt/sif-common-formik-ds';
import { DateRange, sortMaybeDateRange } from '@navikt/sif-common-utils';
import FerieuttakForm from './FerieuttakForm';
import FerieuttakList, { FerieuttakListProps } from './FerieuttakList';
import { Ferieuttak } from './types';

interface Props<FieldNames> extends TypedFormInputValidationProps<FieldNames, ValidationError> {
    name: FieldNames;
    minDate: Date;
    maxDate: Date;
    disabledDateRanges?: DateRange[];
    disableWeekend?: boolean;
    labels: ModalFormAndListLabels;
    confirmDelete?: ModalFormAndListConfirmDeleteProps<Ferieuttak>;
    onAfterChange?: (values: Ferieuttak[]) => void;
    listRenderer?: (props: FerieuttakListProps) => React.ReactNode;
}

function FerieuttakListAndDialog<FieldNames>({
    name,
    minDate,
    maxDate,
    labels,
    disableWeekend,
    disabledDateRanges,
    confirmDelete,
    onAfterChange,
    listRenderer,
    validate,
}: Props<FieldNames>) {
    return (
        <FormikModalFormAndList<FieldNames, Ferieuttak, ValidationError>
            name={name}
            labels={labels}
            dialogWidth="narrow"
            validate={validate}
            sortFunc={(d1, d2) => sortMaybeDateRange({ from: d1.from }, { from: d2.from })}
            onAfterChange={onAfterChange}
            formRenderer={({ onSubmit, onCancel, item, allItems }) => (
                <FerieuttakForm
                    ferieuttak={item}
                    minDate={minDate}
                    maxDate={maxDate}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    disableWeekends={disableWeekend}
                    utilgjengeligePerioder={disabledDateRanges}
                    alleFerieuttak={allItems}
                />
            )}
            confirmDelete={confirmDelete}
            listRenderer={({ items, onDelete, onEdit }) => {
                return listRenderer ? (
                    listRenderer({ ferieuttak: items, onDelete, onEdit })
                ) : (
                    <FerieuttakList ferieuttak={items} onEdit={onEdit} onDelete={onDelete} />
                );
            }}
        />
    );
}

export default FerieuttakListAndDialog;
