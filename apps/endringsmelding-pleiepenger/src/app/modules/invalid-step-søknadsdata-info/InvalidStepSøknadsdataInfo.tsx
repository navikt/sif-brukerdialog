import { Alert, Heading, Link } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useSøknadContext, useSøknadsdataStatus } from '@hooks';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { SoknadStepsConfig } from '@navikt/sif-common-soknad-ds';
import { StepId } from '../../søknad/config/StepId';

interface Props {
    stepId: StepId;
    stepConfig: SoknadStepsConfig<StepId>;
}

const InvalidStepSøknadsdataInfo: React.FunctionComponent<Props> = ({ stepId, stepConfig }) => {
    const intl = useIntl();
    const navigate = useNavigate();
    const {
        state: { arbeidsgivere },
    } = useSøknadContext();
    const { invalidSteps } = useSøknadsdataStatus(stepId, stepConfig, arbeidsgivere);

    if (invalidSteps.length > 0) {
        const step = invalidSteps[0];
        const stepTitle = intlHelper(intl, stepConfig[step].stepTitleIntlKey);
        const stepRoute = stepConfig[step].route;
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
                    <Heading level="2" size="small" spacing={true}>
                        Oops, dette stemmer ikke helt
                    </Heading>
                    Vennligst gå tilbake til steget &quot;{getStepLink()}&quot;, og bruk knappene nederst i skjemaet for
                    å gå videre. Ikke bruk frem og tilbake-funksjonaliteten i nettleseren.
                </Alert>
            </FormBlock>
        );
    }
    return null;
};

export default InvalidStepSøknadsdataInfo;
