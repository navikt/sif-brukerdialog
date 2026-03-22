import { FormLayout } from '@navikt/sif-common-ui';
import { dateUtils, getCountryName } from '@navikt/sif-common-utils';
import { getDateRangeValidator, getRequiredFieldValidator, validationUtils } from '@navikt/sif-validation';
import { createSifFormComponents } from '@sif/rhf';
import { FormProvider, useForm } from 'react-hook-form';

import { useSifSoknadFormsIntl } from '../../i18n';

import { BostedUtland } from '.';

interface BostedUtlandFormProps {
    formId: string;
    bosted?: BostedUtland;
    alleBosteder?: BostedUtland[];
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

const formValuesToBostedUtland = (values: BostedUtlandFormValues, bostedId?: string): BostedUtland => {
    const from = validationUtils.getDateFromDateString(values.fom);
    const to = validationUtils.getDateFromDateString(values.tom);
    if (!from || !to) {
        throw new Error('Invalid date values');
    }
    return {
        id: bostedId || crypto.randomUUID(),
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

export const BostedUtlandForm = ({ formId, bosted, alleBosteder, onValidSubmit }: BostedUtlandFormProps) => {
    const intl = useSifSoknadFormsIntl();
    const methods = useForm<BostedUtlandFormValues>({
        defaultValues: bosted ? bostedUtlandToFormValues(bosted) : undefined,
    });

    const utilgjengeligePerioder = (alleBosteder?.filter((b) => b.id !== bosted?.id) || []).map((b) => b.periode);

    const handleValidSubmit = (values: BostedUtlandFormValues): void => {
        const from = validationUtils.getDateFromDateString(values.fom);
        const to = validationUtils.getDateFromDateString(values.tom);
        if (!from || !to) {
            throw new Error('Invalid date values');
        }
        onValidSubmit(formValuesToBostedUtland(values, bosted?.id));
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
                                legend={intl.text('@sifSoknadForms.bostedUtland.form.tidsperiode.legend')}
                                fromInputProps={{
                                    name: BostedUtlandFormFields.fom,
                                    label: intl.text('@sifSoknadForms.bostedUtland.form.fom.label'),
                                    disabledDateRanges: utilgjengeligePerioder,
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
                                    label: intl.text('@sifSoknadForms.bostedUtland.form.tom.label'),
                                    disabledDateRanges: utilgjengeligePerioder,
                                    validate: (value) =>
                                        getDateRangeValidator({
                                            required: true,
                                            fromDate: validationUtils.getDateFromDateString(
                                                methods.getValues(BostedUtlandFormFields.fom),
                                            ),
                                        }).validateToDate(value),
                                }}
                            />
                            <CountrySelect
                                name={BostedUtlandFormFields.landkode}
                                label={intl.text('@sifSoknadForms.bostedUtland.form.land.label')}
                                validate={(value) => getRequiredFieldValidator()(value)}
                            />
                        </FormLayout.Questions>
                    </FormLayout.Questions>
                </FormLayout.Content>
            </form>
        </FormProvider>
    );
};
