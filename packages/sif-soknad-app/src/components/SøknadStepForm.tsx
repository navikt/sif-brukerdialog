import { SifForm } from '@sif/rhf';
import { FormLayout } from '@sif/soknad-ui/components';
import type { ReactNode } from 'react';
import type { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';

import { useStepNavigation } from '../hooks/useStepNavigation';
import { useSøknadStepContext } from './SøknadStepContext';

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
 *
 * Må brukes innenfor en <SøknadStep> — konsistensresultatet hentes fra
 * SøknadStepContext som SøknadStep setter opp. App-utvikler trenger ikke
 * tenke på dette.
 *
 * Layout-ansvar ligger hos appen — wrap children med ønsket FormLayout
 * (typisk FormLayout.Content > FormLayout.Questions, eller FormLayout.Summary
 * for oppsummeringssteg).
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
    // Henter konsistensresultat beregnet av SøknadStep — ikke en ny sjekk.
    const { inconsistentStepId } = useSøknadStepContext();

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
            {children}
        </SifForm>
    );
}
