import { StepId } from '../../../types/StepId';
import SøknadStep from '../../SøknadStep';

const InfoStep = () => {
    return <SøknadStep stepId={StepId.INFO}>Info</SøknadStep>;
};

export default InfoStep;
