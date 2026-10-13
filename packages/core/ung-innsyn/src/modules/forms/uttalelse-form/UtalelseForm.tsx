import { BodyLong, Button, HStack, VStack } from '@navikt/ds-react';
import { getStringValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import { OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import { ApiErrorAlert } from '@sif/api';
import { useSendOppgavebekreftelse, YtelseOppgavebekreftelse } from '@sif/api/k9-prosessering';
import { createSifFormComponents, SifForm, useSifValidate, YesOrNo } from '@sif/rhf';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import { UngInnsynText, useUngInnsynIntl } from '../../../i18n';
import { useOppgavePage } from '../../../pages/hooks/useOppgavePage';
import { Uttalelse, UttalelseSvaralternativer } from '../../../types';

export interface UtalelseFormProps {
    oppgaveYtelsetype: OppgaveYtelsetype;
    spørsmål: string;
    svaralternativer: UttalelseSvaralternativer;
    uttalelseLabel: string;
    uttalelseDescription?: ReactNode;
    oppgaveReferanse: string;
    onSuccess: (uttalelse: Uttalelse) => void;
}

const getOppgavebekreftelse = (
    ytelse: OppgaveYtelsetype,
    oppgaveReferanse: string,
    uttalelse: Uttalelse,
): YtelseOppgavebekreftelse => {
    switch (ytelse) {
        case OppgaveYtelsetype.AKTIVITETSPENGER:
            return { ytelse, data: { oppgave: { oppgaveReferanse, uttalelse } } };
        case OppgaveYtelsetype.UNGDOMSYTELSE:
            return { ytelse, data: { oppgave: { oppgaveReferanse, uttalelse } } };
    }
};

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
    oppgaveYtelsetype,
    onSuccess,
}: UtalelseFormProps) => {
    const { mutateAsync, error, isPending } = useSendOppgavebekreftelse();
    const { intl, text } = useUngInnsynIntl();
    const { validateField } = useSifValidate('@ungInnsyn.uttalelseForm');
    const { onCancel } = useOppgavePage();

    const methods = useForm<FormValues>({
        defaultValues: {},
        mode: 'onSubmit',
        reValidateMode: 'onChange',
    });

    const harUttalelseValue = methods.watch(FormFields.harUttalelse);

    const handleSubmit = async (values: FormValues) => {
        const harUttalelse = values[FormFields.harUttalelse] === YesOrNo.YES;
        const uttalelse: Uttalelse = {
            harUttalelse,
            uttalelseFraDeltaker: harUttalelse ? values[FormFields.uttalelse] : undefined,
        };
        try {
            await mutateAsync(getOppgavebekreftelse(oppgaveYtelsetype, oppgaveReferanse, uttalelse));
            onSuccess(uttalelse);
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
                        {text('@ungInnsyn.uttalelseForm.submitButtonLabel')}
                    </Button>
                    {onCancel ? (
                        <Button variant="secondary" type="button" onClick={onCancel}>
                            {text('@ungInnsyn.uttalelseForm.cancelButtonLabel')}
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
                                    <UngInnsynText id="@ungInnsyn.uttalelseForm.defaultDescription" />
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
                                      { id: `@ungInnsyn.uttalelseForm.validation.uttalelse.${errorCode}` },
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
