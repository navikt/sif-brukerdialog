import { Alert, Heading, Link } from '@navikt/ds-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SoknadStepsConfig } from '@navikt/sif-common-soknad-ds';
import { useSøknadsdataStatus } from '../../hooks/useSøknadsdataStatus';
import { StepId } from '../../types/StepId';
import { getSøknadStepRoute } from '../../utils/søknadRoutesUtils';
import { useAppIntl } from '../../i18n';

interface Props {
    stepId: StepId;
    stepConfig: SoknadStepsConfig<StepId>;
}

const InvalidStepSøknadsdataInfo: React.FunctionComponent<Props> = ({ stepId, stepConfig }) => {
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
            <Alert variant="warning">
                <Heading level="2" size="small" spacing={true}>
                    Oops, dette stemmer ikke helt
                </Heading>
                Vennligst gå tilbake til steget &quot;{getStepLink()}&quot;, og bruk knappene nederst i skjemaet for å
                gå videre. Ikke bruk frem og tilbake-funksjonaliteten i nettleseren.
            </Alert>
        );
    }
    return null;
};

export default InvalidStepSøknadsdataInfo;
