import React from 'react';
import { DateRange, sortItemsByFom } from '@navikt/sif-common-core/lib/utils/dateUtils';
import {
    FormikModalFormAndList,
    ModalFormAndListLabels,
    TypedFormInputValidationProps,
} from '@navikt/sif-common-formik-ds';
import FraværPeriodeForm from './FraværPeriodeForm';
import FraværPerioderList from './FraværPerioderList';
import { FraværPeriode } from './types';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';

interface Props<FieldNames> extends TypedFormInputValidationProps<FieldNames, ValidationError> {
    name: FieldNames;
    minDate: Date;
    maxDate: Date;
    labels: ModalFormAndListLabels;
    periodeDescription?: JSX.Element;
    formHeaderContent?: JSX.Element;
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
                    sortItemsByFom({ fom: fraværPeriodeA.fraOgMed }, { fom: fraværPeriodeB.tilOgMed })
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
