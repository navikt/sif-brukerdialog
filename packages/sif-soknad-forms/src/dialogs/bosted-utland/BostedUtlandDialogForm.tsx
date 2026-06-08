import { FormLayout } from '@navikt/sif-common-ui';
import { dateUtils, getCountryName } from '@navikt/sif-common-utils';
import { getDateValidator, getRequiredFieldValidator } from '@navikt/sif-validation';
import { createSifFormComponents, datePickerUtils, useSifValidate } from '@sif/rhf';
import { FormProvider, useForm } from 'react-hook-form';

import { useSifSoknadFormsIntl } from '../../i18n';
import { BostedUtland } from '.';

interface BostedUtlandFormProps {
    formId: string;
    minDate?: Date;
    maxDate?: Date;
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

const formValuesToBostedUtland = (values: BostedUtlandFormValues, locale: string, bostedId?: string): BostedUtland => {
    const from = datePickerUtils.parseDatePickerValue(values.fom);
    const to = datePickerUtils.parseDatePickerValue(values.tom);
    if (!from || !to) {
        throw new Error('Invalid date values');
    }
    return {
        id: bostedId || crypto.randomUUID(),
        periode: { from, to },
        landkode: values.landkode,
        landnavn: getCountryName(values.landkode, locale),
    };
};

const bostedUtlandToFormValues = (bosted: BostedUtland): BostedUtlandFormValues => {
    return {
        fom: dateUtils.dateToISODate(bosted.periode.from),
        tom: dateUtils.dateToISODate(bosted.periode.to),
        landkode: bosted.landkode,
    };
};

export const BostedUtlandDialogForm = ({
    formId,
    minDate,
    maxDate,
    bosted,
    alleBosteder,
    onValidSubmit,
}: BostedUtlandFormProps) => {
    const sifIntl = useSifSoknadFormsIntl();
    const { validateField } = useSifValidate('@sifSoknadForms.bostedUtlandForm');
    const methods = useForm<BostedUtlandFormValues>({
        defaultValues: bosted ? bostedUtlandToFormValues(bosted) : undefined,
    });

    const utilgjengeligePerioder = (alleBosteder?.filter((b) => b.id !== bosted?.id) || []).map((b) => b.periode);

    const handleValidSubmit = (values: BostedUtlandFormValues): void => {
        onValidSubmit(formValuesToBostedUtland(values, sifIntl.locale, bosted?.id));
    };

    const validateLandkode = validateField(BostedUtlandFormFields.landkode, getRequiredFieldValidator());

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
                            name="bosted"
                            legend={sifIntl.text('@sifSoknadForms.bostedUtland.form.tidsperiode.legend')}
                            validate={validateField('bosted', ({ fromDate, toDate }) => {
                                if (fromDate && toDate && fromDate > toDate) return 'fromDateIsAfterToDate';
                            })}
                            fromInputProps={{
                                name: BostedUtlandFormFields.fom,
                                label: sifIntl.text('@sifSoknadForms.bostedUtland.form.fom.label'),
                                minDate,
                                maxDate,
                                disabledDateRanges: utilgjengeligePerioder,
                                validate: validateField(
                                    BostedUtlandFormFields.fom,
                                    getDateValidator({ required: true, min: minDate, max: maxDate }),
                                    (errorCode) => {
                                        if (errorCode === 'dateIsBeforeMin' && minDate)
                                            return { dato: sifIntl.date(minDate, 'compact') };
                                        if (errorCode === 'dateIsAfterMax' && maxDate)
                                            return { dato: sifIntl.date(maxDate, 'compact') };
                                    },
                                ),
                            }}
                            toInputProps={{
                                name: BostedUtlandFormFields.tom,
                                label: sifIntl.text('@sifSoknadForms.bostedUtland.form.tom.label'),
                                minDate,
                                maxDate,
                                disabledDateRanges: utilgjengeligePerioder,
                                validate: validateField(
                                    BostedUtlandFormFields.tom,
                                    getDateValidator({ required: true, min: minDate, max: maxDate }),
                                    (errorCode) => {
                                        if (errorCode === 'dateIsBeforeMin' && minDate)
                                            return { dato: sifIntl.date(minDate, 'compact') };
                                        if (errorCode === 'dateIsAfterMax' && maxDate)
                                            return { dato: sifIntl.date(maxDate, 'compact') };
                                    },
                                ),
                            }}
                        />
                        <CountrySelect
                            name={BostedUtlandFormFields.landkode}
                            label={sifIntl.text('@sifSoknadForms.bostedUtland.form.land.label')}
                            validate={validateLandkode}
                        />
                    </FormLayout.Questions>
                </FormLayout.Content>
            </form>
        </FormProvider>
    );
};
