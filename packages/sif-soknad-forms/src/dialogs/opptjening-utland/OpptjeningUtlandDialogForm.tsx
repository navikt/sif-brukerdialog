import { FormLayout } from '@navikt/sif-common-ui';
import { dateUtils } from '@navikt/sif-common-utils';
import { getDateRangeValidator, getRequiredFieldValidator, getStringValidator, validationUtils } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { FormProvider, useForm } from 'react-hook-form';

import { useSifSoknadFormsIntl } from '../../i18n';
import { OpptjeningAktivitet, OpptjeningUtland } from './types';

interface Props {
    formId: string;
    opptjening?: OpptjeningUtland;
    minDate: Date;
    maxDate: Date;
    onValidSubmit: (opptjening: OpptjeningUtland) => void;
}

enum OpptjeningUtlandFormFields {
    fom = 'fom',
    tom = 'tom',
    landkode = 'landkode',
    opptjeningType = 'opptjeningType',
    navn = 'navn',
}

type OpptjeningUtlandFormValues = {
    [OpptjeningUtlandFormFields.fom]: string;
    [OpptjeningUtlandFormFields.tom]: string;
    [OpptjeningUtlandFormFields.landkode]: string;
    [OpptjeningUtlandFormFields.opptjeningType]: string;
    [OpptjeningUtlandFormFields.navn]: string;
};

const { DateRangePicker, CountrySelect, RadioGroup, TextField } = createSifFormComponents<OpptjeningUtlandFormValues>();

const opptjeningToFormValues = (opptjening: OpptjeningUtland): OpptjeningUtlandFormValues => ({
    fom: dateUtils.dateToISODate(opptjening.fom),
    tom: dateUtils.dateToISODate(opptjening.tom),
    landkode: opptjening.landkode,
    opptjeningType: opptjening.opptjeningType,
    navn: opptjening.navn,
});

const formValuesToOpptjeningUtland = (values: OpptjeningUtlandFormValues, id?: string): OpptjeningUtland => {
    const fom = validationUtils.getDateFromDateString(values.fom);
    const tom = validationUtils.getDateFromDateString(values.tom);
    if (!fom || !tom || !values.landkode || !values.opptjeningType || !values.navn) {
        throw new Error('Invalid opptjening utland values');
    }
    return {
        id: id || crypto.randomUUID(),
        fom,
        tom,
        landkode: values.landkode,
        opptjeningType: values.opptjeningType as OpptjeningAktivitet,
        navn: values.navn,
    };
};

export const OpptjeningUtlandDialogForm = ({ formId, opptjening, minDate, maxDate, onValidSubmit }: Props) => {
    const sifIntl = useSifSoknadFormsIntl();
    const { validateField } = useSifValidate('@sifSoknadForms.opptjeningUtlandForm');
    const methods = useForm<OpptjeningUtlandFormValues>({
        defaultValues: opptjening ? opptjeningToFormValues(opptjening) : undefined,
    });

    const { watch } = methods;
    const fom = watch(OpptjeningUtlandFormFields.fom);
    const tom = watch(OpptjeningUtlandFormFields.tom);
    const opptjeningType = watch(OpptjeningUtlandFormFields.opptjeningType) as OpptjeningAktivitet | undefined;

    const hasDateValues = Boolean(fom && tom);

    const handleValidSubmit = (values: OpptjeningUtlandFormValues): void => {
        onValidSubmit(formValuesToOpptjeningUtland(values, opptjening?.id));
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
                            name="opptjeningPeriode"
                            legend={sifIntl.text('@sifSoknadForms.opptjeningUtland.form.tidsperiode.legend')}
                            fromInputProps={{
                                name: OpptjeningUtlandFormFields.fom,
                                label: sifIntl.text('@sifSoknadForms.opptjeningUtland.form.fom.label'),
                                minDate,
                                maxDate,
                                validate: validateField(
                                    OpptjeningUtlandFormFields.fom,
                                    (value) =>
                                        getDateRangeValidator({
                                            required: true,
                                            min: minDate,
                                            max: maxDate,
                                            toDate: validationUtils.getDateFromDateString(
                                                methods.getValues(OpptjeningUtlandFormFields.tom),
                                            ),
                                        }).validateFromDate(value),
                                    (errorCode) => {
                                        if (errorCode === 'dateIsBeforeMin') return { dato: sifIntl.date(minDate, 'compact') };
                                        if (errorCode === 'dateIsAfterMax') return { dato: sifIntl.date(maxDate, 'compact') };
                                    },
                                ),
                            }}
                            toInputProps={{
                                name: OpptjeningUtlandFormFields.tom,
                                label: sifIntl.text('@sifSoknadForms.opptjeningUtland.form.tom.label'),
                                minDate,
                                maxDate,
                                validate: validateField(
                                    OpptjeningUtlandFormFields.tom,
                                    (value) =>
                                        getDateRangeValidator({
                                            required: true,
                                            min: minDate,
                                            max: maxDate,
                                            fromDate: validationUtils.getDateFromDateString(
                                                methods.getValues(OpptjeningUtlandFormFields.fom),
                                            ),
                                        }).validateToDate(value),
                                    (errorCode) => {
                                        if (errorCode === 'dateIsBeforeMin') return { dato: sifIntl.date(minDate, 'compact') };
                                        if (errorCode === 'dateIsAfterMax') return { dato: sifIntl.date(maxDate, 'compact') };
                                    },
                                ),
                            }}
                        />
                        {hasDateValues && (
                            <>
                                <CountrySelect
                                    name={OpptjeningUtlandFormFields.landkode}
                                    label={sifIntl.text('@sifSoknadForms.opptjeningUtland.form.land.label')}
                                    showOnlyEuAndEftaCountries={true}
                                    validate={validateField(OpptjeningUtlandFormFields.landkode, getRequiredFieldValidator())}
                                />
                                <RadioGroup
                                    name={OpptjeningUtlandFormFields.opptjeningType}
                                    legend={sifIntl.text('@sifSoknadForms.opptjeningUtland.form.opptjeningType.legend')}
                                    radios={[
                                        {
                                            value: OpptjeningAktivitet.ARBEIDSTAKER,
                                            label: sifIntl.text(
                                                '@sifSoknadForms.opptjeningUtland.form.opptjeningType.ARBEIDSTAKER',
                                            ),
                                        },
                                        {
                                            value: OpptjeningAktivitet.FRILANSER,
                                            label: sifIntl.text(
                                                '@sifSoknadForms.opptjeningUtland.form.opptjeningType.FRILANSER',
                                            ),
                                        },
                                    ]}
                                    validate={validateField(OpptjeningUtlandFormFields.opptjeningType, getRequiredFieldValidator())}
                                />
                                {opptjeningType && (
                                    <TextField
                                        name={OpptjeningUtlandFormFields.navn}
                                        label={
                                            opptjeningType === OpptjeningAktivitet.ARBEIDSTAKER
                                                ? sifIntl.text(
                                                      '@sifSoknadForms.opptjeningUtland.form.arbeidsgiversNavn.label',
                                                  )
                                                : sifIntl.text(
                                                      '@sifSoknadForms.opptjeningUtland.form.oppdragsgiverNavn.label',
                                                  )
                                        }
                                        validate={validateField(OpptjeningUtlandFormFields.navn, getStringValidator({ required: true }))}
                                    />
                                )}
                            </>
                        )}
                    </FormLayout.Questions>
                </FormLayout.Content>
            </form>
        </FormProvider>
    );
};
