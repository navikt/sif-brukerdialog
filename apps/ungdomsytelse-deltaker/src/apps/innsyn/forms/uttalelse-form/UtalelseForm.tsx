import { Alert, BodyLong, VStack } from '@navikt/ds-react';
import {
    UngdomsytelseOppgavebekreftelse,
    UngdomsytelseOppgaveUttalelseDto,
} from '@navikt/k9-brukerdialog-prosessering-api';
import {
    getIntlFormErrorHandler,
    getTypedFormComponents,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import { getStringValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import { useAppIntl } from '../../../../i18n';
import { useSendOppgavebekreftelse } from '../../hooks/api/useSendOppgavebekreftelse';

interface Props {
    harTilbakemeldingSpørsmål: string;
    oppgaveReferanse: string;
    onSuccess: (utalelse: UngdomsytelseOppgaveUttalelseDto) => void;
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
        const harUttalelse = values[FormFields.harTilbakemelding] === YesOrNo.YES;

        const dto: UngdomsytelseOppgavebekreftelse = {
            oppgave: {
                oppgaveReferanse: oppgaveReferanse,
                uttalelse: {
                    harUttalelse,
                    uttalelseFraDeltaker: harUttalelse ? values[FormFields.begrunnelse] : undefined,
                },
            },
        };
        await mutateAsync(dto);
        onSuccess(dto.oppgave.uttalelse);
    };

    return (
        <section aria-label="Skjema for tilbakemelding">
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
                                        label="Tilbakemelding på startdato"
                                        description={
                                            <BodyLong>
                                                Du må ikke oppgi sensitive informasjon (særlige kategorier av
                                                personopplysninger) om deg selv eller andre, for eksempel
                                                helseopplysninger.
                                            </BodyLong>
                                        }
                                        maxLength={500}
                                        validate={getStringValidator({ required: true, maxLength: 500 })}
                                    />
                                ) : null}
                                {error ? <Alert variant="error">{JSON.stringify(error)}</Alert> : null}
                            </VStack>
                        </Form>
                    );
                }}
            />
        </section>
    );
};

export default UtalelseForm;
