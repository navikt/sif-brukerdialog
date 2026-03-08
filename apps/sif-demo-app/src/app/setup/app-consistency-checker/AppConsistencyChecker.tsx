import { SøknadStepId } from '../../config/søknadStepConfig';
import { InconsistentStepAlert } from './InconsistentStepAlert';
import { useAppConsistencyChecker } from './useAppConsistencyChecker';

interface Props {
    stepId: SøknadStepId;
}

export const AppConsistencyChecker = ({ stepId }: Props) => {
    const { inconsistentStepId } = useAppConsistencyChecker(stepId);

    if (!inconsistentStepId) return null;

    return <InconsistentStepAlert stepId={inconsistentStepId} />;
};
