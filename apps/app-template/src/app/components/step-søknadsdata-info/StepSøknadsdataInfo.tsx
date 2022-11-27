import { SoknadStepsConfig } from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepTypes';
import React from 'react';
import { StepId } from '../../types/StepId';
import { Alert } from '@navikt/ds-react';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { useSøknadsdataStatus } from '../../hooks/useSøknadsdataStatus';

interface Props {
    stepId: StepId;
    stepConfig: SoknadStepsConfig<StepId>;
}

const StepSøknadsdataInfo: React.FunctionComponent<Props> = ({ stepId, stepConfig }) => {
    const { invalidSteps } = useSøknadsdataStatus(stepId, stepConfig);
    if (invalidSteps.length > 0) {
        return (
            <FormBlock paddingBottom="xl">
                <Alert variant="warning">
                    Steg som ikke er verifisert:{' '}
                    <ol>
                        {invalidSteps.map((step) => (
                            <li key={step}>{step}</li>
                        ))}
                    </ol>
                    <p>
                        Du må gå tilbake til disse stegene og trykke gå-videre knappen, for å kontrollere at
                        informasjonen du har oppgitt er riktig
                    </p>
                </Alert>
            </FormBlock>
        );
    }
    return null;
};

export default StepSøknadsdataInfo;
