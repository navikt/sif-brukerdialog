import { FormLayout } from '@sif/soknad-ui';

import { SøknadStepId } from '../config/søknadStepConfig';
import { useSøknadFlow } from '../context/søknadContext';

interface Props {
    stepId: SøknadStepId;
    isPending: boolean;
    isFinalSubmit?: boolean;
    submitLabel?: string;
}

export const SøknadFormButtons = ({ stepId, isPending, isFinalSubmit, submitLabel }: Props) => {
    const ctx = useSøknadFlow();

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
