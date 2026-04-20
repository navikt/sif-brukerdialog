import { FormLayout } from '@navikt/sif-common-ui';
import { dateUtils } from '@navikt/sif-common-utils';
import { getDateRangeValidator, validationUtils } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { FormProvider, useForm } from 'react-hook-form';

import { useSifSoknadFormsIntl } from '../../i18n';
import { Ferieuttak } from './types';

export interface FerieuttakDialogFormConfig {
    disableWeekends?: boolean;
}

interface Props extends FerieuttakDialogFormConfig {
    formId: string;
    ferieuttak?: Ferieuttak;
    alleFerieuttak?: Ferieuttak[];
    minDate: Date;
    maxDate: Date;
    disableWeekends?: boolean;
    onValidSubmit: (ferieuttak: Ferieuttak) => void;
}

enum FerieuttakFormFields {
    fom = 'fom',
    tom = 'tom',
}

type FerieuttakFormValues = {
    [FerieuttakFormFields.fom]: string;
    [FerieuttakFormFields.tom]: string;
};

const { DateRangePicker } = createSifFormComponents<FerieuttakFormValues>();

const ferieuttakToFormValues = (ferieuttak: Ferieuttak): FerieuttakFormValues => ({
    fom: dateUtils.dateToISODate(ferieuttak.from),
    tom: dateUtils.dateToISODate(ferieuttak.to),
});

const formValuesToFerieuttak = (values: FerieuttakFormValues, id?: string): Ferieuttak => {
    const from = validationUtils.getDateFromDateString(values.fom);
    const to = validationUtils.getDateFromDateString(values.tom);
    if (!from || !to) {
        throw new Error('Invalid date values');
    }
    return {
        id: id || crypto.randomUUID(),
        from,
        to,
    };
};

export const FerieuttakDialogForm = ({
    formId,
    ferieuttak,
    alleFerieuttak = [],
    minDate,
    maxDate,
    disableWeekends,
    onValidSubmit,
}: Props) => {
    const sifIntl = useSifSoknadFormsIntl();
    const { validateField } = useSifValidate('@sifSoknadForms.ferieuttakForm');
    const methods = useForm<FerieuttakFormValues>({
        defaultValues: ferieuttak ? ferieuttakToFormValues(ferieuttak) : undefined,
    });

    const andreFerieuttak = (alleFerieuttak.filter((f) => f.id !== ferieuttak?.id) || []).map((f) => ({
        from: f.from,
        to: f.to,
    }));

    const handleValidSubmit = (values: FerieuttakFormValues): void => {
        onValidSubmit(formValuesToFerieuttak(values, ferieuttak?.id));
    };

    return (
        <FormProvider {...methods}>
            <form
                id={formId}
                onSubmit={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    methods.handleSubmit(handleValidSubmit)();
                }}
                noValidate>
                <FormLayout.Content>
                    <FormLayout.Questions>
                        <DateRangePicker
                            name="ferieuttak"
                            legend={sifIntl.text('@sifSoknadForms.ferieuttak.form.tidsperiode.legend')}
                            fromInputProps={{
                                name: FerieuttakFormFields.fom,
                                label: sifIntl.text('@sifSoknadForms.ferieuttak.form.fom.label'),
                                minDate,
                                maxDate,
                                disabledDateRanges: andreFerieuttak,
                                disableWeekends,
                                validate: validateField(
                                    FerieuttakFormFields.fom,
                                    (value) =>
                                        getDateRangeValidator({
                                            required: true,
                                            min: minDate,
                                            max: maxDate,
                                            toDate: validationUtils.getDateFromDateString(
                                                methods.getValues(FerieuttakFormFields.tom),
                                            ),
                                        }).validateFromDate(value),
                                    (errorCode) => {
                                        if (errorCode === 'dateIsBeforeMin') return { dato: sifIntl.date(minDate, 'compact') };
                                        if (errorCode === 'dateIsAfterMax') return { dato: sifIntl.date(maxDate, 'compact') };
                                    },
                                ),
                            }}
                            toInputProps={{
                                name: FerieuttakFormFields.tom,
                                label: sifIntl.text('@sifSoknadForms.ferieuttak.form.tom.label'),
                                minDate,
                                maxDate,
                                disabledDateRanges: andreFerieuttak,
                                disableWeekends,
                                validate: validateField(
                                    FerieuttakFormFields.tom,
                                    (value) =>
                                        getDateRangeValidator({
                                            required: true,
                                            min: minDate,
                                            max: maxDate,
                                            fromDate: validationUtils.getDateFromDateString(
                                                methods.getValues(FerieuttakFormFields.fom),
                                            ),
                                        }).validateToDate(value),
                                    (errorCode) => {
                                        if (errorCode === 'dateIsBeforeMin') return { dato: sifIntl.date(minDate, 'compact') };
                                        if (errorCode === 'dateIsAfterMax') return { dato: sifIntl.date(maxDate, 'compact') };
                                    },
                                ),
                            }}
                        />
                    </FormLayout.Questions>
                </FormLayout.Content>
            </form>
        </FormProvider>
    );
};
