import { SoknadStepsConfig } from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepTypes';
import React from 'react';
import { StepId } from '../../søknad/config/StepId';
import { Alert, Heading, Link } from '@navikt/ds-react';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { useSøknadsdataStatus } from '../../hooks/useSøknadsdataStatus';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { useNavigate } from 'react-router-dom';

interface Props {
    stepId: StepId;
    stepConfig: SoknadStepsConfig<StepId>;
}

const InvalidStepSøknadsdataInfo: React.FunctionComponent<Props> = ({ stepId, stepConfig }) => {
    const intl = useIntl();
    const navigate = useNavigate();
    const { invalidSteps } = useSøknadsdataStatus(stepId, stepConfig);

    if (invalidSteps.length > 0) {
        const step = invalidSteps[0];
        const stepTitle = intlHelper(intl, stepConfig[step].stepTitleIntlKey);
        const stepRoute = intlHelper(intl, stepConfig[step].route);
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
            <FormBlock paddingBottom="xl">
                <Alert variant="warning">
                    <p style={{ marginTop: 0 }}>
                        <Heading level="2" size="small" spacing={true}>
                            Oops, dette stemmer ikke helt
                        </Heading>
                        Vennligst gå tilbake til steget &quot;{getStepLink()}&quot;, og bruk knappene nederst i skjemaet
                        for å gå videre. Ikke bruk frem og tilbake-funksjonaliteten i nettleseren.
                    </p>
                </Alert>
            </FormBlock>
        );
    }
    return null;
};

export default InvalidStepSøknadsdataInfo;
