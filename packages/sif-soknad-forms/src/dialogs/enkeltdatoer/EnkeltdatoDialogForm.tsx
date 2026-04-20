import { FormLayout } from '@navikt/sif-common-ui';
import { DateRange, dateUtils } from '@navikt/sif-common-utils';
import { getDateRangeValidator, validationUtils } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { FormProvider, useForm } from 'react-hook-form';

import { useSifSoknadFormsIntl } from '../../i18n';
import { Enkeltdato } from './types';

export interface EnkeltdatoDialogFormConfig {
    disabledDateRanges?: DateRange[];
    disableWeekends?: boolean;
}

interface Props extends EnkeltdatoDialogFormConfig {
    formId: string;
    enkeltdato?: Enkeltdato;
    minDate: Date;
    maxDate: Date;
    alleEnkeltdatoer?: Enkeltdato[];
    onValidSubmit: (enkeltdato: Enkeltdato) => void;
}

enum EnkeltdatoFormFields {
    dato = 'dato',
}

type EnkeltdatoFormValues = {
    [EnkeltdatoFormFields.dato]: string;
};

const { Datepicker } = createSifFormComponents<EnkeltdatoFormValues>();

const enkeltdatoToFormValues = (enkeltdato: Enkeltdato): EnkeltdatoFormValues => ({
    dato: dateUtils.dateToISODate(enkeltdato.dato),
});

const formValuesToEnkeltdato = (values: EnkeltdatoFormValues, id?: string): Enkeltdato => {
    const dato = validationUtils.getDateFromDateString(values.dato);
    if (!dato) {
        throw new Error('Invalid dato value');
    }
    return {
        id: id || crypto.randomUUID(),
        dato,
    };
};

export const EnkeltdatoDialogForm = ({
    formId,
    enkeltdato,
    minDate,
    maxDate,
    alleEnkeltdatoer = [],
    disabledDateRanges = [],
    disableWeekends,
    onValidSubmit,
}: Props) => {
    const sifIntl = useSifSoknadFormsIntl();
    const { validateField } = useSifValidate('@sifSoknadForms.enkeltdatoForm');
    const methods = useForm<EnkeltdatoFormValues>({
        defaultValues: enkeltdato ? enkeltdatoToFormValues(enkeltdato) : undefined,
    });

    const disabledDates: DateRange[] = alleEnkeltdatoer
        .filter((d) => d.id !== enkeltdato?.id)
        .map((d) => ({ from: d.dato, to: d.dato }));

    const handleValidSubmit = (values: EnkeltdatoFormValues): void => {
        onValidSubmit(formValuesToEnkeltdato(values, enkeltdato?.id));
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
                        <Datepicker
                            name={EnkeltdatoFormFields.dato}
                            label={sifIntl.text('@sifSoknadForms.enkeltdato.form.dato.label')}
                            minDate={minDate}
                            maxDate={maxDate}
                            disableWeekends={disableWeekends}
                            disabledDateRanges={[...disabledDates, ...disabledDateRanges]}
                            validate={validateField(
                                EnkeltdatoFormFields.dato,
                                (value) =>
                                    getDateRangeValidator({
                                        required: true,
                                        min: minDate,
                                        max: maxDate,
                                    }).validateFromDate(value),
                                (errorCode) => {
                                    if (errorCode === 'dateIsBeforeMin') return { dato: sifIntl.date(minDate, 'compact') };
                                    if (errorCode === 'dateIsAfterMax') return { dato: sifIntl.date(maxDate, 'compact') };
                                },
                            )}
                        />
                    </FormLayout.Questions>
                </FormLayout.Content>
            </form>
        </FormProvider>
    );
};
