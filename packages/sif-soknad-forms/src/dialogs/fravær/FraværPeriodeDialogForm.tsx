import { FormLayout } from '@navikt/sif-common-ui';
import { DateRange, dateRangesCollide, dateToISODate, ISODate, isDateWeekDay } from '@sif/utils';
import { getISODateRangeValidator } from '@navikt/sif-validation';
import { createSifFormComponents, datePickerUtils, useSifValidate } from '@sif/rhf';
import { FormProvider, useForm } from 'react-hook-form';

import { useSifSoknadFormsIntl } from '../../i18n';
import { FraværPeriode } from './types';

export interface FraværPeriodeDialogFormConfig {
    dateRangesToDisable?: DateRange[];
    helgedagerIkkeTillat?: boolean;
    begrensTilSammeÅr?: boolean;
}

interface Props extends FraværPeriodeDialogFormConfig {
    formId: string;
    fraværPeriode?: FraværPeriode;
    minDate: ISODate;
    maxDate: ISODate;
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
    fraOgMed: dateToISODate(fraværPeriode.fraOgMed),
    tilOgMed: dateToISODate(fraværPeriode.tilOgMed),
});

const formValuesToFraværPeriode = (values: FraværPeriodeFormValues, id?: string): FraværPeriode => {
    const fraOgMed = datePickerUtils.parseDatePickerValueToISODate(values.fraOgMed);
    const tilOgMed = datePickerUtils.parseDatePickerValueToISODate(values.tilOgMed);
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
        (range) => range.from !== fraværPeriode.fraOgMed || range.to !== fraværPeriode.tilOgMed,
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
    const sifIntl = useSifSoknadFormsIntl();
    const { validateField } = useSifValidate('@sifSoknadForms.fraværPeriodeForm');
    const methods = useForm<FraværPeriodeFormValues>({
        defaultValues: fraværPeriode ? fraværPeriodeToFormValues(fraværPeriode) : undefined,
    });

    const disabledDateRanges = getPeriodeDisabledRanges(fraværPeriode, dateRangesToDisable);

    const handleValidSubmit = (values: FraværPeriodeFormValues): void => {
        onValidSubmit(formValuesToFraværPeriode(values, fraværPeriode?.id));
    };

    const validateFromDate = (value: string): string | undefined => {
        const date = datePickerUtils.parseDatePickerValueToISODate(value);
        if (helgedagerIkkeTillat && date && !isDateWeekDay(date)) {
            return 'er_helg';
        }
        const toDate = datePickerUtils.parseDatePickerValueToISODate(
            methods.getValues(FraværPeriodeFormFields.tilOgMed),
        );
        if (begrensTilSammeÅr && date && toDate && date.substring(0, 4) !== toDate.substring(0, 4)) {
            return 'fra_og_til_er_ulike_år';
        }
        return getISODateRangeValidator({
            required: true,
            min: minDate,
            max: maxDate,
            toDate: toDate ? toDate : undefined,
        }).validateFromDate(value);
    };

    const validateToDate = (value: string): string | undefined => {
        const date = datePickerUtils.parseDatePickerValueToISODate(value);
        if (helgedagerIkkeTillat && date && !isDateWeekDay(date)) {
            return 'er_helg';
        }
        const fromDate = datePickerUtils.parseDatePickerValueToISODate(
            methods.getValues(FraværPeriodeFormFields.fraOgMed),
        );
        if (begrensTilSammeÅr && date && fromDate && date.substring(0, 4) !== fromDate.substring(0, 4)) {
            return 'fra_og_til_er_ulike_år';
        }
        return getISODateRangeValidator({
            required: true,
            min: minDate,
            max: maxDate,
            fromDate: fromDate ? fromDate : undefined,
        }).validateToDate(value);
    };

    const validateRange = ({
        fromDate,
        toDate,
    }: {
        fromDate: ISODate | undefined;
        toDate: ISODate | undefined;
    }): string | undefined => {
        if (
            fromDate &&
            toDate &&
            disabledDateRanges.some((r) => dateRangesCollide([{ from: fromDate, to: toDate }, r]))
        ) {
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
                            legend={sifIntl.text('@sifSoknadForms.fraværPeriode.form.tidsperiode.legend')}
                            validate={(range) => {
                                const errorCode = validateRange(range);
                                if (errorCode) {
                                    return validateField('fraværPeriode', () => errorCode)('');
                                }
                                return undefined;
                            }}
                            fromInputProps={{
                                name: FraværPeriodeFormFields.fraOgMed,
                                label: sifIntl.text('@sifSoknadForms.fraværPeriode.form.fraOgMed.label'),
                                minDate,
                                maxDate,
                                disableWeekends: helgedagerIkkeTillat,
                                disabledDateRanges,
                                validate: validateField(
                                    FraværPeriodeFormFields.fraOgMed,
                                    validateFromDate,
                                    (errorCode) => {
                                        if (errorCode === 'dateIsBeforeMin')
                                            return { dato: sifIntl.date(minDate, 'compact') };
                                        if (errorCode === 'dateIsAfterMax')
                                            return { dato: sifIntl.date(maxDate, 'compact') };
                                    },
                                ),
                            }}
                            toInputProps={{
                                name: FraværPeriodeFormFields.tilOgMed,
                                label: sifIntl.text('@sifSoknadForms.fraværPeriode.form.tilOgMed.label'),
                                minDate,
                                maxDate,
                                disableWeekends: helgedagerIkkeTillat,
                                disabledDateRanges,
                                validate: validateField(
                                    FraværPeriodeFormFields.tilOgMed,
                                    validateToDate,
                                    (errorCode) => {
                                        if (errorCode === 'dateIsBeforeMin')
                                            return { dato: sifIntl.date(minDate, 'compact') };
                                        if (errorCode === 'dateIsAfterMax')
                                            return { dato: sifIntl.date(maxDate, 'compact') };
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
