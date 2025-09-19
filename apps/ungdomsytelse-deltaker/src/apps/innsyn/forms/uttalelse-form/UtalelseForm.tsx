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
    tilbakemeldingLabel: string;
    tilbakemeldingDescription?: React.ReactNode;
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
                                        name={FormFields.begrunnelse}
                                        label={tilbakemeldingLabel}
                                        description={
                                            tilbakemeldingDescription || (
                                                <BodyLong>
                                                    Du må ikke oppgi sensitive informasjon (særlige kategorier av
                                                    personopplysninger) om deg selv eller andre, for eksempel
                                                    helseopplysninger.
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
