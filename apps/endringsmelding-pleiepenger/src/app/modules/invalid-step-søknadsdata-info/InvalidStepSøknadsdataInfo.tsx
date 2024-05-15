import { useSøknadContext, useSøknadsdataStatus } from '@hooks';
import { SoknadStepsConfig } from '@navikt/sif-common-soknad-ds';
import { useAppIntl } from '../../i18n';
import { StepId } from '../../søknad/config/StepId';
import InvalidStepMessage from './InvalidStepMessage';

interface Props {
    stepId: StepId;
    stepConfig: SoknadStepsConfig<StepId>;
}

const InvalidStepSøknadsdataInfo: React.FunctionComponent<Props> = ({ stepId, stepConfig }) => {
    const { text } = useAppIntl();
    const {
        state: { arbeidsgivere },
    } = useSøknadContext();
    const { invalidSteps } = useSøknadsdataStatus(stepId, stepConfig, arbeidsgivere);

    if (invalidSteps.length > 0) {
        const step = invalidSteps[0];
        return (
            <InvalidStepMessage
                stepTitle={text(stepConfig[step].stepTitleIntlKey as any)}
                stepRoute={stepConfig[step].route}
            />
        );
    }
    return null;
};

export default InvalidStepSøknadsdataInfo;
