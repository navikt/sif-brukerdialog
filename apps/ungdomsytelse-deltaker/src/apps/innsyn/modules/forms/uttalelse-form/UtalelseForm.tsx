import { useSendOppgavebekreftelse } from '@innsyn/hooks/api/useSendOppgavebekreftelse';
import { BodyLong, VStack } from '@navikt/ds-react';
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
import ApiErrorAlert from '@navikt/ung-common/src/components/api-error-alert/ApiErrorAlert';
import { AppText, useAppIntl } from '@shared/i18n';

interface Props {
    harTilbakemeldingSpørsmål: string;
    tilbakemeldingLabel: string;
    tilbakemeldingDescription?: React.ReactNode;
    oppgaveReferanse: string;
    onSuccess: (utalelse: UngdomsytelseOppgaveUttalelseDto) => void;
    onCancel?: () => void;
}

enum FormFields {
    harTilbakemelding = 'harTilbakemelding',
    tilbakemelding = 'tilbakemelding',
}

type FormValues = Partial<{
    [FormFields.tilbakemelding]: string;
    [FormFields.harTilbakemelding]: YesOrNo;
}>;

const { FormikWrapper, Form, YesOrNoQuestion, Textarea } = getTypedFormComponents<
    FormFields,
    FormValues,
    ValidationError
>();

const TILBAKEMELDING_MAX_LENGTH = 2000;
const TILBAKEMELDING_MIN_LENGTH = 5;

const UtalelseForm = ({
    harTilbakemeldingSpørsmål,
    tilbakemeldingLabel,
    tilbakemeldingDescription,
    oppgaveReferanse,
    onSuccess,
    onCancel,
}: Props) => {
    const { mutateAsync, error, isPending } = useSendOppgavebekreftelse();

    const { intl, text } = useAppIntl();

    const handleSubmit = async (values: FormValues) => {
        const harUttalelse = values[FormFields.harTilbakemelding] === YesOrNo.YES;

        const dto: UngdomsytelseOppgavebekreftelse = {
            oppgave: {
                oppgaveReferanse: oppgaveReferanse,
                uttalelse: {
                    harUttalelse,
                    uttalelseFraDeltaker: harUttalelse ? values[FormFields.tilbakemelding] : undefined,
                },
            },
        };
        await mutateAsync(dto);
        onSuccess(dto.oppgave.uttalelse);
    };

    return (
        <section aria-label={text('uttalelseForm.ariaLabel')}>
            <FormikWrapper
                initialValues={{}}
                onSubmit={handleSubmit}
                renderForm={({ values }) => {
                    return (
                        <Form
                            submitButtonLabel={text('uttalelseForm.submitButtonLabel')}
                            cancelButtonLabel={text('uttalelseForm.cancelButtonLabel')}
                            onCancel={onCancel}
                            isFinalSubmit={true}
                            submitPending={isPending}
                            includeValidationSummary={true}
                            formErrorHandler={getIntlFormErrorHandler(intl, 'uttalelseForm.validation')}>
                            <VStack gap="6" marginBlock="2 0">
                                <YesOrNoQuestion
                                    reverse={true}
                                    name={FormFields.harTilbakemelding}
                                    legend={harTilbakemeldingSpørsmål}
                                    validate={getYesOrNoValidator()}
                                />
                                {values[FormFields.harTilbakemelding] === YesOrNo.YES ? (
                                    <Textarea
                                        name={FormFields.tilbakemelding}
                                        label={tilbakemeldingLabel}
                                        description={
                                            tilbakemeldingDescription || (
                                                <BodyLong>
                                                    <AppText id="uttalelseForm.defaultDescription" />
                                                </BodyLong>
                                            )
                                        }
                                        maxLength={TILBAKEMELDING_MAX_LENGTH}
                                        validate={(value) => {
                                            const errorKey = getStringValidator({
                                                required: true,
                                                minLength: TILBAKEMELDING_MIN_LENGTH,
                                                maxLength: TILBAKEMELDING_MAX_LENGTH,
                                            })(value);
                                            return errorKey
                                                ? {
                                                      key: errorKey,
                                                      values: {
                                                          min: TILBAKEMELDING_MIN_LENGTH,
                                                          maks: TILBAKEMELDING_MAX_LENGTH,
                                                      },
                                                  }
                                                : undefined;
                                        }}
                                    />
                                ) : null}
                                {error ? <ApiErrorAlert error={error} /> : null}
                            </VStack>
                        </Form>
                    );
                }}
            />
        </section>
    );
};

export default UtalelseForm;
