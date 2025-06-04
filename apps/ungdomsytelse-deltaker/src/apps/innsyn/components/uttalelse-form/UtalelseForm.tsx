import { Alert, VStack } from '@navikt/ds-react';
import { UngdomsytelseOppgavebekreftelse } from '@navikt/k9-brukerdialog-prosessering-api';
import {
    getIntlFormErrorHandler,
    getTypedFormComponents,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import { getStringValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import { useSendOppgavebekreftelse } from '../../hooks/api/useSendOppgavebekreftelse';
import { useAppIntl } from '../../../../i18n';

interface Props {
    harTilbakemeldingSpørsmål: string;
    oppgaveReferanse: string;
    onSuccess: () => void;
    onCancel?: () => void;
}

enum FormFields {
    harTilbakemelding = 'harTilbakemelding',
    begrunnelse = 'begrunnelse',
}

type FormValues = Partial<{
    [FormFields.begrunnelse]: string;
    [FormFields.harTilbakemelding]: YesOrNo;
}>;

const { FormikWrapper, Form, YesOrNoQuestion, Textarea } = getTypedFormComponents<
    FormFields,
    FormValues,
    ValidationError
>();

const UtalelseForm = ({ harTilbakemeldingSpørsmål, oppgaveReferanse, onSuccess, onCancel }: Props) => {
    const { mutateAsync, error, isPending } = useSendOppgavebekreftelse();

    const { intl } = useAppIntl();

    const handleSubmit = async (values: FormValues) => {
        const harTilbakemelding = values[FormFields.harTilbakemelding] === YesOrNo.YES;

        const dto: UngdomsytelseOppgavebekreftelse = {
            oppgave: {
                oppgaveReferanse: oppgaveReferanse,
                uttalelse: {
                    bekreftelseSvar: harTilbakemelding ? 'AVSLÅR' : 'GODTAR',
                    meldingFraDeltaker: values[FormFields.begrunnelse]!,
                },
            },
        };
        await mutateAsync(dto);
        onSuccess();
    };

    return (
        <FormikWrapper
            initialValues={{}}
            onSubmit={handleSubmit}
            renderForm={({ values }) => {
                return (
                    <Form
                        submitButtonLabel="Send inn svaret ditt"
                        cancelButtonLabel="Avbryt"
                        onCancel={onCancel}
                        isFinalSubmit={true}
                        submitPending={isPending}
                        includeValidationSummary={true}
                        formErrorHandler={getIntlFormErrorHandler(intl, 'inntektForm.validation')}>
                        <VStack gap="6" marginBlock="2 0">
                            <YesOrNoQuestion
                                reverse={true}
                                name={FormFields.harTilbakemelding}
                                legend={harTilbakemeldingSpørsmål}
                                validate={getYesOrNoValidator()}
                            />
                            {values[FormFields.harTilbakemelding] === YesOrNo.YES ? (
                                <Textarea
                                    name={FormFields.begrunnelse}
                                    label="Kommentar"
                                    maxLength={100}
                                    validate={getStringValidator({ required: true, maxLength: 250 })}
                                />
                            ) : null}
                            {error ? <Alert variant="error">{JSON.stringify(error)}</Alert> : null}
                        </VStack>
                    </Form>
                );
            }}
        />
    );
};

export default UtalelseForm;
