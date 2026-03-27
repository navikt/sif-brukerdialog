import { BodyLong, Button, HStack, VStack } from '@navikt/ds-react';
import {
    UngdomsytelseOppgavebekreftelse,
    UngdomsytelseOppgaveUttalelseDto,
} from '@navikt/k9-brukerdialog-prosessering-api';
import { getStringValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import { ApiErrorAlert } from '@sif/api';
import { useSendOppgavebekreftelse } from '@sif/api/k9-prosessering';
import { createSifFormComponents, SifForm, useSifValidate, YesOrNo } from '@sif/rhf';
import { useForm } from 'react-hook-form';

import { UngUiText, useUngUiIntl } from '../../../i18n';
import { useOppgavePage } from '../../../pages/hooks/useOppgavePage';
import { UttalelseSvaralternativer } from '../../../types';

export interface UtalelseFormProps {
    spørsmål: string;
    svaralternativer: UttalelseSvaralternativer;
    uttalelseLabel: string;
    uttalelseDescription?: React.ReactNode;
    oppgaveReferanse: string;
    onSuccess: (utalelse: UngdomsytelseOppgaveUttalelseDto) => void;
}

enum FormFields {
    harUttalelse = 'harUttalelse',
    uttalelse = 'uttalelse',
}

type FormValues = Partial<{
    [FormFields.harUttalelse]: YesOrNo;
    [FormFields.uttalelse]: string;
}>;

const { YesOrNoQuestion, Textarea } = createSifFormComponents<FormValues>();

const MAX_LENGTH = 2000;
const MIN_LENGTH = 5;

export const UtalelseForm = ({
    spørsmål,
    uttalelseLabel,
    uttalelseDescription,
    oppgaveReferanse,
    svaralternativer,
    onSuccess,
}: UtalelseFormProps) => {
    const { mutateAsync, error, isPending } = useSendOppgavebekreftelse();
    const { intl, text } = useUngUiIntl();
    const { validateField } = useSifValidate('@ungUi.uttalelseForm');
    const { onCancel } = useOppgavePage();

    const methods = useForm<FormValues>({
        defaultValues: {},
        mode: 'onSubmit',
        reValidateMode: 'onChange',
    });

    const harUttalelseValue = methods.watch(FormFields.harUttalelse);

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
        try {
            await mutateAsync(dto);
            onSuccess(dto.oppgave.uttalelse);
        } catch {
            // error is tracked by mutation hook
        }
    };

    return (
        <SifForm
            methods={methods}
            onSubmit={handleSubmit}
            buttons={
                <HStack gap="space-16">
                    <Button type="submit" loading={isPending}>
                        {text('@ungUi.uttalelseForm.submitButtonLabel')}
                    </Button>
                    {onCancel ? (
                        <Button variant="secondary" type="button" onClick={onCancel}>
                            {text('@ungUi.uttalelseForm.cancelButtonLabel')}
                        </Button>
                    ) : null}
                </HStack>
            }>
            <VStack gap="space-24" marginBlock="space-8 space-0">
                <YesOrNoQuestion
                    reverse={true}
                    name={FormFields.harUttalelse}
                    legend={spørsmål}
                    labels={{
                        no: svaralternativer.harIkkeUttalelseLabel,
                        yes: svaralternativer.harUttalelseLabel,
                    }}
                    validate={validateField(FormFields.harUttalelse, getYesOrNoValidator())}
                />
                {harUttalelseValue === YesOrNo.YES ? (
                    <Textarea
                        name={FormFields.uttalelse}
                        label={uttalelseLabel}
                        description={
                            uttalelseDescription || (
                                <BodyLong>
                                    <UngUiText id="@ungUi.uttalelseForm.defaultDescription" />
                                </BodyLong>
                            )
                        }
                        maxLength={MAX_LENGTH}
                        validate={(value) => {
                            const errorCode = getStringValidator({
                                required: true,
                                minLength: MIN_LENGTH,
                                maxLength: MAX_LENGTH,
                                disallowInvalidBackendCharacters: true,
                            })(value);
                            return errorCode
                                ? intl.formatMessage(
                                      { id: `@ungUi.uttalelseForm.validation.uttalelse.${errorCode}` },
                                      { min: MIN_LENGTH, maks: MAX_LENGTH },
                                  )
                                : undefined;
                        }}
                    />
                ) : null}
                {error ? <ApiErrorAlert error={error} /> : null}
            </VStack>
        </SifForm>
    );
};
