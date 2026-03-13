import { SøknadStepId, useSøknadContext } from '@app/setup';
import { FormLayout } from '@navikt/sif-common-ui';

interface Props {
    stepId: SøknadStepId;
    isPending: boolean;
    isFinalSubmit?: boolean;
    submitLabel?: string;
}

/**
 * Skjemaknapper som automatisk kobles til søknadsprosessen.
 * Henter navigasjon og consistency-sjekk fra context.
 */
export const SøknadFormButtons = ({ stepId, isPending, isFinalSubmit, submitLabel }: Props) => {
    const ctx = useSøknadContext();

    const canGoPrevious = ctx.canGoPrevious(stepId);
    const onPrevious = canGoPrevious ? () => ctx.navigateToPreviousStep(stepId) : undefined;
    const submitDisabled = ctx.checkConsistency(stepId) !== undefined;

    return (
        <FormLayout.FormButtons
            submitPending={isPending}
            submitDisabled={submitDisabled}
            onPrevious={onPrevious}
            isFinalSubmit={isFinalSubmit}
            submitLabel={submitLabel}
        />
    );
};
