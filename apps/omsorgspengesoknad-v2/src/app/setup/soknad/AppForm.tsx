import { AppText } from '@app/i18n';
import { LocalAlert } from '@navikt/ds-react';
import { SifForm } from '@sif/rhf';
import { StepFormValues } from '@sif/soknad/types';
import { FormLayout } from '@sif/soknad-ui/components';
import type { ReactNode } from 'react';
import type { SubmitHandler, UseFormReturn } from 'react-hook-form';

import { SøknadStepId } from '../config/SoknadStepId';
import { useSøknadsflyt } from '../context/soknadContext';

interface Props<T extends StepFormValues> {
    stepId: SøknadStepId;
    methods: UseFormReturn<T>;
    onSubmit: SubmitHandler<T>;
    isPending: boolean;
    isFinalSubmit?: boolean;
    submitLabel?: string;
    submitDisabled?: boolean;
    submitError?: boolean;
    children: ReactNode;
}

export function AppForm<T extends StepFormValues>({
    stepId,
    methods,
    onSubmit,
    isPending,
    isFinalSubmit,
    submitDisabled,
    submitLabel,
    submitError,
    children,
}: Readonly<Props<T>>) {
    const søknadsflyt = useSøknadsflyt();

    const canGoPrevious = søknadsflyt.canGoPrevious(stepId);
    const onPrevious = canGoPrevious ? () => søknadsflyt.navigateToPreviousStep(stepId) : undefined;
    const submitIsDisabled = submitDisabled ?? søknadsflyt.checkConsistency(stepId) !== undefined;

    return (
        <SifForm
            methods={methods}
            onSubmit={onSubmit}
            buttons={
                <FormLayout.FormButtons
                    submitPending={isPending}
                    submitDisabled={submitIsDisabled}
                    onPrevious={onPrevious}
                    isFinalSubmit={isFinalSubmit}
                    submitLabel={submitLabel}
                />
            }>
            {children}
            {submitError && (
                <LocalAlert status="error">
                    <LocalAlert.Header>
                        <LocalAlert.Title as="h2">
                            <AppText id="appForm.submitFeil.tittel" />
                        </LocalAlert.Title>
                    </LocalAlert.Header>
                    <LocalAlert.Content>
                        <AppText id="appForm.submitFeil.innhold" />
                    </LocalAlert.Content>
                </LocalAlert>
            )}
        </SifForm>
    );
}
