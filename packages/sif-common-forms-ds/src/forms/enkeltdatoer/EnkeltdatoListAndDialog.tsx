import {
    FormikModalFormAndList,
    ModalFormAndListLabels,
    TypedFormInputValidationProps,
} from '@navikt/sif-common-formik-ds';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { DateRange, sortMaybeDateRange } from '@navikt/sif-common-utils';
import EnkeltdatoForm from './EnkeltdatoForm';
import EnkeltdatoList from './EnkeltdatoList';
import { Enkeltdato } from './types';

interface Props<FieldNames> extends TypedFormInputValidationProps<FieldNames, ValidationError> {
    name: FieldNames;
    labels: ModalFormAndListLabels;
    minDate: Date;
    maxDate: Date;
    labelRenderer?: (dato: Enkeltdato) => React.ReactNode;
    disabledDateRanges?: DateRange[];
}

function EnkeltdatoListAndDialog<FieldNames>({
    name,
    minDate,
    maxDate,
    disabledDateRanges = [],
    validate,
    labelRenderer,
    labels,
}: Props<FieldNames>) {
    return (
        <>
            <FormikModalFormAndList<FieldNames, Enkeltdato, ValidationError>
                name={name}
                labels={labels}
                dialogWidth="narrow"
                validate={validate}
                sortFunc={(d1, d2) => sortMaybeDateRange({ from: d1.dato }, { from: d2.dato })}
                formRenderer={({ onSubmit, onCancel, item, allItems }) => (
                    <EnkeltdatoForm
                        enkeltdato={item}
                        maxDate={maxDate}
                        minDate={minDate}
                        alleEnkeltdatoer={allItems}
                        disabledDateRanges={disabledDateRanges}
                        onSubmit={onSubmit}
                        onCancel={onCancel}
                    />
                )}
                listRenderer={({ items, onEdit, onDelete }) => {
                    return (
                        <EnkeltdatoList
                            labelRenderer={labelRenderer}
                            enkeltdatoer={items}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    );
                }}
            />
        </>
    );
}

export default EnkeltdatoListAndDialog;
