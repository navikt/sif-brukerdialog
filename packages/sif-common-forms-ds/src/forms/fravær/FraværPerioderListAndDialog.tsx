import { ReactElement } from 'react';
import {
    FormikModalFormAndList,
    ModalFormAndListLabels,
    TypedFormInputValidationProps,
} from '@navikt/sif-common-formik-ds';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { DateRange, sortMaybeDateRange } from '@navikt/sif-common-utils';
import FraværPeriodeForm from './FraværPeriodeForm';
import FraværPerioderList from './FraværPerioderList';
import { FraværPeriode } from './types';

interface Props<FieldNames> extends TypedFormInputValidationProps<FieldNames, ValidationError> {
    name: FieldNames;
    minDate: Date;
    maxDate: Date;
    labels: ModalFormAndListLabels;
    periodeDescription?: ReactElement;
    formHeaderContent?: ReactElement;
    dateRangesToDisable?: DateRange[];
    begrensTilSammeÅr?: boolean;
    helgedagerIkkeTillat?: boolean;
    begrensTilSammeÅrAlertStripeTekst?: string;
}

function FraværPerioderListAndDialog<FieldNames>({
    name,
    minDate,
    maxDate,
    dateRangesToDisable,
    periodeDescription,
    formHeaderContent,
    begrensTilSammeÅr = true,
    begrensTilSammeÅrAlertStripeTekst,
    validate,
    labels,
    helgedagerIkkeTillat,
}: Props<FieldNames>) {
    return (
        <>
            <FormikModalFormAndList<FieldNames, FraværPeriode, ValidationError>
                name={name}
                labels={labels}
                dialogWidth="narrow"
                validate={validate}
                sortFunc={(fraværPeriodeA: FraværPeriode, fraværPeriodeB: FraværPeriode) =>
                    sortMaybeDateRange({ from: fraværPeriodeA.fraOgMed }, { from: fraværPeriodeB.tilOgMed })
                }
                formRenderer={({ onSubmit, onCancel, item }) => (
                    <FraværPeriodeForm
                        fraværPeriode={item}
                        periodeDescription={periodeDescription}
                        minDate={minDate}
                        maxDate={maxDate}
                        headerContent={formHeaderContent}
                        dateRangesToDisable={dateRangesToDisable}
                        helgedagerIkkeTillat={helgedagerIkkeTillat}
                        begrensTilSammeÅr={begrensTilSammeÅr}
                        begrensTilSammeÅrAlertStripeTekst={begrensTilSammeÅrAlertStripeTekst}
                        onSubmit={onSubmit}
                        onCancel={onCancel}
                    />
                )}
                listRenderer={({ items, onEdit, onDelete }) => (
                    <FraværPerioderList fraværPerioder={items} onEdit={onEdit} onDelete={onDelete} />
                )}
            />
        </>
    );
}

export default FraværPerioderListAndDialog;
