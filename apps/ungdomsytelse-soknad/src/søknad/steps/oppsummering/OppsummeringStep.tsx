import { StepId } from '../../../types/StepId';
import SøknadStep from '../../SøknadStep';

const OppsummeringStep = () => {
    return <SøknadStep stepId={StepId.OPPSUMMERING}>Oppsummering</SøknadStep>;
};

export default OppsummeringStep;
