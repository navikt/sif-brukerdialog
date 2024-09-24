import { soknadStepUtils, Step } from '@navikt/sif-common-soknad-ds';
import { useAppIntl } from '../i18n';
import { StepId } from '../types/StepId';
import { getSøknadStepConfig } from './søknadStepConfig';

interface Props {
    stepId: StepId;
    children: React.ReactNode;
}

const SøknadStep: React.FunctionComponent<Props> = ({ stepId, children }) => {
    const { intl, text } = useAppIntl();

    const stepConfig = getSøknadStepConfig();

    const { index } = stepConfig[stepId];

    const steps = soknadStepUtils.getProgressStepsFromConfig(stepConfig, index, intl);

    return (
        <Step activeStepId={stepId} applicationTitle={text('application.title')} steps={steps}>
            {children}
        </Step>
    );
};

export default SøknadStep;
