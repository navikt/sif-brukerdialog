import { FormLayout } from '@navikt/sif-common-ui';
import { DateRange, dateUtils } from '@navikt/sif-common-utils';
import { getDateRangeValidator, validationUtils } from '@navikt/sif-validation';
import { createSifFormComponents } from '@sif/rhf';
import { FormProvider, useForm } from 'react-hook-form';

import { useSifSoknadFormsIntl } from '../../i18n';
import { dateErHelg, rangeCollideWithRanges } from './fraværUtils';
import { FraværPeriode } from './types';

interface Props {
    formId: string;
    fraværPeriode?: FraværPeriode;
    minDate: Date;
    maxDate: Date;
    dateRangesToDisable?: DateRange[];
    helgedagerIkkeTillat?: boolean;
    begrensTilSammeÅr?: boolean;
    onValidSubmit: (fraværPeriode: FraværPeriode) => void;
}

enum FraværPeriodeFormFields {
    fraOgMed = 'fraOgMed',
    tilOgMed = 'tilOgMed',
}

type FraværPeriodeFormValues = {
    [FraværPeriodeFormFields.fraOgMed]: string;
    [FraværPeriodeFormFields.tilOgMed]: string;
};

const { DateRangePicker } = createSifFormComponents<FraværPeriodeFormValues>();

const fraværPeriodeToFormValues = (fraværPeriode: FraværPeriode): FraværPeriodeFormValues => ({
    fraOgMed: dateUtils.dateToISODate(fraværPeriode.fraOgMed),
    tilOgMed: dateUtils.dateToISODate(fraværPeriode.tilOgMed),
});

const formValuesToFraværPeriode = (values: FraværPeriodeFormValues, id?: string): FraværPeriode => {
    const fraOgMed = validationUtils.getDateFromDateString(values.fraOgMed);
    const tilOgMed = validationUtils.getDateFromDateString(values.tilOgMed);
    if (!fraOgMed || !tilOgMed) {
        throw new Error('Invalid date values');
    }
    return {
        id: id || crypto.randomUUID(),
        fraOgMed,
        tilOgMed,
    };
};

const getPeriodeDisabledRanges = (
    fraværPeriode: FraværPeriode | undefined,
    dateRangesToDisable: DateRange[] | undefined,
): DateRange[] => {
    if (!dateRangesToDisable) return [];
    if (!fraværPeriode) return dateRangesToDisable;
    return dateRangesToDisable.filter(
        (range) => !(dateUtils.dateToISODate(range.from) === dateUtils.dateToISODate(fraværPeriode.fraOgMed) && dateUtils.dateToISODate(range.to) === dateUtils.dateToISODate(fraværPeriode.tilOgMed)),
    );
};

export const FraværPeriodeDialogForm = ({
    formId,
    fraværPeriode,
    minDate,
    maxDate,
    dateRangesToDisable,
    helgedagerIkkeTillat,
    begrensTilSammeÅr,
    onValidSubmit,
}: Props) => {
    const intl = useSifSoknadFormsIntl();
    const methods = useForm<FraværPeriodeFormValues>({
        defaultValues: fraværPeriode ? fraværPeriodeToFormValues(fraværPeriode) : undefined,
    });

    const disabledDateRanges = getPeriodeDisabledRanges(fraværPeriode, dateRangesToDisable);

    const handleValidSubmit = (values: FraværPeriodeFormValues): void => {
        onValidSubmit(formValuesToFraværPeriode(values, fraværPeriode?.id));
    };

    const validateFromDate = (value: string): string | undefined => {
        const dateStr = value;
        const date = validationUtils.getDateFromDateString(dateStr);
        if (helgedagerIkkeTillat && date && dateErHelg(date)) {
            return 'er_helg';
        }
        const toDate = validationUtils.getDateFromDateString(methods.getValues(FraværPeriodeFormFields.tilOgMed));
        if (begrensTilSammeÅr && date && toDate && date.getFullYear() !== toDate.getFullYear()) {
            return 'fra_og_til_er_ulike_år';
        }
        return getDateRangeValidator({
            required: true,
            min: minDate,
            max: maxDate,
            toDate,
        }).validateFromDate(value);
    };

    const validateToDate = (value: string): string | undefined => {
        const date = validationUtils.getDateFromDateString(value);
        if (helgedagerIkkeTillat && date && dateErHelg(date)) {
            return 'er_helg';
        }
        const fromDate = validationUtils.getDateFromDateString(methods.getValues(FraværPeriodeFormFields.fraOgMed));
        if (begrensTilSammeÅr && date && fromDate && date.getFullYear() !== fromDate.getFullYear()) {
            return 'fra_og_til_er_ulike_år';
        }
        return getDateRangeValidator({
            required: true,
            min: minDate,
            max: maxDate,
            fromDate,
        }).validateToDate(value);
    };

    const validateRange = ({
        fromDate,
        toDate,
    }: {
        fromDate: Date | undefined;
        toDate: Date | undefined;
    }): string | undefined => {
        if (fromDate && toDate && rangeCollideWithRanges({ from: fromDate, to: toDate }, disabledDateRanges)) {
            return 'dager_overlapper_med_andre_dager';
        }
        return undefined;
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
                            name="fraværPeriode"
                            legend={intl.text('@sifSoknadForms.fraværPeriode.form.tidsperiode.legend')}
                            validate={validateRange}
                            fromInputProps={{
                                name: FraværPeriodeFormFields.fraOgMed,
                                label: intl.text('@sifSoknadForms.fraværPeriode.form.fraOgMed.label'),
                                minDate,
                                maxDate,
                                disableWeekends: helgedagerIkkeTillat,
                                disabledDateRanges,
                                validate: validateFromDate,
                            }}
                            toInputProps={{
                                name: FraværPeriodeFormFields.tilOgMed,
                                label: intl.text('@sifSoknadForms.fraværPeriode.form.tilOgMed.label'),
                                minDate,
                                maxDate,
                                disableWeekends: helgedagerIkkeTillat,
                                disabledDateRanges,
                                validate: validateToDate,
                            }}
                        />
                    </FormLayout.Questions>
                </FormLayout.Content>
            </form>
        </FormProvider>
    );
};
