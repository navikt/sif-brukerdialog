import { getCountryName } from '@navikt/sif-common-formik-ds';
import { FormLayout } from '@navikt/sif-common-ui';
import { dateUtils } from '@navikt/sif-common-utils';
import { getDateRangeValidator, getRequiredFieldValidator, validationUtils } from '@navikt/sif-validation';
import { createSifFormComponents } from '@sif/rhf';
import { FormProvider, useForm } from 'react-hook-form';

import { BostedUtland } from '.';

interface BostedUtlandFormProps {
    formId: string;
    bosted?: BostedUtland;
    onValidSubmit: (values: BostedUtland) => void;
}

enum BostedUtlandFormFields {
    fom = 'fom',
    tom = 'tom',
    landkode = 'landkode',
}

type BostedUtlandFormValues = {
    [BostedUtlandFormFields.fom]: string;
    [BostedUtlandFormFields.tom]: string;
    [BostedUtlandFormFields.landkode]: string;
};

const { DateRangePicker, CountrySelect } = createSifFormComponents<BostedUtlandFormValues>();

const formValuesToBostedUtland = (values: BostedUtlandFormValues): BostedUtland => {
    const from = validationUtils.getDateFromDateString(values.fom);
    const to = validationUtils.getDateFromDateString(values.tom);
    if (!from || !to) {
        throw new Error('Invalid date values');
    }
    return {
        id: crypto.randomUUID(),
        periode: { from, to },
        landkode: values.landkode,
        landnavn: getCountryName(values.landkode, 'nb'),
    };
};

const bostedUtlandToFormValues = (bosted: BostedUtland): BostedUtlandFormValues => {
    return {
        fom: dateUtils.dateToISODate(bosted.periode.from),
        tom: dateUtils.dateToISODate(bosted.periode.to),
        landkode: bosted.landkode,
    };
};

export const BostedUtlandDialogForm = ({ formId, bosted, onValidSubmit }: BostedUtlandFormProps) => {
    const methods = useForm<BostedUtlandFormValues>({
        defaultValues: bosted ? bostedUtlandToFormValues(bosted) : undefined,
    });

    const handleValidSubmit = (values: BostedUtlandFormValues): void => {
        const from = validationUtils.getDateFromDateString(values.fom);
        const to = validationUtils.getDateFromDateString(values.tom);
        if (!from || !to) {
            throw new Error('Invalid date values');
        }
        onValidSubmit(formValuesToBostedUtland(values));
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
                        <FormLayout.Questions>
                            <DateRangePicker
                                name="bosted"
                                legend="Oppgi tidsperiode"
                                fromInputProps={{
                                    name: BostedUtlandFormFields.fom,
                                    label: 'Fra dato',
                                    validate: (value) =>
                                        getDateRangeValidator({
                                            required: true,
                                            toDate: validationUtils.getDateFromDateString(
                                                methods.getValues(BostedUtlandFormFields.tom),
                                            ),
                                        }).validateFromDate(value),
                                }}
                                toInputProps={{
                                    name: BostedUtlandFormFields.tom,
                                    label: 'Til dato',
                                    validate: (value) =>
                                        getDateRangeValidator({
                                            required: true,
                                            fromDate: validationUtils.getDateFromDateString(
                                                methods.getValues(BostedUtlandFormFields.fom),
                                            ),
                                        }).validateToDate(value),
                                }}
                                // validate={(values) => {
                                //     return `${values.from}-${values.to}`;
                                // }}
                            />
                            <CountrySelect
                                name={BostedUtlandFormFields.landkode}
                                label="Velg land"
                                validate={(value) => getRequiredFieldValidator()(value)}
                            />
                        </FormLayout.Questions>
                    </FormLayout.Questions>
                </FormLayout.Content>
            </form>
        </FormProvider>
    );
};
