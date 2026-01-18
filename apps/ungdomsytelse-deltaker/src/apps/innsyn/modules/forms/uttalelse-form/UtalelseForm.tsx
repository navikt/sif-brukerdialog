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

export type UttalelseSvaralternativer = {
    harUttalelseLabel: string;
    harIkkeUttalelseLabel: string;
};
interface Props {
    spørsmål: string;
    svaralternativer: UttalelseSvaralternativer;
    uttalelseLabel: string;
    uttalelseDescription?: React.ReactNode;
    oppgaveReferanse: string;
    onSuccess: (utalelse: UngdomsytelseOppgaveUttalelseDto) => void;
    onCancel?: () => void;
}

enum FormFields {
    harUttalelse = 'harUttalelse',
    uttalelse = 'uttalelse',
}

type FormValues = Partial<{
    [FormFields.harUttalelse]: YesOrNo;
    [FormFields.uttalelse]: string;
}>;

const { FormikWrapper, Form, YesOrNoQuestion, Textarea } = getTypedFormComponents<
    FormFields,
    FormValues,
    ValidationError
>();

const MAX_LENGTH = 2000;
const MIN_LENGTH = 5;

const UtalelseForm = ({
    spørsmål,
    uttalelseLabel,
    uttalelseDescription,
    oppgaveReferanse,
    svaralternativer,
    onSuccess,
    onCancel,
}: Props) => {
    const { mutateAsync, error, isPending } = useSendOppgavebekreftelse();

    const { intl, text } = useAppIntl();

    const handleSubmit = async (values: FormValues) => {
        const harUttalelse = values[FormFields.harUttalelse] === YesOrNo.YES;

        const dto: UngdomsytelseOppgavebekreftelse = {
            oppgave: {
                oppgaveReferanse: oppgaveReferanse,
                uttalelse: {
                    harUttalelse,
                    uttalelseFraDeltaker: harUttalelse ? values[FormFields.uttalelse] : undefined,
                },
            },
        };
        await mutateAsync(dto);
        onSuccess(dto.oppgave.uttalelse);
    };

    return (
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
                                name={FormFields.harUttalelse}
                                legend={spørsmål}
                                labels={{
                                    no: svaralternativer.harIkkeUttalelseLabel,
                                    yes: svaralternativer.harUttalelseLabel,
                                }}
                                validate={getYesOrNoValidator()}
                            />
                            {values[FormFields.harUttalelse] === YesOrNo.YES ? (
                                <Textarea
                                    name={FormFields.uttalelse}
                                    label={uttalelseLabel}
                                    description={
                                        uttalelseDescription || (
                                            <BodyLong>
                                                <AppText id="uttalelseForm.defaultDescription" />
                                            </BodyLong>
                                        )
                                    }
                                    maxLength={MAX_LENGTH}
                                    validate={(value) => {
                                        const errorKey = getStringValidator({
                                            required: true,
                                            minLength: MIN_LENGTH,
                                            maxLength: MAX_LENGTH,
                                            disallowInvalidBackendCharacters: true,
                                        })(value);
                                        return errorKey
                                            ? {
                                                  key: errorKey,
                                                  values: {
                                                      min: MIN_LENGTH,
                                                      maks: MAX_LENGTH,
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
    );
};

export default UtalelseForm;
