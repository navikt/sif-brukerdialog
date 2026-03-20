import { FormLayout } from '@navikt/sif-common-ui';
import { getDateRangeValidator, getRequiredFieldValidator, validationUtils } from '@navikt/sif-validation';
import { createSifFormComponents } from '@sif/rhf';
import { FormProvider, useForm } from 'react-hook-form';

import { BostedUtland } from '.';

interface BostedUtlandFormProps {
    formId: string;
    bosted?: BostedUtland;
    onValidSubmit: (values: any) => void;
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

export const BostedUtlandForm = ({ formId, bosted, onValidSubmit }: BostedUtlandFormProps) => {
    const methods = useForm<BostedUtlandFormValues>({ defaultValues: bosted });

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    methods.handleSubmit(onValidSubmit)();
                }}
                noValidate
                id={formId}>
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
