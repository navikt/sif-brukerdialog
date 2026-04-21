import { FormLayout } from '@navikt/sif-common-ui';
import { dateUtils, getDateToday } from '@navikt/sif-common-utils';
import { getDateRangeValidator, getRequiredFieldValidator, getStringValidator } from '@navikt/sif-validation';
import { createSifFormComponents, datePickerUtils, useSifValidate } from '@sif/rhf';
import { useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

import { useSifSoknadFormsIntl } from '../../i18n';
import { UtenlandskNæring, UtenlandskNæringstype } from './types';

interface Props {
    formId: string;
    næring?: UtenlandskNæring;
    onValidSubmit: (næring: UtenlandskNæring) => void;
}

enum FormFields {
    næringstype = 'næringstype',
    navnPåVirksomheten = 'navnPåVirksomheten',
    land = 'land',
    identifikasjonsnummer = 'identifikasjonsnummer',
    fraOgMed = 'fraOgMed',
    tilOgMed = 'tilOgMed',
    erPågående = 'erPågående',
}

type FormValues = {
    [FormFields.næringstype]: string;
    [FormFields.navnPåVirksomheten]: string;
    [FormFields.land]: string;
    [FormFields.identifikasjonsnummer]: string;
    [FormFields.fraOgMed]: string;
    [FormFields.tilOgMed]: string;
    [FormFields.erPågående]: boolean;
};

const { RadioGroup, TextField, CountrySelect, DateRangePicker, Checkbox } = createSifFormComponents<FormValues>();

const næringToFormValues = (næring: UtenlandskNæring): FormValues => ({
    næringstype: næring.næringstype,
    navnPåVirksomheten: næring.navnPåVirksomheten,
    land: næring.land,
    identifikasjonsnummer: næring.identifikasjonsnummer ?? '',
    fraOgMed: dateUtils.dateToISODate(næring.fraOgMed),
    tilOgMed: næring.tilOgMed ? dateUtils.dateToISODate(næring.tilOgMed) : '',
    erPågående: næring.erPågående ?? false,
});

const formValuesToNæring = (values: FormValues, id?: string): UtenlandskNæring => {
    const fraOgMed = datePickerUtils.parseDatePickerValue(values.fraOgMed);
    if (!fraOgMed || !values.land || !values.næringstype || !values.navnPåVirksomheten) {
        throw new Error('Invalid UtenlandskNæring form values');
    }
    return {
        id: id ?? crypto.randomUUID(),
        næringstype: values.næringstype as UtenlandskNæringstype,
        navnPåVirksomheten: values.navnPåVirksomheten,
        land: values.land,
        identifikasjonsnummer: values.identifikasjonsnummer || undefined,
        fraOgMed,
        tilOgMed: values.erPågående ? undefined : datePickerUtils.parseDatePickerValue(values.tilOgMed),
        erPågående: values.erPågående || undefined,
    };
};

export const UtenlandskNæringDialogForm = ({ formId, næring, onValidSubmit }: Props) => {
    const sifIntl = useSifSoknadFormsIntl();
    const { validateField } = useSifValidate('@sifSoknadFormsUtenlandskNæringForm');
    const methods = useForm<FormValues>({
        defaultValues: næring ? næringToFormValues(næring) : undefined,
    });

    const { watch } = methods;
    const navnPåVirksomheten = watch(FormFields.navnPåVirksomheten) || 'virksomheten';
    const erPågående = useWatch({ control: methods.control, name: FormFields.erPågående });
    const maxDate = getDateToday();

    useEffect(() => {
        if (erPågående) {
            methods.setValue(FormFields.tilOgMed, '');
        }
    }, [erPågående, methods]);

    const handleValidSubmit = (values: FormValues): void => {
        onValidSubmit(formValuesToNæring(values, næring?.id));
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
                        <RadioGroup
                            name={FormFields.næringstype}
                            legend={sifIntl.text('@sifSoknadForms.utenlandskNæring.form.næringstype.legend')}
                            radios={[
                                {
                                    value: UtenlandskNæringstype.FISKE,
                                    label: sifIntl.text(
                                        `@sifSoknadForms.utenlandskNæring.form.næringstype.${UtenlandskNæringstype.FISKE}`,
                                    ),
                                },
                                {
                                    value: UtenlandskNæringstype.JORDBRUK_SKOGBRUK,
                                    label: sifIntl.text(
                                        `@sifSoknadForms.utenlandskNæring.form.næringstype.${UtenlandskNæringstype.JORDBRUK_SKOGBRUK}`,
                                    ),
                                },
                                {
                                    value: UtenlandskNæringstype.DAGMAMMA,
                                    label: sifIntl.text(
                                        `@sifSoknadForms.utenlandskNæring.form.næringstype.${UtenlandskNæringstype.DAGMAMMA}`,
                                    ),
                                },
                                {
                                    value: UtenlandskNæringstype.ANNEN,
                                    label: sifIntl.text(
                                        `@sifSoknadForms.utenlandskNæring.form.næringstype.${UtenlandskNæringstype.ANNEN}`,
                                    ),
                                },
                            ]}
                            validate={validateField(FormFields.næringstype, getRequiredFieldValidator())}
                        />
                        <TextField
                            name={FormFields.navnPåVirksomheten}
                            label={sifIntl.text('@sifSoknadForms.utenlandskNæring.form.navnPåVirksomheten.label')}
                            maxLength={50}
                            validate={validateField(
                                FormFields.navnPåVirksomheten,
                                getStringValidator({ required: true }),
                            )}
                        />
                        <CountrySelect
                            name={FormFields.land}
                            label={sifIntl.text('@sifSoknadForms.utenlandskNæring.form.land.label', {
                                navn: navnPåVirksomheten,
                            })}
                            showOnlyEuAndEftaCountries={true}
                            validate={validateField(FormFields.land, getRequiredFieldValidator())}
                        />
                        <TextField
                            name={FormFields.identifikasjonsnummer}
                            label={sifIntl.text('@sifSoknadForms.utenlandskNæring.form.identifikasjonsnummer.label')}
                            style={{ maxWidth: '10rem' }}
                            maxLength={30}
                        />
                        <DateRangePicker
                            name="næringPeriode"
                            legend={sifIntl.text('@sifSoknadForms.utenlandskNæring.form.tidsperiode.legend', {
                                navn: navnPåVirksomheten,
                            })}
                            fromInputProps={{
                                name: FormFields.fraOgMed,
                                label: sifIntl.text('@sifSoknadForms.utenlandskNæring.form.fraOgMed.label'),
                                maxDate,
                                validate: validateField(
                                    FormFields.fraOgMed,
                                    (value) =>
                                        getDateRangeValidator({
                                            required: true,
                                            max: maxDate,
                                            toDate: datePickerUtils.parseDatePickerValue(
                                                methods.getValues(FormFields.tilOgMed),
                                            ),
                                        }).validateFromDate(value),
                                    (errorCode) => {
                                        if (errorCode === 'dateIsAfterMax')
                                            return { dato: sifIntl.date(maxDate, 'compact') };
                                    },
                                ),
                            }}
                            toInputProps={{
                                name: FormFields.tilOgMed,
                                label: sifIntl.text('@sifSoknadForms.utenlandskNæring.form.tilOgMed.label'),
                                maxDate,
                                inputDisabled: erPågående,
                                validate: erPågående
                                    ? undefined
                                    : validateField(
                                          FormFields.tilOgMed,
                                          (value) =>
                                              getDateRangeValidator({
                                                  required: true,
                                                  max: maxDate,
                                                  fromDate: datePickerUtils.parseDatePickerValue(
                                                      methods.getValues(FormFields.fraOgMed),
                                                  ),
                                              }).validateToDate(value),
                                          (errorCode) => {
                                              if (errorCode === 'dateIsAfterMax')
                                                  return { dato: sifIntl.date(maxDate, 'compact') };
                                          },
                                      ),
                            }}
                        />
                        <FormLayout.QuestionBleedTop>
                            <Checkbox name={FormFields.erPågående}>
                                {sifIntl.text('@sifSoknadForms.utenlandskNæring.form.erPågående.label')}
                            </Checkbox>
                        </FormLayout.QuestionBleedTop>
                    </FormLayout.Questions>
                </FormLayout.Content>
            </form>
        </FormProvider>
    );
};
