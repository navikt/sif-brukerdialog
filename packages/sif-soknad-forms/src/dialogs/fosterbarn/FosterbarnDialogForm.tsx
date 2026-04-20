import { FormLayout } from '@navikt/sif-common-ui';
import { getFødselsnummerValidator, getStringValidator } from '@navikt/sif-validation';
import { createSifFormComponents } from '@sif/rhf';
import { FormProvider, useForm } from 'react-hook-form';

import { useSifSoknadFormsIntl } from '../../i18n';
import { Fosterbarn } from './types';

interface Props {
    formId: string;
    fosterbarn?: Fosterbarn;
    disallowedFødselsnumre?: string[];
    onValidSubmit: (fosterbarn: Fosterbarn) => void;
}

enum FosterbarnFormFields {
    navn = 'navn',
    fødselsnummer = 'fødselsnummer',
}

type FosterbarnFormValues = {
    [FosterbarnFormFields.navn]: string;
    [FosterbarnFormFields.fødselsnummer]: string;
};

const { TextField } = createSifFormComponents<FosterbarnFormValues>();

const fosterbarnToFormValues = (fosterbarn: Fosterbarn): FosterbarnFormValues => ({
    navn: fosterbarn.navn,
    fødselsnummer: fosterbarn.fødselsnummer,
});

const formValuesToFosterbarn = (values: FosterbarnFormValues, id?: string): Fosterbarn => ({
    id: id || crypto.randomUUID(),
    navn: values.navn,
    fødselsnummer: values.fødselsnummer,
});

export const FosterbarnDialogForm = ({ formId, fosterbarn, disallowedFødselsnumre = [], onValidSubmit }: Props) => {
    const intl = useSifSoknadFormsIntl();
    const methods = useForm<FosterbarnFormValues>({
        defaultValues: fosterbarn ? fosterbarnToFormValues(fosterbarn) : undefined,
    });

    const handleValidSubmit = (values: FosterbarnFormValues): void => {
        onValidSubmit(formValuesToFosterbarn(values, fosterbarn?.id));
    };

    const disallowedValues = disallowedFødselsnumre.filter((f) => f !== fosterbarn?.fødselsnummer);

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
                            name={FosterbarnFormFields.navn}
                            label={intl.text('@sifSoknadForms.fosterbarn.form.navn.label')}
                            validate={(value) => getStringValidator({ required: true })(value)}
                        />
                        <TextField
                            name={FosterbarnFormFields.fødselsnummer}
                            label={intl.text('@sifSoknadForms.fosterbarn.form.fødselsnummer.label')}
                            inputMode="numeric"
                            maxLength={11}
                            validate={(value) =>
                                getFødselsnummerValidator({
                                    required: true,
                                    disallowedValues,
                                })(value)
                            }
                        />
                    </FormLayout.Questions>
                </FormLayout.Content>
            </form>
        </FormProvider>
    );
};
