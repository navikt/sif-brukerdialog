import { FormLayout } from '@navikt/sif-common-ui';
import {
    getDateValidator,
    getFødselsnummerValidator,
    getRequiredFieldValidator,
    getStringValidator,
} from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { FormProvider, useForm } from 'react-hook-form';

import { useSifSoknadFormsIntl } from '../../i18n';
import { annetBarnToFormValues, formValuesToAnnetBarn } from './annetBarnUtils';
import { AnnetBarn, AnnetBarnFormValues, BarnType } from './index';

export interface AnnetBarnDialogFormConfig {
    disallowedFødselsnumre?: string[];
    aldersgrenseText?: string;
    fnrPlaceholder?: string;
    navnPlaceholder?: string;
    showBarnTypeOptions?: boolean;
}

interface AnnetBarnDialogFormProps extends AnnetBarnDialogFormConfig {
    formId: string;
    annetBarn?: Partial<AnnetBarn>;
    minDate: Date;
    maxDate: Date;
    onValidSubmit: (values: AnnetBarn) => void;
}

enum AnnetBarnFormFields {
    fnr = 'fnr',
    fødselsdato = 'fødselsdato',
    navn = 'navn',
    type = 'type',
}

const { Datepicker, RadioGroup, TextField } = createSifFormComponents<AnnetBarnFormValues>();

const allowHnrInCurrentEnvironment = () => {
    if (typeof window === 'undefined') {
        return false;
    }

    const appSettings = (window as { appSettings?: Record<string, string | undefined> }).appSettings;
    const appVersion = appSettings?.APP_VERSION ?? appSettings?.SIF_PUBLIC_APP_VERSION;

    return appVersion === 'dev';
};

export const AnnetBarnDialogForm = ({
    formId,
    annetBarn,
    minDate,
    maxDate,
    disallowedFødselsnumre,
    aldersgrenseText: ageLimitText,
    fnrPlaceholder,
    navnPlaceholder,
    showBarnTypeOptions,
    onValidSubmit,
}: AnnetBarnDialogFormProps) => {
    const sifIntl = useSifSoknadFormsIntl();
    const { validateField } = useSifValidate('@sifSoknadForms.annetBarnForm');
    const methods = useForm<AnnetBarnFormValues>({
        defaultValues: annetBarn ? annetBarnToFormValues(annetBarn) : undefined,
    });

    const handleValidSubmit = (values: AnnetBarnFormValues): void => {
        onValidSubmit(formValuesToAnnetBarn(values, annetBarn?.id));
    };

    const tilgjengeligeFødselsnumre =
        annetBarn?.fnr && disallowedFødselsnumre
            ? disallowedFødselsnumre.filter((fnr) => fnr !== annetBarn.fnr)
            : disallowedFødselsnumre;

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
                        <TextField
                            name={AnnetBarnFormFields.navn}
                            label={sifIntl.text('@sifSoknadForms.annetBarn.form.navn')}
                            placeholder={navnPlaceholder}
                            validate={validateField(AnnetBarnFormFields.navn, getStringValidator({ required: true }))}
                        />

                        <Datepicker
                            name={AnnetBarnFormFields.fødselsdato}
                            label={
                                ageLimitText
                                    ? `${sifIntl.text('@sifSoknadForms.annetBarn.form.fødselsdato')} ${ageLimitText}`
                                    : sifIntl.text('@sifSoknadForms.annetBarn.form.fødselsdato')
                            }
                            minDate={minDate}
                            maxDate={maxDate}
                            dropdownCaption
                            validate={validateField(
                                AnnetBarnFormFields.fødselsdato,
                                getDateValidator({ required: true, min: minDate, max: maxDate }),
                                (errorCode) => {
                                    if (errorCode === 'dateIsBeforeMin') {
                                        return { dato: sifIntl.date(minDate, 'compact') };
                                    }
                                    if (errorCode === 'dateIsAfterMax') {
                                        return { dato: sifIntl.date(maxDate, 'compact') };
                                    }
                                },
                            )}
                        />

                        <TextField
                            name={AnnetBarnFormFields.fnr}
                            label={sifIntl.text('@sifSoknadForms.annetBarn.form.fnr')}
                            placeholder={fnrPlaceholder}
                            inputMode="numeric"
                            maxLength={11}
                            validate={validateField(
                                AnnetBarnFormFields.fnr,
                                getFødselsnummerValidator({
                                    required: true,
                                    allowHnr: allowHnrInCurrentEnvironment(),
                                    disallowedValues: tilgjengeligeFødselsnumre,
                                }),
                            )}
                        />

                        {showBarnTypeOptions && (
                            <RadioGroup
                                name={AnnetBarnFormFields.type}
                                legend={sifIntl.text('@sifSoknadForms.annetBarn.form.årsak.spm')}
                                radios={[
                                    {
                                        label: sifIntl.text('@sifSoknadForms.annetBarn.form.årsak.FOSTERBARN'),
                                        value: BarnType.fosterbarn,
                                    },
                                    {
                                        label: sifIntl.text('@sifSoknadForms.annetBarn.form.årsak.ANNET'),
                                        value: BarnType.annet,
                                    },
                                ]}
                                validate={validateField(AnnetBarnFormFields.type, getRequiredFieldValidator())}
                            />
                        )}
                    </FormLayout.Questions>
                </FormLayout.Content>
            </form>
        </FormProvider>
    );
};
