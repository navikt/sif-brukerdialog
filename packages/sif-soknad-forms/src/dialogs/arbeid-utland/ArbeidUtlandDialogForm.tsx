import { FormLayout } from '@navikt/sif-common-ui';
import { dateToISODate, getCountryName, ISODate } from '@sif/utils';
import { getISODateValidator, getRequiredFieldValidator, getStringValidator } from '@navikt/sif-validation';
import { createSifFormComponents, datePickerUtils, useSifValidate } from '@sif/rhf';
import { FormProvider, useForm } from 'react-hook-form';

import { useSifSoknadFormsIntl } from '../../i18n';
import { ArbeidUtland } from '.';

interface ArbeidUtlandFormProps {
    formId: string;
    minDate?: ISODate;
    maxDate?: ISODate;
    arbeidssted?: ArbeidUtland;
    alleArbeider?: ArbeidUtland[];
    onValidSubmit: (values: ArbeidUtland) => void;
}

enum ArbeidUtlandFormFields {
    fom = 'fom',
    tom = 'tom',
    landkode = 'landkode',
    idnummer = 'idnummer',
}

type ArbeidUtlandFormValues = {
    [ArbeidUtlandFormFields.fom]: string;
    [ArbeidUtlandFormFields.tom]: string;
    [ArbeidUtlandFormFields.landkode]: string;
    [ArbeidUtlandFormFields.idnummer]?: string;
};

const { DateRangePicker, CountrySelect, TextField } = createSifFormComponents<ArbeidUtlandFormValues>();

const formValuesToArbeidUtland = (
    values: ArbeidUtlandFormValues,
    locale: string,
    arbeidsstedId?: string,
): ArbeidUtland => {
    const from = datePickerUtils.parseDatePickerValueToISODate(values.fom);
    const to = datePickerUtils.parseDatePickerValueToISODate(values.tom);
    if (!from || !to) {
        throw new Error('Invalid date values');
    }
    return {
        id: arbeidsstedId || crypto.randomUUID(),
        periode: { from, to },
        landkode: values.landkode,
        landnavn: getCountryName(values.landkode, locale),
    };
};

const arbeidUtlandToFormValues = (arbeidssted: ArbeidUtland): ArbeidUtlandFormValues => {
    return {
        fom: dateToISODate(arbeidssted.periode.from),
        tom: dateToISODate(arbeidssted.periode.to),
        landkode: arbeidssted.landkode,
        idnummer: arbeidssted.idnummer,
    };
};

export const ArbeidUtlandDialogForm = ({
    formId,
    minDate,
    maxDate,
    arbeidssted,
    alleArbeider,
    onValidSubmit,
}: ArbeidUtlandFormProps) => {
    const sifIntl = useSifSoknadFormsIntl();
    const { validateField } = useSifValidate('@sifSoknadForms.arbeidUtlandForm');
    const methods = useForm<ArbeidUtlandFormValues>({
        defaultValues: arbeidssted ? arbeidUtlandToFormValues(arbeidssted) : undefined,
    });

    const utilgjengeligePerioder = (alleArbeider?.filter((b) => b.id !== arbeidssted?.id) || []).map((b) => b.periode);

    const handleValidSubmit = (values: ArbeidUtlandFormValues): void => {
        onValidSubmit(formValuesToArbeidUtland(values, sifIntl.locale, arbeidssted?.id));
    };

    const validateLandkode = validateField(ArbeidUtlandFormFields.landkode, getRequiredFieldValidator());

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
                        <CountrySelect
                            name={ArbeidUtlandFormFields.landkode}
                            label={sifIntl.text('@sifSoknadForms.arbeidUtland.form.land.label')}
                            validate={validateLandkode}
                        />
                        <DateRangePicker
                            name="arbeidssted"
                            legend={sifIntl.text('@sifSoknadForms.arbeidUtland.form.tidsperiode.legend')}
                            dropdownCaption={true}
                            validate={validateField('arbeidssted', ({ fromDate, toDate }) => {
                                if (fromDate && toDate && fromDate > toDate) return 'fromDateIsAfterToDate';
                            })}
                            fromInputProps={{
                                name: ArbeidUtlandFormFields.fom,
                                label: sifIntl.text('@sifSoknadForms.arbeidUtland.form.fom.label'),
                                minDate,
                                maxDate,

                                disabledDateRanges: utilgjengeligePerioder,
                                validate: validateField(
                                    ArbeidUtlandFormFields.fom,
                                    getISODateValidator({ required: true, min: minDate, max: maxDate }),
                                    (errorCode) => {
                                        if (errorCode === 'dateIsBeforeMin' && minDate)
                                            return { dato: sifIntl.date(minDate, 'compact') };
                                        if (errorCode === 'dateIsAfterMax' && maxDate)
                                            return { dato: sifIntl.date(maxDate, 'compact') };
                                    },
                                ),
                            }}
                            toInputProps={{
                                name: ArbeidUtlandFormFields.tom,
                                label: sifIntl.text('@sifSoknadForms.arbeidUtland.form.tom.label'),
                                minDate,
                                maxDate,
                                disabledDateRanges: utilgjengeligePerioder,
                                validate: validateField(
                                    ArbeidUtlandFormFields.tom,
                                    getISODateValidator({ required: true, min: minDate, max: maxDate }),
                                    (errorCode) => {
                                        if (errorCode === 'dateIsBeforeMin' && minDate)
                                            return { dato: sifIntl.date(minDate, 'compact') };
                                        if (errorCode === 'dateIsAfterMax' && maxDate)
                                            return { dato: sifIntl.date(maxDate, 'compact') };
                                    },
                                ),
                            }}
                        />

                        <TextField
                            maxLength={20}
                            style={{ maxWidth: '20rem' }}
                            name={ArbeidUtlandFormFields.idnummer}
                            label={sifIntl.text('@sifSoknadForms.arbeidUtland.form.idnummer.label')}
                            validate={validateField(
                                ArbeidUtlandFormFields.idnummer,
                                getStringValidator({ disallowUnicodeCharacters: true }),
                            )}
                        />
                    </FormLayout.Questions>
                </FormLayout.Content>
            </form>
        </FormProvider>
    );
};
