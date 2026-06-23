import { SifForm } from '@sif/rhf';
import { FormLayout } from '@sif/soknad-ui/components';
import type { ReactNode } from 'react';
import type { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';

import { useCheckConsistency } from '../hooks/useCheckConsistency';
import { useStepNavigation } from '../hooks/useStepNavigation';

interface Props<T extends FieldValues> {
    stepId: string;
    methods: UseFormReturn<T>;
    onSubmit: SubmitHandler<T>;
    isPending: boolean;
    isFinalSubmit?: boolean;
    submitLabel?: string;
    submitDisabled?: boolean;
    children: ReactNode;
}

/**
 * Standard RHF-basert steg-skjema for søknadsapper.
 *
 * Håndterer forrige/neste-navigasjon og deaktiverer submit automatisk
 * når konsistenssjekken slår ut (ulagrede endringer i tidligere steg).
 */
export function SøknadStepForm<T extends FieldValues>({
    stepId,
    methods,
    onSubmit,
    isPending,
    isFinalSubmit,
    submitDisabled,
    submitLabel,
    children,
}: Readonly<Props<T>>) {
    const { canGoPrevious, navigateToPreviousStep } = useStepNavigation();
    const onPrevious = canGoPrevious(stepId) ? () => navigateToPreviousStep(stepId) : undefined;
    const inconsistentStepId = useCheckConsistency(stepId);

    return (
        <SifForm
            methods={methods}
            onSubmit={onSubmit}
            buttons={
                <FormLayout.FormButtons
                    submitPending={isPending}
                    submitDisabled={submitDisabled || !!inconsistentStepId}
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
