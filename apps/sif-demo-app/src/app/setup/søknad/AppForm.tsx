import { FormLayout } from '@navikt/sif-common-ui';
import { SifForm } from '@sif/rhf';
import { StepFormValues } from '@sif/soknad/types';
import type { ReactNode } from 'react';
import type { SubmitHandler, UseFormReturn } from 'react-hook-form';

import { SøknadStepId } from '../config/søknadStepConfig';
import { useSøknadsflyt } from '../context/søknadContext';

interface Props<T extends StepFormValues> {
    stepId: SøknadStepId;
    methods: UseFormReturn<T>;
    onSubmit: SubmitHandler<T>;
    isPending: boolean;
    isFinalSubmit?: boolean;
    submitLabel?: string;
    children: ReactNode;
}

export function AppForm<T extends StepFormValues>({
    stepId,
    methods,
    onSubmit,
    isPending,
    isFinalSubmit,
    submitLabel,
    children,
}: Props<T>) {
    const ctx = useSøknadsflyt();

    const canGoPrevious = ctx.canGoPrevious(stepId);
    const onPrevious = canGoPrevious ? () => ctx.navigateToPreviousStep(stepId) : undefined;
    const submitDisabled = ctx.checkConsistency(stepId) !== undefined;

    return (
        <SifForm
            methods={methods}
            onSubmit={onSubmit}
            buttons={
                <FormLayout.FormButtons
                    submitPending={isPending}
                    submitDisabled={submitDisabled}
                    onPrevious={onPrevious}
                    isFinalSubmit={isFinalSubmit}
                    submitLabel={submitLabel}
                />
            }>
            <FormLayout.Content>
                <FormLayout.Questions>{children}</FormLayout.Questions>
            </FormLayout.Content>
        </SifForm>
    );
}
