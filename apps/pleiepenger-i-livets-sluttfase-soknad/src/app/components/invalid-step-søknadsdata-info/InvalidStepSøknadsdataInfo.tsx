import { Alert, Box, Heading, Link } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';
import { SoknadStepsConfig } from '@navikt/sif-common-soknad-ds';
import { useSøknadsdataStatus } from '../../hooks/useSøknadsdataStatus';
import { useAppIntl } from '../../i18n';
import { StepId } from '../../types/StepId';
import { getSøknadStepRoute } from '../../utils/søknadRoutesUtils';

interface Props {
    stepId: StepId;
    stepConfig: SoknadStepsConfig<StepId>;
}

const InvalidStepSøknadsdataInfo = ({ stepId, stepConfig }: Props) => {
    const { text } = useAppIntl();
    const navigate = useNavigate();
    const { invalidSteps } = useSøknadsdataStatus(stepId, stepConfig);

    if (invalidSteps.length > 0) {
        const step = invalidSteps[0];
        const stepTitle = text(stepConfig[step].stepTitleIntlKey as any);
        const stepRoute = getSøknadStepRoute(step);
        const getStepLink = () => (
            <Link
                href="#"
                onClick={(evt) => {
                    evt.stopPropagation();
                    evt.preventDefault();
                    navigate(stepRoute);
                }}>
                {stepTitle}
            </Link>
        );
        return (
            <Box marginBlock="8">
                <Alert variant="warning">
                    <Heading level="2" size="small" spacing={true}>
                        Oops, dette stemmer ikke helt
                    </Heading>
                    Vennligst gå tilbake til steget &quot;{getStepLink()}&quot;, og bruk knappene nederst i skjemaet for
                    å gå videre. Ikke bruk frem og tilbake-funksjonaliteten i nettleseren.
                </Alert>
            </Box>
        );
    }
    return null;
};

export default InvalidStepSøknadsdataInfo;
