import { FormLayout } from '@navikt/sif-common-ui';
import { dateUtils, getCountryName } from '@navikt/sif-common-utils';
import {
    getDateRangeValidator,
    getRequiredFieldValidator,
    ValidateDateError,
    ValidateDateRangeError,
    ValidateRequiredFieldError,
    validationUtils,
} from '@navikt/sif-validation';
import { createSifFormComponents } from '@sif/rhf';
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

const bostedUtlandValidationIntlKeys = {
    [BostedUtlandFormFields.fom]: {
        [ValidateDateError.dateHasNoValue]: '@sifSoknadForms.bostedUtlandForm.validation.fom.dateHasNoValue',
        [ValidateDateError.dateIsAfterMax]: '@sifSoknadForms.bostedUtlandForm.validation.fom.dateIsAfterMax',
        [ValidateDateError.dateIsBeforeMin]: '@sifSoknadForms.bostedUtlandForm.validation.fom.dateIsBeforeMin',
        [ValidateDateError.dateHasInvalidFormat]:
            '@sifSoknadForms.bostedUtlandForm.validation.fom.dateHasInvalidFormat',
        [ValidateDateRangeError.fromDateIsAfterToDate]:
            '@sifSoknadForms.bostedUtlandForm.validation.fom.fromDateIsAfterToDate',
    },
    [BostedUtlandFormFields.tom]: {
        [ValidateDateError.dateHasNoValue]: '@sifSoknadForms.bostedUtlandForm.validation.tom.dateHasNoValue',
        [ValidateDateError.dateIsAfterMax]: '@sifSoknadForms.bostedUtlandForm.validation.tom.dateIsAfterMax',
        [ValidateDateError.dateIsBeforeMin]: '@sifSoknadForms.bostedUtlandForm.validation.tom.dateIsBeforeMin',
        [ValidateDateError.dateHasInvalidFormat]:
            '@sifSoknadForms.bostedUtlandForm.validation.tom.dateHasInvalidFormat',
        [ValidateDateRangeError.toDateIsBeforeFromDate]:
            '@sifSoknadForms.bostedUtlandForm.validation.tom.toDateIsBeforeFromDate',
    },
    [BostedUtlandFormFields.landkode]: {
        [ValidateRequiredFieldError.noValue]: '@sifSoknadForms.bostedUtlandForm.validation.landkode.noValue',
    },
} as const;

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

export const BostedUtlandDialogForm = ({
    formId,
    minDate,
    maxDate,
    bosted,
    alleBosteder,
    onValidSubmit,
}: BostedUtlandFormProps) => {
    const intl = useSifSoknadFormsIntl();
    const methods = useForm<BostedUtlandFormValues>({
        defaultValues: bosted ? bostedUtlandToFormValues(bosted) : undefined,
    });

    const getValidationErrorMessage = (
        field: keyof typeof bostedUtlandValidationIntlKeys,
        errorCode: string | undefined,
        values?: Record<string, string | number | boolean | null | undefined | Date>,
    ): string | undefined => {
        if (!errorCode) {
            return undefined;
        }
        const key =
            bostedUtlandValidationIntlKeys[field][
                errorCode as keyof (typeof bostedUtlandValidationIntlKeys)[typeof field]
            ];
        return key ? intl.text(key, values) : undefined;
    };

    const utilgjengeligePerioder = (alleBosteder?.filter((b) => b.id !== bosted?.id) || []).map((b) => b.periode);

    const handleValidSubmit = (values: BostedUtlandFormValues): void => {
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
                                    minDate,
                                    disabledDateRanges: utilgjengeligePerioder,
                                    validate: (value) => {
                                        const toDate = validationUtils.getDateFromDateString(
                                            methods.getValues(BostedUtlandFormFields.tom),
                                        );
                                        const resolvedMaxDate =
                                            toDate && maxDate
                                                ? toDate < maxDate
                                                    ? toDate
                                                    : maxDate
                                                : toDate || maxDate;
                                        const error = getDateRangeValidator({
                                            required: true,
                                            min: minDate,
                                            max: resolvedMaxDate,
                                            toDate,
                                        }).validateFromDate(value);
                                        return getValidationErrorMessage(BostedUtlandFormFields.fom, error, {
                                            dato:
                                                error === ValidateDateError.dateIsBeforeMin && minDate
                                                    ? intl.date(minDate, 'compact')
                                                    : error === ValidateDateError.dateIsAfterMax && resolvedMaxDate
                                                      ? intl.date(resolvedMaxDate, 'compact')
                                                      : undefined,
                                        });
                                    },
                                }}
                                toInputProps={{
                                    name: BostedUtlandFormFields.tom,
                                    label: intl.text('@sifSoknadForms.bostedUtland.form.tom.label'),
                                    maxDate,
                                    disabledDateRanges: utilgjengeligePerioder,
                                    validate: (value) => {
                                        const fromDate = validationUtils.getDateFromDateString(
                                            methods.getValues(BostedUtlandFormFields.fom),
                                        );
                                        const resolvedMinDate =
                                            fromDate && minDate
                                                ? fromDate > minDate
                                                    ? fromDate
                                                    : minDate
                                                : fromDate || minDate;
                                        const error = getDateRangeValidator({
                                            required: true,
                                            min: resolvedMinDate,
                                            max: maxDate,
                                            fromDate,
                                        }).validateToDate(value);
                                        return getValidationErrorMessage(BostedUtlandFormFields.tom, error, {
                                            dato:
                                                error === ValidateDateError.dateIsBeforeMin && resolvedMinDate
                                                    ? intl.date(resolvedMinDate, 'compact')
                                                    : error === ValidateDateError.dateIsAfterMax && maxDate
                                                      ? intl.date(maxDate, 'compact')
                                                      : undefined,
                                        });
                                    },
                                }}
                            />
                            <CountrySelect
                                name={BostedUtlandFormFields.landkode}
                                label={intl.text('@sifSoknadForms.bostedUtland.form.land.label')}
                                validate={(value) =>
                                    getValidationErrorMessage(
                                        BostedUtlandFormFields.landkode,
                                        getRequiredFieldValidator()(value),
                                    )
                                }
                            />
                        </FormLayout.Questions>
                    </FormLayout.Questions>
                </FormLayout.Content>
            </form>
        </FormProvider>
    );
};
