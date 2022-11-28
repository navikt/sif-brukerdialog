import { SoknadStepsConfig } from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepTypes';
import React from 'react';
import { StepId } from '../../types/StepId';
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

const StepSøknadsdataInfo: React.FunctionComponent<Props> = ({ stepId, stepConfig }) => {
    const intl = useIntl();
    const navigate = useNavigate();
    const { invalidSteps } = useSøknadsdataStatus(stepId, stepConfig);

    if (invalidSteps.length > 0) {
        const step = invalidSteps[0];
        const stepTitle = intlHelper(intl, stepConfig[step].stepTitleIntlKey);
        const stepRoute = intlHelper(intl, stepConfig[step].route);
        return (
            <FormBlock paddingBottom="xl">
                <Alert variant="warning">
                    <p style={{ marginTop: 0 }}>
                        <Heading level="2" size="small">
                            Oops, dette stemmer ikke helt
                        </Heading>
                        Vennligst gå tilbake og se over steget &quot;{stepTitle}&quot;, og bruk knappene nederst i
                        skjemaet for å gå videre. Ikke bruk frem og tilbake-funksjonaliteten i nettleseren.
                    </p>
                    <p>
                        <Link
                            href="#"
                            onClick={(evt) => {
                                evt.stopPropagation();
                                evt.preventDefault();
                                navigate(stepRoute);
                            }}>
                            Gå til {stepTitle}
                        </Link>
                    </p>
                </Alert>
            </FormBlock>
        );
    }
    return null;
};

export default StepSøknadsdataInfo;
