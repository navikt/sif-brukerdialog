import { FormLayout } from '@navikt/sif-common-ui';
import { DateRange, dateUtils } from '@navikt/sif-common-utils';
import { getDateValidator, getRequiredFieldValidator, validationUtils } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { FormProvider, useForm } from 'react-hook-form';

import { useSifSoknadFormsIntl } from '../../i18n';
import { dateCollideWithRanges, dateErHelg, isDateRangeMatchingPeriode, toMaybeNumber } from './fraværUtils';
import { FraværDag } from './types';

export interface FraværDagDialogFormConfig {
    dateRangesToDisable?: DateRange[];
    helgedagerIkkeTillatt?: boolean;
    maksArbeidstidPerDag?: number;
}

interface Props extends FraværDagDialogFormConfig {
    formId: string;
    fraværDag?: FraværDag;
    minDate: Date;
    maxDate: Date;
    onValidSubmit: (fraværDag: FraværDag) => void;
}

enum FraværDagFormFields {
    dato = 'dato',
    timerArbeidsdag = 'timerArbeidsdag',
    timerFravær = 'timerFravær',
}

type FraværDagFormValues = {
    [FraværDagFormFields.dato]: string;
    [FraværDagFormFields.timerArbeidsdag]: string;
    [FraværDagFormFields.timerFravær]: string;
};

const { Datepicker, Select } = createSifFormComponents<FraværDagFormValues>();

const fraværDagToFormValues = (fraværDag: FraværDag): FraværDagFormValues => ({
    dato: dateUtils.dateToISODate(fraværDag.dato),
    timerArbeidsdag: fraværDag.timerArbeidsdag,
    timerFravær: fraværDag.timerFravær,
});

const formValuesToFraværDag = (values: FraværDagFormValues, id?: string): FraværDag => {
    const dato = validationUtils.getDateFromDateString(values.dato);
    if (!dato) {
        throw new Error('Invalid dato value');
    }
    return {
        id: id || crypto.randomUUID(),
        dato,
        timerArbeidsdag: values.timerArbeidsdag,
        timerFravær: values.timerFravær,
    };
};

const getTimerOptions = (maksTid: number): number[] => {
    const options: number[] = [];
    for (let tid = 0.5; tid <= maksTid; tid += 0.5) {
        options.push(tid);
    }
    return options;
};

const getDisabledRangesForDag = (
    fraværDag: FraværDag | undefined,
    dateRangesToDisable: DateRange[] | undefined,
): DateRange[] | undefined => {
    if (!dateRangesToDisable || !fraværDag) return dateRangesToDisable;
    return dateRangesToDisable.filter(
        (range) => !isDateRangeMatchingPeriode(range, fraværDag.dato, fraværDag.dato),
    );
};

export const FraværDagDialogForm = ({
    formId,
    fraværDag,
    minDate,
    maxDate,
    dateRangesToDisable,
    helgedagerIkkeTillatt,
    maksArbeidstidPerDag = 7.5,
    onValidSubmit,
}: Props) => {
    const sifIntl = useSifSoknadFormsIntl();
    const { validateField } = useSifValidate('@sifSoknadForms.fraværDagForm');
    const methods = useForm<FraværDagFormValues>({
        defaultValues: fraværDag ? fraværDagToFormValues(fraværDag) : undefined,
    });

    const disabledDateRanges = getDisabledRangesForDag(fraværDag, dateRangesToDisable);

    const handleValidSubmit = (values: FraværDagFormValues): void => {
        onValidSubmit(formValuesToFraværDag(values, fraværDag?.id));
    };

    const timerOptions = getTimerOptions(maksArbeidstidPerDag);

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
                            name={FraværDagFormFields.dato}
                            label={sifIntl.text('@sifSoknadForms.fraværDag.form.dato.label')}
                            minDate={minDate}
                            maxDate={maxDate}
                            disableWeekends={helgedagerIkkeTillatt}
                            disabledDateRanges={disabledDateRanges}
                            validate={validateField(
                                FraværDagFormFields.dato,
                                (value) => {
                                    const date = validationUtils.getDateFromDateString(value);
                                    if (helgedagerIkkeTillatt && date && dateErHelg(date)) {
                                        return 'er_helg';
                                    }
                                    if (date && dateCollideWithRanges(date, disabledDateRanges)) {
                                        return 'dato_kolliderer_med_annet_fravær';
                                    }
                                    return getDateValidator({ required: true, min: minDate, max: maxDate })(value);
                                },
                                (errorCode) => {
                                    if (errorCode === 'dateIsBeforeMin') return { dato: sifIntl.date(minDate, 'compact') };
                                    if (errorCode === 'dateIsAfterMax') return { dato: sifIntl.date(maxDate, 'compact') };
                                },
                            )}
                        />
                        <Select
                            name={FraværDagFormFields.timerArbeidsdag}
                            label={sifIntl.text('@sifSoknadForms.fraværDag.form.timerArbeidsdag.label')}
                            validate={validateField(FraværDagFormFields.timerArbeidsdag, getRequiredFieldValidator())}
                            style={{ maxWidth: '14rem' }}>
                            <option />
                            {timerOptions.map((tid) => (
                                <option key={tid} value={tid}>
                                    {sifIntl.text('@sifSoknadForms.fraværDag.form.timerOption', {
                                        tid,
                                        flertall: tid > 1,
                                    })}
                                </option>
                            ))}
                        </Select>
                        <Select
                            name={FraværDagFormFields.timerFravær}
                            label={sifIntl.text('@sifSoknadForms.fraværDag.form.timerFravær.label')}
                            validate={validateField(
                                FraværDagFormFields.timerFravær,
                                (value) => {
                                    const timerArbeidsdag = toMaybeNumber(
                                        methods.getValues(FraværDagFormFields.timerArbeidsdag),
                                    );
                                    const timerFravær = toMaybeNumber(value);
                                    if (timerArbeidsdag && timerFravær && timerFravær > timerArbeidsdag) {
                                        return 'fravær_timer_mer_enn_arbeidstimer';
                                    }
                                    return getRequiredFieldValidator()(value);
                                },
                            )}
                            style={{ maxWidth: '14rem' }}>
                            <option />
                            {timerOptions.map((tid) => (
                                <option key={tid} value={tid}>
                                    {sifIntl.text('@sifSoknadForms.fraværDag.form.timerOption', {
                                        tid,
                                        flertall: tid > 1,
                                    })}
                                </option>
                            ))}
                        </Select>
                    </FormLayout.Questions>
                </FormLayout.Content>
            </form>
        </FormProvider>
    );
};
