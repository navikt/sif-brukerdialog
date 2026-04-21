import { FormLayout } from '@navikt/sif-common-ui';
import { DateRange, dateUtils } from '@navikt/sif-common-utils';
import { getDateRangeValidator } from '@navikt/sif-validation';
import { createSifFormComponents, datePickerUtils, useSifValidate } from '@sif/rhf';
import { FormProvider, useForm } from 'react-hook-form';

import { useSifSoknadFormsIntl } from '../../i18n';
import { DateTidsperiode } from './types';

interface Props {
    formId: string;
    tidsperiode?: DateTidsperiode;
    alleTidsperioder?: DateTidsperiode[];
    minDate?: Date;
    maxDate?: Date;
    onValidSubmit: (tidsperiode: DateTidsperiode) => void;
}

enum TidsperiodeFormFields {
    fom = 'fom',
    tom = 'tom',
}

type TidsperiodeFormValues = {
    [TidsperiodeFormFields.fom]: string;
    [TidsperiodeFormFields.tom]: string;
};

const { DateRangePicker } = createSifFormComponents<TidsperiodeFormValues>();

const tidsperiodeToFormValues = (tidsperiode: DateTidsperiode): TidsperiodeFormValues => ({
    fom: dateUtils.dateToISODate(tidsperiode.fom),
    tom: dateUtils.dateToISODate(tidsperiode.tom),
});

const formValuesToDateTidsperiode = (values: TidsperiodeFormValues, id?: string): DateTidsperiode => {
    const fom = datePickerUtils.parseDatePickerValue(values.fom);
    const tom = datePickerUtils.parseDatePickerValue(values.tom);
    if (!fom || !tom) {
        throw new Error('Invalid date values');
    }
    return {
        id: id || crypto.randomUUID(),
        fom,
        tom,
    };
};

const getDisabledDateRanges = (
    tidsperiode: DateTidsperiode | undefined,
    alleTidsperioder: DateTidsperiode[],
): DateRange[] => {
    if (!tidsperiode) {
        return alleTidsperioder.map((t) => ({ from: t.fom, to: t.tom }));
    }
    return alleTidsperioder.filter((t) => t.id !== tidsperiode.id).map((t) => ({ from: t.fom, to: t.tom }));
};

export const TidsperiodeDialogForm = ({
    formId,
    tidsperiode,
    alleTidsperioder = [],
    minDate,
    maxDate,
    onValidSubmit,
}: Props) => {
    const sifIntl = useSifSoknadFormsIntl();
    const { validateField } = useSifValidate('@sifSoknadForms.tidsperiodeForm');
    const methods = useForm<TidsperiodeFormValues>({
        defaultValues: tidsperiode ? tidsperiodeToFormValues(tidsperiode) : undefined,
    });

    const disabledDateRanges = getDisabledDateRanges(tidsperiode, alleTidsperioder);

    const handleValidSubmit = (values: TidsperiodeFormValues): void => {
        onValidSubmit(formValuesToDateTidsperiode(values, tidsperiode?.id));
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
                            name="tidsperiode"
                            legend={sifIntl.text('@sifSoknadForms.tidsperiode.form.tidsperiode.legend')}
                            fromInputProps={{
                                name: TidsperiodeFormFields.fom,
                                label: sifIntl.text('@sifSoknadForms.tidsperiode.form.fom.label'),
                                minDate,
                                maxDate,
                                disabledDateRanges,
                                validate: validateField(
                                    TidsperiodeFormFields.fom,
                                    (value) =>
                                        getDateRangeValidator({
                                            required: true,
                                            min: minDate,
                                            max: maxDate,
                                            toDate: datePickerUtils.parseDatePickerValue(
                                                methods.getValues(TidsperiodeFormFields.tom),
                                            ),
                                        }).validateFromDate(value),
                                    (errorCode) => {
                                        if (errorCode === 'dateIsBeforeMin' && minDate)
                                            return { dato: sifIntl.date(minDate, 'compact') };
                                        if (errorCode === 'dateIsAfterMax' && maxDate)
                                            return { dato: sifIntl.date(maxDate, 'compact') };
                                    },
                                ),
                            }}
                            toInputProps={{
                                name: TidsperiodeFormFields.tom,
                                label: sifIntl.text('@sifSoknadForms.tidsperiode.form.tom.label'),
                                minDate,
                                maxDate,
                                disabledDateRanges,
                                validate: validateField(
                                    TidsperiodeFormFields.tom,
                                    (value) =>
                                        getDateRangeValidator({
                                            required: true,
                                            min: minDate,
                                            max: maxDate,
                                            fromDate: datePickerUtils.parseDatePickerValue(
                                                methods.getValues(TidsperiodeFormFields.fom),
                                            ),
                                        }).validateToDate(value),
                                    (errorCode) => {
                                        if (errorCode === 'dateIsBeforeMin' && minDate)
                                            return { dato: sifIntl.date(minDate, 'compact') };
                                        if (errorCode === 'dateIsAfterMax' && maxDate)
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
